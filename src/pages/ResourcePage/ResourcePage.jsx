import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./ResourcePage.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../config/firebase";

export default function ResourcePage({ currentUser, onBookmarkUpdate }) {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [category, setCategory] = useState("All");
  const [activeResourceId, setActiveResourceId] = useState(null);
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [estDuration, setEstDuration] = useState("");
  const [comments, setComments] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});

  const getCommentsForSpecificResource = async (resourceId) => {
    const q = query(
      collection(database, "Comments"),
      where("resourceId", "==", resourceId)
    );

    try {
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      return results;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  useEffect(() => {
    const getAllResourcesAndComments = async () => {
      try {
        const resourcesCollectionRef = collection(database, "Resources");
        const commentsCollectionRef = collection(database, "Comments");

        const resourcesSnapshot = await getDocs(resourcesCollectionRef);
        const commentsSnapshot = await getDocs(commentsCollectionRef);

        const resourcesCollection = await Promise.all(
          resourcesSnapshot.docs.map(async (doc) => {
            const resourceData = { id: doc.id, ...doc.data() };
            const resourceComments = commentsSnapshot.docs
              .filter((commentDoc) => commentDoc.data().resourceId === doc.id)
              .map((commentDoc) => ({ id: commentDoc.id, ...commentDoc.data() }));
            return { ...resourceData, comments: resourceComments, commentsCount: resourceComments.length };
          })
        );

        setResources(resourcesCollection);
        if (resourcesCollection.length > 0) {
          setSelectedResource(resourcesCollection[0]);
          setActiveResourceId(resourcesCollection[0].id);
        }
      } catch (err) {
        console.error("Error fetching resources and comments: ", err);
      }
    };

    getAllResourcesAndComments();
  }, []);

  useEffect(() => {
    const savedResources = JSON.parse(localStorage.getItem("resources")) || [];
    if (savedResources.length > 0) {
      setResources(savedResources);
      setSelectedResource(savedResources[0]);
      setActiveResourceId(savedResources[0]?.id);
    }
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      if (selectedResource) {
        const resourceComments = await getCommentsForSpecificResource(
          selectedResource.id
        );
        setComments(resourceComments);
      }
    };

    fetchComments();
  }, [selectedResource]);

  const handleFormSubmit = (newResource) => {
    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    console.log("Updated Resources:", updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));

    if (!selectedResource) {
      setSelectedResource(newResource);
      setActiveResourceId(newResource.id);
    }
  };

  useEffect(() => {
    if (resources.length > 0 && !activeResourceId) {
      const firstResourceId = resources[0].id;
      if (activeResourceId !== firstResourceId) {
        setActiveResourceId(firstResourceId);
        setSelectedResource(resources.find(resource => resource.id === firstResourceId));
      }
    }
  }, [resources, activeResourceId]);

  useEffect(() => {
    if (selectedResource) {
      const savedBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];
      const isBookmarked = savedBookmarks.some(
        (bookmark) => bookmark.id === selectedResource.id
      );
      setIsBookmarked(isBookmarked);
      setSavedBookmarks(savedBookmarks);
    }
  }, [selectedResource]);

  const filteredResources = resources.filter((resource) => {
    const currentCategory =
      category === "All" || resource.discipline === category;
    const matchesType = type.length === 0 || type.includes(resource.type);
    const matchesLevel = level.length === 0 || level.includes(resource.level);
    const matchesDuration = estDuration.length === 0 || estDuration.includes(resource.estDuration);

    return currentCategory && matchesType && matchesLevel && matchesDuration;
  });

  const handleToggleBookmarked = () => {
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (newBookmarkedState) {
      bookmarks.push(selectedResource);
    } else {
      bookmarks = bookmarks.filter(
        (bookmark) => bookmark.id !== selectedResource.id
      );
    }

    onBookmarkUpdate(bookmarks);
  };

  const handleSelectResource = (clickedId) => {
    const foundResource = resources.find((resource) => resource.id === clickedId);
    if (foundResource) {
      console.log("Setting selected resource:", foundResource);
      setSelectedResource(foundResource);
      setActiveResourceId(clickedId);
    } else {
      console.error("Resource not found for id:", clickedId);
    }
  };

  // Removed this console log that was being used for debugging
  // useEffect(() => {
  //   console.log("Resources:", resources);
  //   console.log("Selected Resource:", selectedResource);
  // }, [resources, selectedResource]);

  const handleFilterChange = ({ type, level, estDuration }) => {
    setType(type === "All" || type === "" ? [] : [type]);
    setLevel(level === "All" || level === "" ? [] : [level]);
    setEstDuration(estDuration === "All" || estDuration === "" ? [] : [estDuration]);
  };

  const handleResourceUpdate = useCallback((updatedResource) => {
    setResources(prevResources =>
      prevResources.map(resource =>
        resource.id === updatedResource.id ? { ...resource, ...updatedResource } : resource
      )
    );
    setSelectedResource(prev => ({ ...prev, ...updatedResource }));
  }, []);

  const updateCommentCounts = useCallback(async () => {
    const commentsRef = collection(database, 'Comments');
    const newCommentCounts = {};

    for (const resource of resources) {
      const q = query(commentsRef, where("resourceId", "==", resource.id));
      const querySnapshot = await getDocs(q);
      newCommentCounts[resource.id] = querySnapshot.size;
    }

    setCommentCounts(newCommentCounts);
    // Removing this line to see if it prevents the infinite loop issue
    // setResources(prevResources =>
    //   prevResources.map(resource => ({
    //     ...resource,
    //     commentCount: newCommentCounts[resource.id],
    //   }))
    // );
  }, []); // removed "resources" from dependency array to check inifinite loop. Please feel free to add it back if necessary.

  const handleCommentAdded = useCallback(() => {
    updateCommentCounts();
  }, []); // Removed "updateCommentCounts" from dependency array to check infinite loop. Please feel free to add it back if necessary.

  useEffect(() => {
    // Adding a conditional check to make sure that it runs only when comments are not empty
    if (resources.length > 0) {
      updateCommentCounts();
    }
  }, []); // Removed "resources, updateCommentCounts" from dependency array to check infinite loop. Please feel free to add it back if necessary.

  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar
          onCategoryChange={setCategory}
          onFormSubmit={handleFormSubmit}
          onFilterChange={handleFilterChange}
          currentUser={currentUser}
        />
      </div>
      <div className="resource__cards">
        <ResourceList
          resources={filteredResources}
          selectResource={handleSelectResource}
          activeResourceId={activeResourceId}
          commentCounts={commentCounts}
        />
      </div>
      <div className="resource-details__container">
        {selectedResource && Object.keys(selectedResource).length > 0 && (
          <ResourceDetailCard
            selectedResource={selectedResource}
            handleToggleBookmarked={handleToggleBookmarked}
            savedBookmarks={savedBookmarks}
            isBookmarked={isBookmarked}
            comments={comments}
            currentUser={currentUser}
            onResourceUpdate={handleResourceUpdate}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </div>
  );
}
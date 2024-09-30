import React, { useState, useEffect, useCallback, useMemo } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./ResourcePage.scss";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase";

export default function ResourcePage({ currentUser, onBookmarkUpdate }) {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [bookmarkedResources, setBookmarkedResources] = useState({});
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [estDuration, setEstDuration] = useState("");
  const [commentCounts, setCommentCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log('ResourcePageOIAHDSGUIAHGJKADSFJAKJSF');

  // Fetching all resources and comments only once
  useEffect(() => {
    const getAllResourcesAndComments = async () => {
      setIsLoading(true);
      try {
        const resourcesSnapshot = await getDocs(collection(database, "Resources"));
        const commentsSnapshot = await getDocs(collection(database, "Comments"));

        const resourcesCollection = resourcesSnapshot.docs.map((doc) => {
          const resourceData = { id: doc.id, ...doc.data() };
          const resourceComments = commentsSnapshot.docs
            .filter((commentDoc) => commentDoc.data().resourceId === doc.id)
            .map((commentDoc) => ({ id: commentDoc.id, ...commentDoc.data() }));
          return {
            ...resourceData,
            comments: resourceComments,
            commentsCount: resourceComments.length,
          };
        });

        setResources(resourcesCollection);

        // Automatically selects the first resource
        if (resourcesCollection.length > 0) {
          setSelectedResource(resourcesCollection[0]);
        }

        // Initialize bookmarked resources from local storage
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        const bookmarkedState = savedBookmarks.reduce((acc, resource) => {
          acc[resource.id] = true;
          return acc;
        }, {});
        setBookmarkedResources(bookmarkedState);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching resources and comments: ", err);
        setIsLoading(false);
      }
    };

    getAllResourcesAndComments();
  }, []);

  const handleSelectResource = useCallback(
    (clickedId) => {
      const foundResource = resources.find((resource) => resource.id === clickedId);
      if (foundResource) {
        setSelectedResource(foundResource);
      } else {
        console.error("Resource not found for id:", clickedId);
      }
    },
    [resources]
  );

  const handleToggleBookmarked = () => {
    if (!selectedResource) return;

    const newBookmarkedState = !bookmarkedResources[selectedResource.id];
    setBookmarkedResources((prev) => ({
      ...prev,
      [selectedResource.id]: newBookmarkedState
    }));

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (newBookmarkedState) {
      bookmarks.push(selectedResource);
    } else {
      bookmarks = bookmarks.filter((bookmark) => bookmark.id !== selectedResource.id);
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    onBookmarkUpdate(bookmarks);
  };

  const handleFilterChange = ({ type, level, estDuration }) => {
    setType(type === "All" || type === "" ? [] : [type]);
    setLevel(level === "All" || level === "" ? [] : [level]);
    setEstDuration(estDuration === "All" || estDuration === "" ? [] : [estDuration]);
  };

  const handleResourceUpdate = useCallback((updatedResource) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === updatedResource.id
          ? { ...resource, ...updatedResource }
          : resource
      )
    );
    setSelectedResource((prev) => ({ ...prev, ...updatedResource }));
  }, []);

  const handleCommentAdded = useCallback((resourceId, newComment) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === resourceId
          ? {
            ...resource,
            comments: [...(resource.comments || []), newComment],
            commentsCount: (resource.commentsCount || 0) + 1,
          }
          : resource
      )
    );

    if (selectedResource && selectedResource.id === resourceId) {
      setSelectedResource((prevSelected) => ({
        ...prevSelected,
        comments: [...(prevSelected.comments || []), newComment],
        commentsCount: (prevSelected.commentsCount || 0) + 1,
      }));
    }
  }, []);
  // Filter resources based on the category, type, skill, and duration
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const currentCategory =
        category === "All" || resource.discipline === category;
      const matchesType = type.length === 0 || type.includes(resource.type);

      const matchesLevel = level.length === 0 || level.includes(resource.level);
      const matchesEstDuration = estDuration.length === 0 || estDuration.includes(resource.estDuration);

      return currentCategory && matchesType && matchesLevel && matchesEstDuration;
    });
  }, [resources, category, type, level, estDuration]);

  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar
          onCategoryChange={setCategory}
          onFormSubmit={(newResource) =>
            setResources([...resources, newResource])
          }
          onFilterChange={handleFilterChange}
          currentUser={currentUser}
        />
      </div>
      <div className="resource__cards">
        <ResourceList
          resources={filteredResources}
          selectResource={handleSelectResource}
          activeResourceId={selectedResource?.id}
          commentCounts={commentCounts}
        />
      </div>
      <div className="resource-details__container">
        {!isLoading && selectedResource && (
          <ResourceDetailCard
            selectedResource={selectedResource}
            handleToggleBookmarked={handleToggleBookmarked}
            savedBookmarks={Object.values(bookmarkedResources).some(Boolean)}
            isBookmarked={bookmarkedResources[selectedResource.id] || false}
            comments={selectedResource.comments}
            currentUser={currentUser}
            onResourceUpdate={handleResourceUpdate}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </div>
  );
}

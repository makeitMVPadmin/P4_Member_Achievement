import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./ContributionsPage.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../config/firebase";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";


function ContributionsPage({ currentUser, onBookmarkUpdate }) {
  const [contributions, setContributions] = useState([]);
  const currentUserId = currentUser.userId 
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeResourceId, setActiveResourceId] = useState(null);
  const [comments, setComments] = useState([]);
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("");
  const [skill, setSkill] = useState("");
  const [duration, setDuration] = useState("");


  useEffect(() => {
    const getAllContributedResources = async () => {
      try {
        const resourcesCollectionRef = collection(database, "Resources");
        const userResourcesQuery = query(
          resourcesCollectionRef,
          where("userID", "==", currentUserId)
        );
        const querySnapshot = await getDocs(userResourcesQuery);
        const resourcesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContributions(resourcesData);
        setResources(resourcesData)
      } catch (error) {
        console.error("Error fetching user resources: ", error);
      }
    };

    getAllContributedResources();
  }, [currentUser]);

  // Just to show the log of contributions update after it's been set. Can be deleted.
  // useEffect(() => {
  //   console.log("Contributions:");
  //   console.log(contributions);
  // }, [contributions]);

  console.log(contributions);

  const getCommentsForSpecificResource = async (resourceId) => {
    const q = query(
      collection(database, "Comments"),
      where("resourceID", "==", resourceId)
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


  useEffect(() => {
    if (resources.length > 0 && !activeResourceId) {
      const firstResourceId = resources[0].id;
      setActiveResourceId(firstResourceId);
      setSelectedResource(
        resources.find((resource) => resource.id === firstResourceId)
      );
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
    const matchesSkill = skill.length === 0 || skill.includes(resource.level);
    const matchesDuration = duration.length === 0 || duration.includes(resource.duration);

    return currentCategory && matchesType && matchesSkill && matchesDuration;
  });

  const handleFilterChange = ({ type, skill, duration }) => {
    setType(type === "All" || type === "" ? [] : [type]);
    setSkill(skill === "All" || skill === "" ? [] : [skill]);
    setDuration(duration === "All" || duration === "" ? [] : [duration]);
  };
  


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

  useEffect(() => {
    console.log("Resources:", resources);
    console.log("Selected Resource:", selectedResource);
  }, [resources, selectedResource]);

  const handleResourceUpdate = useCallback((updatedResource) => {
    setResources(prevResources =>
      prevResources.map(resource =>
        resource.id === updatedResource.id ? { ...resource, ...updatedResource } : resource
      )
    );
    setSelectedResource(prev => ({ ...prev, ...updatedResource }));
  }, []);

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
          resources={contributions}
          selectResource={handleSelectResource}
          activeResourceId={activeResourceId}
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
          />
        )}
      </div>
    </div>
  );
}

export default ContributionsPage;

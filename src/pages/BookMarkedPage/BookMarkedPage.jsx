import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./BookMarkedPage.scss";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";


export default function BookMarkedPage({ bookmarkedResources, currentUser, onBookmarkUpdate }) {
  const [displayedBookmarks, setDisplayedBookmarks] = useState([]);
  const [displaySelectedResource, setdisplaySelectedResource] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [activeResourceId, setActiveResourceId] = useState(null);
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [type, setType] = useState("");
  const [skill, setSkill] = useState("");
  const [duration, setDuration] = useState("");
  const [comments, setComments] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    setDisplayedBookmarks(bookmarkedResources);
  }, [bookmarkedResources]);

  console.log(displayedBookmarks);

  const handleSelectResource = (clickedId) => {
    const foundResource = displayedBookmarks.find((resource) => resource.id === clickedId);
    if (foundResource) {
      console.log("Setting selected resource:", foundResource);
      setSelectedResource(foundResource);
      setActiveResourceId(clickedId);
    } else {
      console.error("Resource not found for id:", clickedId);
    }
  };

  console.log(displaySelectedResource)

  const handleFormSubmit = (newResource) => {
    const updatedResources = [...displayedBookmarks, newResource];
    setDisplayedBookmarks(updatedResources);
    console.log("Updated Resources:", updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));

    if (!selectedResource) {
      setSelectedResource(newResource);
      setActiveResourceId(newResource.id);
    }
  };

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


  useEffect(() => {
    if (displayedBookmarks.length > 0 && !activeResourceId) {
      const firstResourceId = displayedBookmarks[0].id;
      setActiveResourceId(firstResourceId);
      setSelectedResource(
        displayedBookmarks.find((resource) => resource.id === firstResourceId)
      );
    }
  }, [displayedBookmarks, activeResourceId]);

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

  const handleResourceUpdate = useCallback((updatedResource) => {
    setDisplayedBookmarks(prevResources =>
      prevResources.map(resource =>
        resource.id === updatedResource.id ? { ...resource, ...updatedResource } : resource
      )
    );
    setSelectedResource(prev => ({ ...prev, ...updatedResource }));
  }, []);

  const filteredResources = displayedBookmarks.filter((resource) => {
    const currentCategory =
      category === "All" || resource.discipline === category;
    const matchesType = type.length === 0 || type.includes(resource.type);
    const matchesSkill = skill.length === 0 || skill.includes(resource.level);
    const matchesDuration = duration.length === 0 || duration.includes(resource.duration);

    return currentCategory && matchesType && matchesSkill && matchesDuration;
  });

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
          currentUser={currentUser}
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

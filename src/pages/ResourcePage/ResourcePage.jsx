import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./ResourcePage.scss";
import resourceData from "../../data/resource.json";
import resourceDetailsData from "../../data/resource-details.json";

export default function ResourcePage() {
  const [resources, setResources] = useState(resourceData);
  const [selectedResource, setSelectedResource] = useState(resourceDetailsData[0]);
  const [savedBookmarks , setSavedBookmarks]= useState([])
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      const isBookmarked = bookmarks.some(bookmark => bookmark.id === selectedResource.id);
      setIsBookmarked(isBookmarked);
      setSavedBookmarks(bookmarks); 
    }
  }, [selectedResource.id]);

  const handleToggleBookmarked = () => {
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    let bookmarks = localStorage.getItem('bookmarks');
    bookmarks = bookmarks ? JSON.parse(bookmarks) : [];

    if (newBookmarkedState) {
      bookmarks.push(selectedResource);
    } else {
      bookmarks = bookmarks.filter(bookmark => bookmark.id !== selectedResource.id);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setSavedBookmarks(bookmarks)
  };

  const handleSelectResource = (clickedId) => {
    const foundResource = resourceDetailsData.find(
      (resource) => clickedId === resource.id
    );

    setSelectedResource(foundResource);
  };

  const allResources = resources;

  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar />
      </div>
      <div className="resource__cards">
        <ResourceList
          resources={allResources}
          selectResource={handleSelectResource}
          
        />
      </div>
      <div className="resource-details__container">
        <ResourceDetailCard
          selectedResource={selectedResource}
          handleToggleBookmarked={handleToggleBookmarked}
          savedBookmarks={savedBookmarks}
          isBookmarked={isBookmarked}
        />
      </div>
    </div>
  );
}

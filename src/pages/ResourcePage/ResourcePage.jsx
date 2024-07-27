import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import { Comments } from "../../components/Comments/Comments";
import resourceData from "../../data/resource.json";
import resourceDetailsData from "../../data/resource-details.json";
import "./ResourcePage.scss";
import { useNavigate } from "react-router-dom";

export default function ResourcePage() {
  const [resources, setResources] = useState(resourceDetailsData); //1
  // const [resourceDetails, setResourceDetails] = useState(resourceDetailsData)
  const [selectedResource, setSelectedResource] = useState(
    resourceDetailsData[0]
  );
  console.log(resourceDetailsData[0]);
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [category, setCategory] = useState("All");
  const [activeResourceId, setActiveResourceId] = useState(null);
  // const [comments, setComments] = useState([]);
  // const storedResources =
  //   JSON.parse(localStorage.getItem("resources")) || resourceDetailsData;

  useEffect(() => {
    // Load resources from localStorage
    const savedResources = JSON.parse(localStorage.getItem("resources")) || [];
    setResources(savedResources);
  }, []);

  // useEffect(() => {
  //   const storedResources = JSON.parse(localStorage.getItem("resources")) || [];

  //   if (storedResources.length > 0) {
  //     setResources(storedResources);
  //     setSelectedResource(storedResources[0]); // Set initial selected resource from stored data
  //   } else {
  //     localStorage.setItem("resources", JSON.stringify(resourceData));
  //   }
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const storedResources =
  //         JSON.parse(localStorage.getItem("resources")) || [];

  //       if (storedResources.length === 0) {
  //         const response = await fetch("../../data/resource-details.json");

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }

  //         const data = await response.json();
  //         setResources(data);
  //         localStorage.setItem("resources", JSON.stringify(data));
  //       } else {
  //         setResources(storedResources);
  //       }
  //     } catch (error) {
  //       console.error("Error loading resources:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleFormSubmit = (newResource) => {
  //   setResources((prevResources) => [...prevResources, newResource]);
  // };

  const handleFormSubmit = (newResource) => {
    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    // Update selectedResource if it was previously null
    if (!selectedResource) {
      setSelectedResource(newResource);
      setActiveResourceId(newResource.id);
    }
  };

  useEffect(() => {
    if (resources.length > 0) {
      const firstResourceId = resources[0].id;
      setActiveResourceId(firstResourceId);
      setSelectedResource(
        resourceDetailsData.find((resource) => resource.id === firstResourceId)
      );
    }
  }, [resources]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      const isBookmarked = bookmarks.some(
        (bookmark) => bookmark.id === selectedResource.id
      );
      setIsBookmarked(isBookmarked);
      setSavedBookmarks(bookmarks);
    }
  }, [selectedResource]);

  const filteredResources =
    category === "All"
      ? resources
      : resources.filter((resource) =>
          [resource.discipline].includes(category)
        );

  const handleToggleBookmarked = () => {
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    let bookmarks = localStorage.getItem("bookmarks");
    bookmarks = bookmarks ? JSON.parse(bookmarks) : [];

    if (newBookmarkedState) {
      bookmarks.push(selectedResource);
    } else {
      bookmarks = bookmarks.filter(
        (bookmark) => bookmark.id !== selectedResource.id
      );
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setSavedBookmarks(bookmarks);
  };

  const handleSelectResource = (clickedId) => {
    const foundResources = resourceDetailsData.find(
      (resource) => clickedId === resource.id
    );

    if (foundResources) {
      setSelectedResource(foundResources);
      setActiveResourceId(clickedId);
    }
  };

  // const allResources = resources;

  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar
          onCategoryChange={setCategory}
          onFormSubmit={handleFormSubmit}
        />
      </div>
      <div className="resource__cards">
        <ResourceList
          resources={filteredResources}
          selectResource={handleSelectResource}
          activeResourceId={activeResourceId}
        />
      </div>
      <div className="resource-details__container">
        <ResourceDetailCard
          selectedResource={selectedResource}
          handleToggleBookmarked={handleToggleBookmarked}
          savedBookmarks={savedBookmarks}
          isBookmarked={isBookmarked}
          // comments={comments}
        />
      </div>
    </div>
  );
}

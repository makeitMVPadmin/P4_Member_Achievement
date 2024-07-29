import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import { Comments } from "../../components/Comments/Comments";
import resourceData from "../../data/resource.json";
import resourceDetailsData from "../../data/resource-details.json";
import "./ResourcePage.scss";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase";

import { useNavigate } from "react-router-dom";


export default function ResourcePage() {
  const [resources, setResources] = useState(resourceDetailsData); //1
  // const [resourceDetails, setResourceDetails] = useState(resourceDetailsData)
  const [selectedResource, setSelectedResource] = useState(
    resourceDetailsData[0]
  );
  console.log(resourceDetailsData);
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [category, setCategory] = useState("All");
  const [activeResourceId, setActiveResourceId] = useState(
    resourceDetailsData[0].id
  );
  // const [comments, setComments] = useState([]);
  // const storedResources =
  //   JSON.parse(localStorage.getItem("resources")) || resourceDetailsData;

  useEffect(() => {
    const savedResources = JSON.parse(localStorage.getItem("resources")) || [];
    if (savedResources.length > 0) {
      setResources(savedResources);
      setSelectedResource(savedResources);
      setActiveResourceId(savedResources.id);
    }
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

  useEffect(() => {
    const getAllResourcesAndRatings = async () => {
      try {
        const resourcesCollectionRef = collection(database, "Resources");
        const resourcesSnapshot = await getDocs(resourcesCollectionRef);
        if (!resourcesSnapshot.empty) {
          const resourcesCollection = resourcesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Resources:");
          console.log(resourcesCollection);
          // Set your resources here, and don't forget to option chain any dependant data (ex: selectedResource?.id)
          // setResources(resourcesCollection);
        } else {
          console.log("No collection for resources found.");
        }
      } catch (err) {
        console.error("Error fetching resources: ", err);
      }
    };

    getAllResourcesAndRatings();
  }, []);

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
    const foundResources = resources.find(
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

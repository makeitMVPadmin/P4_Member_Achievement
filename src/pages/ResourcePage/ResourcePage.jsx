import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import { Comments } from "../../components/Comments/Comments";
import resourceData from "../../data/resource.json";
import resourceDetailsData from "../../data/resource-details.json";
import "./ResourcePage.scss";
import { database } from "../../config/firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export default function ResourcePage() {
  const [resources, setResources] = useState(resourceData);
  // const [resourceDetails, setResourceDetails] = useState(resourceDetailsData)
  const [selectedResource, setSelectedResource] = useState(
    resourceDetailsData[0]
  );
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [category, setCategory] = useState("All");
  const [activeResourceId, setActiveResourceId] = useState(null);
  // const [comments, setComments] = useState([]);

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
  }, [selectedResource.id]);

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

  const getCommentsForSpecificResource = async (resourceId) => {
    const q = query(
      collection(database, "Comments"),
      where("resourceID", "==", resourceId)
    );

    try {
      const querySnapshot = await getDoc(q);

      const results = [];

      querySnapshot.forEach((doc) => {
        results.push({ ...doc.data() });
      });

      return results;
    } catch (err) {
      console.error(err);
    }
  };

  // const allResources = resources;

  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar onCategoryChange={setCategory} />
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
          comments={getCommentsForSpecificResource(selectedResource.id)}
        />
      </div>
    </div>
  );
}

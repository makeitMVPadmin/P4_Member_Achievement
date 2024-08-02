import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./ResourcePage.scss";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase";
// import { Comments } from "../../components/Comments/Comments";
// import resourceData from "../../data/resource.json";
// import resourceDetailsData from "../../data/resource-details.json";
// import { useNavigate } from "react-router-dom";

const skillMap = {
  "Beginner Level": 1,
  "Intermediate Level": 2,
  "Advanced Level": 3,
};

const durationMap = {
  '3 min': 3,
  '5 min': 5,
  '7 min': 7,
  '8 min': 8,
  '10 min': 10,
  '20 min': 20,
  '30 min': 30,
  '40 min': 40,
  '50 min': 50,
  '60 min': 60
};

export default function ResourcePage() {
  // const [resourceDetails, setResourceDetails] = useState(resourceDetailsData)
  // const [resources, setResources] = useState(resourceDetailsData); //1
  // const [selectedResource, setSelectedResource] = useState(resourceDetailsData[0]);
  // const [activeResourceId, setActiveResourceId] = useState(resourceDetailsData[0].id);
  // const [comments, setComments] = useState([]);
  // const storedResources =JSON.parse(localStorage.getItem("resources")) || resourceDetailsData;


  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [category, setCategory] = useState("All");
  const [type, setType] = useState([])
  const [activeResourceId, setActiveResourceId] = useState(null);
  const [sortField, setSortField] = useState(null)
  const [sortAscending, setSortAscending] = useState(true)

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
          setResources(resourcesCollection);
          if (resourcesCollection.length > 0) {
            setSelectedResource(resourcesCollection[0]);
            setActiveResourceId(resourcesCollection[0].id);
          }
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
    const savedResources = JSON.parse(localStorage.getItem("resources")) || [];
    if (savedResources.length > 0) {
      setResources(savedResources);
      setSelectedResource(savedResources[0]);
      setActiveResourceId(savedResources[0]?.id);
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
    if (resources.length > 0) {
      const firstResourceId = resources[0].id;
      setActiveResourceId(firstResourceId);
      setSelectedResource(
        resources.find((resource) => resource.id === firstResourceId)
      );
    }
  }, [resources]);

  useEffect(() => {
    if (selectedResource) {
      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      const isBookmarked = savedBookmarks.some(
        (bookmark) => bookmark.id === selectedResource.id
      );
      setIsBookmarked(isBookmarked);
      setSavedBookmarks(savedBookmarks);
    }
  }, [selectedResource]);

  const filteredResources = resources.filter((resource) => {
    const currentCategory = category === "All" || resource.discipline === category;
    const currentType = type.length === 0 || type.includes(resource.type);
    return currentCategory && currentType;
  })

  // category === "All"
  //   ? resources
  //   : resources.filter((resource) =>
  //     [resource.discipline].includes(category)
  //   );

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

  // useEffect(() => {
  //   const sortResources = () => {
  //     let sortedResources = [...resources];

  //     if (sortField === 'skill') {
  //       sortedResources = sortedResources.sort((a, b) => {
  //         const levelA = skillMap[a.level] || 0;
  //         const levelB = skillMap[b.level] || 0;
  //         return sortAscending ? levelA - levelB : levelB - levelA;
  //       });
  //     } else if (sortField === 'duration') {
  //       sortedResources = sortedResources.sort((a, b) => {
  //         const durationA = durationMap[a.duration] || 0;
  //         const durationB = durationMap[b.duration] || 0;
  //         return sortAscending ? durationA - durationB : durationB - durationA;
  //       });
  //     }

  //     setResources(sortedResources);
  //   };

  //   sortResources();
  // }, [sortField, sortAscending, resources]);

  const sortSkill = () => {
    setSortField('skill');
    setSortAscending(!sortAscending);
  };

  const sortDuration = () => {
    setSortField('duration');
    setSortAscending(!sortAscending);
  };

  // const allResources = resources;

  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar
          onTypeChange={setType}
          onCategoryChange={setCategory}
          onFormSubmit={handleFormSubmit}
          sortBySkill={sortSkill}
          sortByDuration={sortDuration}
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
        {selectedResource && (
          <ResourceDetailCard
            selectedResource={selectedResource}
            handleToggleBookmarked={handleToggleBookmarked}
            savedBookmarks={savedBookmarks}
            isBookmarked={isBookmarked}
          // comments = {comments}
          />
        )}
      </div>
    </div>
  );
}

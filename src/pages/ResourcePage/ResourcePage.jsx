import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import { Comments } from "../../components/Comments/Comments";
import resourceData from "../../data/resource.json";
import resourceDetailsData from "../../data/resource-details.json";
import "./ResourcePage.scss";
import { useNavigate } from "react-router-dom";

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
  const [resources, setResources] = useState(resourceDetailsData); //1
  // const [resourceDetails, setResourceDetails] = useState(resourceDetailsData)
  const [selectedResource, setSelectedResource] = useState(
    resourceDetailsData[0]
  );
  console.log(resourceDetailsData);
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [category, setCategory] = useState("All");
  const [type, setType] = useState([])
  const [activeResourceId, setActiveResourceId] = useState(null);
  // const [activeResourceId, setActiveResourceId] = useState(
  //   resourceDetailsData[0].id
  // );
  // const [comments, setComments] = useState([]);
  // const storedResources =
  //   JSON.parse(localStorage.getItem("resources")) || resourceDetailsData;
  const [sortField, setSortField] = useState(null)
  const [sortAscending, setSortAscending] = useState(true)

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

  useEffect(() => {
    const sortResources = () => {
      let sortedResources = [...resources];

      if (sortField === 'skill') {
        sortedResources = sortedResources.sort((a, b) => {
          const levelA = skillMap[a.level] || 0;
          const levelB = skillMap[b.level] || 0;
          return sortAscending ? levelA - levelB : levelB - levelA;
        });
      } else if (sortField === 'duration') {
        sortedResources = sortedResources.sort((a, b) => {
          const durationA = durationMap[a.duration] || 0;
          const durationB = durationMap[b.duration] || 0;
          return sortAscending ? durationA - durationB : durationB - durationA;
        });
      }

      setResources(sortedResources);
    };

    sortResources();
  }, [sortField, sortAscending, resources]);

  const sortSkill = () => {
    setSortField('skill');
    setSortAscending(!sortAscending);
  };

  const sortDuration = () => {
    setSortField('duration');
    setSortAscending(!sortAscending);
  };

  // const sortSkill = () => {
  //   setSortField("skill")
  //   const sortedResource = [...resources].sort((a, b) => {
  //     const levelA = skillMap[a.level] || 0;
  //     const levelB = skillMap[b.level] || 0;
  //     return sortAscending ? levelA - levelB : levelB - levelA;
  //   });
  //   setResources(sortedResource);
  //   setSortAscending(!sortAscending);
  // }

  // const sortDuration = () => {
  //   setSortField("duration")
  //   const sortedResource = [...resources].sort((a, b) => {
  //     const durationA = durationMap[a.duration] || 0;
  //     const durationB = durationMap[b.duration] || 0;
  //     return sortAscending ? durationA - durationB : durationB - durationA;
  //   });
  //   setResources(sortedResource);
  //   setSortAscending(!sortAscending);
  // }

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
      </div >
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
    </div >
  );
}

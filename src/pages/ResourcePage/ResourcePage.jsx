import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./ResourcePage.scss";
import { collection, doc, getDoc, getDocs, query, setDoc, where, } from "firebase/firestore";
import { database } from "../../config/firebase";
// import { Comments } from "../../components/Comments/Comments";
// import resourceData from "../../data/resource.json";
// import resourceDetailsData from "../../data/resource-details.json";
// import { useNavigate } from "react-router-dom";

// const skillMap = {
//   "Beginner Level": 1,
//   "Intermediate Level": 2,
//   "Advanced Level": 3,
// };

// const durationMap = {
//   '3 min': 3,
//   '5 min': 5,
//   '7 min': 7,
//   '8 min': 8,
//   '10 min': 10,
//   '20 min': 20,
//   '30 min': 30,
//   '40 min': 40,
//   '50 min': 50,
//   '60 min': 60
// };

export default function ResourcePage() {
  // const [resourceDetails, setResourceDetails] = useState(resourceDetailsData)
  // const [resources, setResources] = useState(resourceDetailsData); //1
  // const [selectedResource, setSelectedResource] = useState(resourceDetailsData[0]);
  // const [activeResourceId, setActiveResourceId] = useState(resourceDetailsData[0].id);
  // const [comments, setComments] = useState([]);
  // const storedResources =JSON.parse(localStorage.getItem("resources")) || resourceDetailsData;
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState([]);
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [category, setCategory] = useState("All");
  const [activeResourceId, setActiveResourceId] = useState(null);
  const [comments, setComments] = useState([]);
  // const [type, setType] = useState([])
  // const [sortField, setSortField] = useState(null)
  // const [sortAscending, setSortAscending] = useState(true)
  const [type, setType] = useState("")
  const [skill, setSkill] = useState("")
  const [duration, setDuration] = useState("")

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
    const matchesType = type.length === 0 || type.includes(resource.type);
    const matchesSkill = skill.length === 0 || skill.includes(resource.level);
    const matchesDuration = duration.length === 0 || duration.includes(resource.duration);
    // const currentType = type.length === 0 || type.includes(resource.type);

    return currentCategory && matchesType && matchesSkill && matchesDuration;
    //  && currentType;
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

      console.log(results);
      return results;
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(resources)
  // console.log(selectedResource.id)

  useEffect(() => {
    const fetchComments = async () => {
      if (selectedResource.id) {
        const comments = await getCommentsForSpecificResource(selectedResource.id);
        setComments(comments);
      }
    };

    fetchComments();
  }, [selectedResource.id]);

  // old code below
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

  // const sortSkill = () => {
  //   setSortField('skill');
  //   setSortAscending(!sortAscending);
  // };

  // const sortDuration = () => {
  //   setSortField('duration');
  //   setSortAscending(!sortAscending);
  // };
  // old code above

  const handleFilterChange = ({ type, skill, duration }) => {
    setType(type === "All" ? [] : [type])
    setSkill(skill === "All" ? [] : [skill]);
    setDuration(duration = "All" ? [] : [duration]);
  }

  // const allResources = resources;

  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar
          onCategoryChange={setCategory}
          onFormSubmit={handleFormSubmit}
          // onTypeChange={setType}
          // sortBySkill={sortSkill}
          // sortByDuration={sortDuration}
          onFilterChange={handleFilterChange}
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
            comments={comments}
          />
        )}
      </div>
    </div>
  );
}

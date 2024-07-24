import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceList from "../../components/ResourceList/ResourceList";
import resourceDetailsData from "../../data/resource-details.json";
import "./BookMarkedPage.scss";


export default function BookMarkedPage({ bookmarkedResources }) {
  const [displayedBookmarks, setDisplayedBookmarks] = useState([]);

  useEffect(() => {
    setDisplayedBookmarks(bookmarkedResources);
  }, [bookmarkedResources]);

  console.log(displayedBookmarks)

  const handleSelectResource = (clickedId) => {
    const foundResource = resourceDetailsData.find(
      (resource) => clickedId === resource.id
    );

  };

  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar />
      </div>
      <div className="resource__cards">
        <ResourceList
          resources={displayedBookmarks}
          selectResource={handleSelectResource}
        />
      </div>
    </div>
  );
}

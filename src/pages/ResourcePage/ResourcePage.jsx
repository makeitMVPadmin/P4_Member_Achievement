import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./ResourcePage.scss";
import { Comments } from "../../components/Comments/Comments";



import resourceData from "../../data/resource.json";
import resourceDetailsData from "../../data/resource-details.json";

export default function ResourcePage() {
  const [resources, setResources] = useState(resourceData);
  const [selectedResource, setSelectedResource] = useState(
    resourceDetailsData[0]
  );

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
        <ResourceDetailCard />
      </div>
    </div>
  );
}

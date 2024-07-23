import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./ResourcePage.scss";
import resourceData from "../../data/resource.json";
import resourceDetailsData from "../../data/resource-details.json";

export default function ResourcePage() {
  const [resources, setResources] = useState(resourceData);
  const [resourceDetails, setResourceDetails] = useState(resourceDetailsData)
  const [selectedResource, setSelectedResource] = useState(
    resourceDetailsData[0]
  );
  const [category, setCategory] = useState("All");

  const sortedResources = category === "All"
    ? resources
    : resources.filter(resource =>
      [resource.tag].includes(category)
    );

  const sortedResourcesDetails = category === "All"
    ? resourceDetails
    : resourceDetails.filter(resource =>
      [resource.tag1, resource.tag2, resource.tag3, resource.tag4].includes(category)
    );

  const handleSelectResource = (clickedId) => {
    const foundResources = resourceDetailsData.find(
      (resource) => clickedId === resource.id
    );

    setSelectedResource(foundResources);
  };

  // const allResources = resources;

  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar onCategoryChange={setCategory} />
      </div>
      <div className="resource__cards">
        <ResourceList
          resources={sortedResources}
          selectResource={handleSelectResource}
        />
      </div>
      <div className="resource-details__container">
        <ResourceDetailCard selectedResource={selectedResource} />
      </div>
    </div>
  );
}

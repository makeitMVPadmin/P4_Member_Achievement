import ResourceCard from "../../components/ResourceCard/ResourceCard";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import "./ResourcePage.scss";

export default function ResourcePage() {
  return (
    <div className="resource__container">
      <div className="resource__cards">
        <ResourceCard />
        <ResourceCard />
        <ResourceCard />
      </div>
      <div className="resource-details__container">
        <ResourceDetailCard />
      </div>
    </div>
  );
}

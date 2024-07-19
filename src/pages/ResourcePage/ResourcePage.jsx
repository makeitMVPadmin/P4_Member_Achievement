import NavBar from "../../components/NavBar/NavBar";
import ResourceCard from "../../components/ResourceCard/ResourceCard";
import ResourceDetailCard from "../../components/ResourceDetailCard/ResourceDetailCard";
import "./ResourcePage.scss";
import { Comments } from "../../components/Comments/Comments";




export default function ResourcePage() {
  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar />
      </div>
      <div className="resource__cards">
        <ResourceCard />
        <ResourceCard />
        <ResourceCard />
      </div>
      <div className="resource-details__container">
        <ResourceDetailCard />
        <Comments/>
      </div>
    </div>
  );
}

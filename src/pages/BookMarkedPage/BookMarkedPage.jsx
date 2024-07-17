import NavBar from "../../components/NavBar/NavBar";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./BookMarkedPage.scss";


export default function BookMarkedPage({ bookmarkedResources }) {
  console.log(bookmarkedResources)
  return (
    <div className="resource__container">
      <div className="resource__navbar-container">
        <NavBar />
      </div>
      <div className="resource__cards">
        <ResourceList resources={bookmarkedResources} />
      </div>
    </div>
  );
}

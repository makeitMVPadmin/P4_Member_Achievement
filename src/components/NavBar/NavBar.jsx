import trophyIcon from "../../assets/icons/trophy-01-svgrepo-com.png";
import uploadIcon from "../../assets/icons/upload-folder-svgrepo-com.png";
import uploadIcon2 from "../../assets/icons/upload-folder-svgrepo-com2.png";
import savedIcon from "../../assets/icons/saved-svgrepo-com.png";
import libraryIcon from "../../assets/icons/library-book-svgrepo-com.png";
import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import SubmissionDrawer from "../../components/SubmissionForm/SubmissionDrawer";
import "./NavBar.scss";



export default function NavBar({ onCategoryChange, onTypeChange, onFormSubmit }) {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [types, setTypes] = useState([]);
  const [skill, setSkill] = useState("");

  const skillLevelMap = {
    "Beginner Level": 1,
    "Intermediate Level": 2,
    "Advanced Level": 3
  }

  const location = useLocation();
  const navigate = useNavigate();

  const toggleLibraryMenu = () => {
    if (typeof onCategoryChange === "function") {
      onCategoryChange(category);
    }
    setCategory("All");
    setIsLibraryOpen(!isLibraryOpen);
  };



  const handleMouseEnter = () => {
    setIsLibraryOpen(true);
  };

  const handleSelectCategory = (category) => {
    if (location.pathname != "/resource") {
      navigate("/resource");
    }
    if (typeof onCategoryChange === "function") {
      onCategoryChange(category);
    }

    setCategory(category);
  };

  const handleSelectType = (type) => {
    if (location.pathname != "/resource") {
      navigate("/resource");
    }
    const currentTypes = types.includes(type)
      ? types.filter(t => t !== type) : [...types, type]

    if (typeof onTypeChange === 'function') {
      onTypeChange(currentTypes);
    }

    setTypes(currentTypes);
  }
  const checkLocation = () => {
    if (location.pathname != "/resource") {
      navigate("/resource");
    }
  };

  return (
    <ul className="nav__list">
      <div className="nav__container-top">
        <NavLink to="/rewards">
          <li className="nav__item">
            <img src={trophyIcon} alt="trophy icon" className="nav__icon" />
            <p className="nav__item-name">Rewards</p>
          </li>
        </NavLink>
        <li className="nav__item">
          <img src={uploadIcon2} alt="upload file icon" className="nav__icon" />
          <p className="nav__item-name">Contributions</p>
        </li>
        <li className="nav__item">
          <img
            src={savedIcon}
            alt="saved bookmark icon"
            className="nav__icon"
          />
          <p className="nav__item-name">Bookmarked</p>
        </li>
        <li
          className={`nav__item ${isLibraryOpen ? "active" : ""}`}
          onClick={toggleLibraryMenu}
          onMouseEnter={handleMouseEnter}
        >
          <img
            src={libraryIcon}
            alt="library books icon"
            className="nav__icon"
          />
          <p className="nav__item-name" onClick={checkLocation}>
            Learning Library
          </p>
        </li>
        {isLibraryOpen && (
          <ul className="nav__library-sublist">
            <li
              className={`nav__library-subitem ${
                category === "Software Engineering" ? "active" : ""
              }`}
              onClick={() => handleSelectCategory("Software Engineering")}
            >
              Software Engineering
            </li>
            <li
              className={`nav__library-subitem ${
                category === "UX/UI Design" ? "active" : ""
              }`}
              onClick={() => handleSelectCategory("UX/UI Design")}
            >
              UX/UI Design
            </li>
            <li
              className={`nav__library-subitem ${
                category === "Product" ? "active" : ""
              }`}
              onClick={() => handleSelectCategory("Product")}
            >
              Product
            </li>
            <li
              className={`nav__library-subitem ${
                category === "Data Science" ? "active" : ""
              }`}
              onClick={() => handleSelectCategory("Data Science")}
            >
              Data Science
            </li>
          </ul>
        )}
        <ul className="nav__sorting">
          <p className="nav__item-name">Sorting Options</p>
          <li className="nav__sorting-item nav__sorting-types">
            <p className="nav__sorting-type">Type</p>
            <div>
              <input id="article" type="checkbox" className={`nav__sorting-checkbox ${types.includes("Article") ? "active" : ""}`} onClick={() => handleSelectType("Article")} />
              <label htmlFor="article" className="nav__sorting-subitem">Article</label>
            </div>
            <div>
              <input id="course" type="checkbox" className={`nav__sorting-checkbox ${types.includes("Course") ? "active" : ""}`} onClick={() => handleSelectType("Course")} />
              <label htmlFor="course" className="nav__sorting-subitem">Course</label>
            </div>
            <div>
              <input id="video" type="checkbox" className={`nav__sorting-checkbox ${types.includes("Video") ? "active" : ""}`} onClick={() => handleSelectType("Video")} />
              <label htmlFor="video" className="nav__sorting-subitem">Video</label>
            </div>
          </li>
          <li className="nav__sorting-item">
            <p className="nav__library-subitem">Skill</p>
          </li>
          <li className="nav__sorting-item">
            <p className="nav__library-subitem">Duration</p>
          </li>
        </ul>
      </div>
      <div className="nav__container-bottom">
        {/* replace button with submission drawer to connect  */}
        {/* <button className="nav__button">
          <img src={uploadIcon} alt="upload file icon" className="nav__icon" />
          <p className="nav__button-name">Upload Resource</p>
        </button> */}
        <SubmissionDrawer onFormSubmit={onFormSubmit} />
      </div>
    </ul>
  );
}

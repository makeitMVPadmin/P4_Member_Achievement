import trophyIcon from "../../assets/icons/trophy-01-svgrepo-com.png";
import uploadIcon from "../../assets/icons/upload-folder-svgrepo-com.png";
import uploadIcon2 from "../../assets/icons/upload-folder-svgrepo-com2.png";
import savedIcon from "../../assets/icons/saved-svgrepo-com.png";
import libraryIcon from "../../assets/icons/library-book-svgrepo-com.png";
import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import SubmissionDrawer from "../../components/SubmissionForm/SubmissionDrawer"
import "./NavBar.scss";

export default function NavBar({ onCategoryChange }) {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [category, setCategory] = useState("All");

  const location = useLocation();
  const navigate = useNavigate();

  const toggleLibraryMenu = () => {
    if (typeof onCategoryChange === 'function') {
      onCategoryChange(category)
    }
    setCategory("All")
    setIsLibraryOpen(!isLibraryOpen);
  };

  const handleMouseEnter = () => {
    setIsLibraryOpen(true);
  };

  const handleSelectCategory = (category) => {
    if (location.pathname != "/resource") {
      navigate("/resource")
    }
    if (typeof onCategoryChange === 'function') {
      onCategoryChange(category);
    }

    setCategory(category);
  }

  const checkLocation = () => {
    if (location.pathname != "/resource") {
      navigate("/resource")
    }
  }

  return (
    <ul className="nav__list">
      <div className="nav__container-top">
        <NavLink to='/rewards'>
          <li className="nav__item">
            <img src={trophyIcon} alt="trophy icon" className="nav__icon" />
            <p className="nav__item-name">Rewards</p>
          </li>
        </NavLink>
        {/* <NavLink to="/contributions"> */}
        <li className="nav__item">
          <img src={uploadIcon2} alt="upload file icon" className="nav__icon" />
          <p className="nav__item-name">Contributions</p>
        </li>
        {/* </NavLink> */}
        <NavLink to="/bookmarked">
          <li className="nav__item">
            <img
              src={savedIcon}
              alt="saved bookmark icon"
              className="nav__icon"
            />
            <p className="nav__item-name">Bookmarked</p>
          </li>
        </NavLink>
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
          <p className="nav__item-name" onClick={checkLocation}>Learning Library</p>
        </li>
        {isLibraryOpen && (
          <ul className="nav__library-sublist">
            <li className={`nav__library-subitem ${category === "Software Engineering" ? "active" : ""}`} onClick={() => handleSelectCategory("Software Engineering")}>Software Engineering</li>
            <li className={`nav__library-subitem ${category === "UX/UI Design" ? "active" : ""}`} onClick={() => handleSelectCategory("UX/UI Design")}>UX/UI Design</li>
            <li className={`nav__library-subitem ${category === "Product" ? "active" : ""}`} onClick={() => handleSelectCategory("Product")}>Product</li>
            <li className={`nav__library-subitem ${category === "Data Science" ? "active" : ""}`} onClick={() => handleSelectCategory("Data Science")}>Data Science</li>
          </ul>
        )}
      </div>
      <div className="nav__container-bottom">
        {/* replace button with submission drawer to connect  */}
        {/* <button className="nav__button">
          <img src={uploadIcon} alt="upload file icon" className="nav__icon" />
          <p className="nav__button-name">Upload Resource</p>
        </button> */}
        <SubmissionDrawer />
      </div>
    </ul>
  );
}

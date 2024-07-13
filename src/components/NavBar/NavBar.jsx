import "./NavBar.scss";
import trophyIcon from "../../assets/icons/trophy-01-svgrepo-com.png";
import uploadIcon from "../../assets/icons/upload-folder-svgrepo-com.png";
import uploadIcon2 from "../../assets/icons/upload-folder-svgrepo-com2.png";
import savedIcon from "../../assets/icons/saved-svgrepo-com.png";
import libraryIcon from "../../assets/icons/library-book-svgrepo-com.png";
import { useState } from "react";

export default function NavBar() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const toggleLibraryMenu = () => {
    setIsLibraryOpen(!isLibraryOpen);
  };

  const handleMouseEnter = () => {
    setIsLibraryOpen(true);
  };

  return (
    <ul className="nav__list">
      <div className="nav__container-top">
        <li className="nav__item">
          <img src={trophyIcon} alt="trophy icon" className="nav__icon" />
          <p className="nav__item-name">Rewards</p>
        </li>
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
          <p className="nav__item-name">Learning Library</p>
        </li>
        {isLibraryOpen && (
          <ul className="nav__library-sublist">
            <li className="nav__library-subitem">Software Engineering</li>
            <li className="nav__library-subitem">UX/UI Design</li>
            <li className="nav__library-subitem">Product</li>
            <li className="nav__library-subitem">Data Science</li>
          </ul>
        )}
      </div>
      <div className="nav__container-bottom">
        <button className="nav__button">
          <img src={uploadIcon} alt="upload file icon" className="nav__icon" />
          <p className="nav__button-name">Upload Resource</p>
        </button>
      </div>
    </ul>
  );
}

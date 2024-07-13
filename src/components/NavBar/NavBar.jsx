import "./NavBar.scss";
import trophyIcon from "../../assets/icons/trophy-01-svgrepo-com.png";
import uploadIcon from "../../assets/icons/upload-svgrepo-com.png";
import savedIcon from "../../assets/icons/saved-svgrepo-com.png";
import libraryIcon from "../../assets/icons/library-book-svgrepo-com.png";

export default function NavBar() {
  return (
    <ul className="nav__list">
      <div className="nav__container-top">
        <li className="nav__item">
          <img src={trophyIcon} alt="trophy icon" className="nav__icon" />
          <p className="nav__item-name">Rewards</p>
        </li>
        <li className="nav__item">
          <img src={uploadIcon} alt="upload file icon" className="nav__icon" />
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
        <li className="nav__item">
          <img
            src={libraryIcon}
            alt="library books icon"
            className="nav__icon"
          />
          <p className="nav__item-name">Learning Library</p>
        </li>
      </div>
      <div className="nav__container-bottom">
        <li className="nav__item">
          <img src={uploadIcon} alt="upload file icon" className="nav__icon" />
          <p className="nav__item-name">Upload Resource</p>
        </li>
      </div>
    </ul>
  );
}

import communitiLogo from "../../assets/communiti.svg";
import homeLogo from "../../assets/house.svg";
import eventLogo from "../../assets/calendar.svg";
import communitiesLogo from "../../assets/silhouette.svg";
import coffeeChatLogo from "../../assets/people_chatting.svg";
import learningHub from "../../assets/learningHub.svg";
import defaultUser from "../../assets/icons/defaultUser2.svg";
import downCarrot from "../../assets/down_carrot.svg";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header__navigation">
        <div className="header__main-icon">
          <img
            src={communitiLogo}
            alt="Communiti"
            className="header__main-image"
          />
        </div>

        <div className="header__icons ">
          <img src={homeLogo} alt="Home" className="header__images" />
          <div className="header__icon-titles">Home</div>
        </div>
        <div className="header__icons">
          <img
            src={communitiesLogo}
            alt="Communities"
            className="header__images"
          />
          <div className="header__icon-titles">Communities</div>
        </div>
        <div className="header__icons">
          <img src={eventLogo} alt="Events" className="header__images" />
          <div className="header__icon-titles">Events</div>
        </div>
        <div className="header__icons">
          <img src={coffeeChatLogo} alt="Chat" className="header__images" />
          <div className="header__icon-titles">Coffee Chat</div>
        </div>
        <Link to="/resource" className="page__link">
          <div className="header__icons">
          <img src={learningHub} alt="LearningHub" className="header__images" />
          <div className="header__icon-titles">Learning Hub</div>
        </div></Link> 
      </div>
      <div className="header__user-container">
        <img src={defaultUser} alt="Profile Pic" className="header__user-pic" />
        <img
          src={downCarrot}
          alt="Down Arrow"
          className="header__down-carrot"
        />
      </div>
    </div>
  );
};

export default Header;

import { useGlobalContext } from "../../context";
import communitiLogo from "../../assets/communiti.svg";
import homeLogo from "../../assets/house.svg";
import eventLogo from "../../assets/calendar.svg";
import communitiesLogo from "../../assets/silhouette.svg";
import coffeeChatLogo from "../../assets/people_chatting.svg";
import forumLogo from "../../assets/chat.svg";
import defaultUser from "../../assets/icons/defaultUser.svg";
import downCarrot from "../../assets/down_carrot.svg";
import burgerBarLogo from "../../assets/burger-menu.svg";
import "./Header.scss";

const Header = () => {
  const { randomUser2 } = useGlobalContext();
  console.log(randomUser2);

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

        <div className="header__icons header__icons--mobile-hide">
          <img src={homeLogo} alt="Home" className="header__images" />
          <div className="header__icon-titles">Home</div>
        </div>
        <div className="header__icons header__icons--mobile-hide">
          <img
            src={communitiesLogo}
            alt="Communities"
            className="header__images"
          />
          <div className="header__icon-titles">Communities</div>
        </div>
        <div className="header__icons header__icons--mobile-hide">
          <img src={eventLogo} alt="Events" className="header__images" />
          <div className="header__icon-titles">Events</div>
        </div>
        <div className="header__icons header__icons--mobile-hide">
          <img src={coffeeChatLogo} alt="Chat" className="header__images" />
          <div className="header__icon-titles">Coffee Chat</div>
        </div>
        <div className="header__icons header__icons--mobile-hide forum">
          <img src={forumLogo} alt="Forum" className="header__images" />
          <div className="header__icon-titles-forum">Forum</div>
        </div>
      </div>
      <div className="header__user-container header__icons--mobile-hide">
        <img
          src={
            randomUser2?.profilePhoto ? randomUser2?.profilePhoto : defaultUser
          }
          alt="Profile Pic"
          className="header__user-pic"
        />
        <img
          src={downCarrot}
          alt="Down Arrow"
          className="header__down-carrot"
        />
      </div>

      <div className="header__icons header__icons--mobile-show">
        <img src={burgerBarLogo} alt="Menu" className="header__images" />
      </div>
    </div>
  );
};

export default Header;

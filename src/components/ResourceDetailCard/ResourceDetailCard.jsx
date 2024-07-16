import "./ResourceDetailCard.scss";
import arrowForwardIcon from "../../assets/icons/arrow-forward-svgrepo-com.png";
import timerIcon from "../../assets/icons/timer-svgrepo-com.png";
import savedIcon from "../../assets/icons/saved-svgrepo-com.png";
import starIcon from "../../assets/icons/star-svgrepo-com.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ResourceDetailCard({ selectedResource }) {
  const [isRead, setIsRead] = useState(false);

  const handleToggleRead = () => {
    setIsRead((prevIsRead) => !prevIsRead);
  };

  return (
    <section className="resource-details">
      <div className="resource-details__heading-top">
        <div className="resource-details__heading-top-container">
          <p className="resource-details__type">{selectedResource.type}</p>
          <img
            src={savedIcon}
            alt="saved icon"
            className="resource-details__saved-icon"
          />
        </div>
      </div>
      <div className="resource-details__heading-bottom">
        <h1 className="resource-details__title">{selectedResource.title}</h1>
      </div>
      <p className="resource-details__level">{selectedResource.level}</p>

      <div className="resource-details__rating-timer-container">
        <div className="resource-details__rainting-star-container">
          <p className="resource-details__stars">
            <img
              src={starIcon}
              alt="star icon"
              className="resource-details__star-icon"
            />
            <img
              src={starIcon}
              alt="star icon"
              className="resource-details__star-icon"
            />
            <img
              src={starIcon}
              alt="star icon"
              className="resource-details__star-icon"
            />
            <img
              src={starIcon}
              alt="star icon"
              className="resource-details__star-icon"
            />
            <img
              src={starIcon}
              alt="star icon"
              className="resource-details__star-icon"
            />
          </p>
          <p className="resource-details__rating">15 ratings</p>
        </div>
        <div className="resource-details__timer">
          <p className="resource-details__duration">
            {selectedResource.duration}
          </p>
          <img
            src={timerIcon}
            alt="timer icon"
            className="resource-details__timer-icon"
          />
        </div>
      </div>

      <div className="resource-details__about">
        <p className="resource-details__preview">{selectedResource.preview}</p>
      </div>
      <div className="resource-details__tags-container">
        <p className="resource-details__tag">{selectedResource.tag1}</p>
        <p className="resource-details__tag">{selectedResource.tag2}</p>
        <p className="resource-details__tag">{selectedResource.tag3}</p>
        <p className="resource-details__tag">{selectedResource.tag4}</p>
      </div>
      <div className="resource-details__bottom-container">
        <div className="resource-details__author-container">
          <div className="resource-details__avatar"></div>
          <div className="resource-details__author">
            <p>Submitted by:</p>
            <p>{selectedResource.contributor}</p>
          </div>
        </div>
        <div className="resource-details__buttons-container">
          <Link to="" key="">
            <button className="resource-details__button">
              Go to Resource
              <img
                src={arrowForwardIcon}
                alt="arrow forward"
                className="resource-details__forward-arrow-icon"
              />
            </button>
          </Link>
          <button
            className={`resource-details__button ${
              isRead ? "resource-details__button--read" : ""
            }`}
            onClick={handleToggleRead}
          >
            {isRead ? "Mark as Unread" : "Mark as Read"}
          </button>
        </div>
      </div>
    </section>
  );
}

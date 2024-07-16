import "./ResourceDetailCard.scss";
import arrowForwardIcon from "../../assets/icons/arrow-forward-svgrepo-com.png";
import timerIcon from "../../assets/icons/timer-svgrepo-com.png";
import savedIcon from "../../assets/icons/saved-svgrepo-com.png";
import starIcon from "../../assets/icons/star-svgrepo-com.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ResourceDetailCard({ selectedResource }) {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const savedReadState = localStorage.getItem(selectedResource.id);
    if (savedReadState) {
      setIsRead(JSON.parse(savedReadState));
    }
  }, [selectedResource.id]);

  const handleToggleRead = () => {
    const newReadState = !isRead;
    setIsRead(newReadState);
    localStorage.setItem(selectedResource.id, JSON.stringify(newReadState));
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
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="resource-details__heading-bottom">
        <h1 className="resource-details__title">{selectedResource.title}</h1>
      </div>
      <p className="resource-details__level">{selectedResource.level}</p>

      <div className="resource-details__rating-timer-container">
        <div className="resource-details__rating-star-container">
          <p className="resource-details__stars">
            <img
              src={starIcon}
              alt="star icon"
              className="resource-details__star-icon"
              aria-hidden="true"
            />
            <img
              src={starIcon}
              alt="star icon"
              className="resource-details__star-icon"
              aria-hidden="true"
            />
            <img
              src={starIcon}
              alt="star icon"
              className="resource-details__star-icon"
              aria-hidden="true"
            />
            <img
              src={starIcon}
              alt="star icon"
              className="resource-details__star-icon"
              aria-hidden="true"
            />
            <img
              src={starIcon}
              alt="star icon"
              className="resource-details__star-icon"
              aria-hidden="true"
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
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="resource-details__about">
        <p className="resource-details__preview">{selectedResource.preview} </p>
      </div>
      <div className="resource-details__tags-container" role="list">
        {[
          selectedResource.tag1,
          selectedResource.tag2,
          selectedResource.tag3,
          selectedResource.tag4,
        ].map((tag, index) => (
          <p key={index} className="resource-details__tag" role="listitem">
            {tag}
          </p>
        ))}
        {/* <p className="resource-details__tag">{selectedResource.tag1}</p>
        <p className="resource-details__tag">{selectedResource.tag2}</p>
        <p className="resource-details__tag">{selectedResource.tag3}</p>
        <p className="resource-details__tag">{selectedResource.tag4}</p> */}
      </div>
      <div className="resource-details__bottom-container">
        <div className="resource-details__author-container">
          <div className="resource-details__avatar" aria-hidden="true"></div>
          <div className="resource-details__author">
            <p>Submitted by:</p>
            <p className="resource-details__author-name">
              {selectedResource.contributor}
            </p>
          </div>
        </div>
        <div className="resource-details__buttons-container">
          <Link to="" key="">
            <button
              className="resource-details__button"
              aria-label="Go to Resource"
            >
              Go to Resource
              <img
                src={arrowForwardIcon}
                alt="arrow forward"
                className="resource-details__forward-arrow-icon"
                aria-hidden="true"
              />
            </button>
          </Link>
          <button
            className={`resource-details__button ${
              isRead ? "resource-details__button--read" : ""
            }`}
            onClick={handleToggleRead}
            aria-pressed={isRead}
            aria-label={isRead ? "Mark as Unread" : "Mark as Read"}
          >
            {isRead ? "Mark as Unread" : "Mark as Read"}
          </button>
        </div>
      </div>
    </section>
  );
}

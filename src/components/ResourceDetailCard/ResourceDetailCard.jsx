import "./ResourceDetailCard.scss";
import arrowForwardIcon from "../../assets/icons/arrow-forward-svgrepo-com.png";
import timerIcon from "../../assets/icons/timer-2-svgrepo-com.png";
import bookmarkIcon from "../../assets/icons/bookmark-svgrepo-com.svg";
import bookmarkedIcon from "../../assets/icons/bookmarked.svg";
import starIcon from "../../assets/icons/star-svgrepo-com.png";
import savedIcon from "../../assets/icons/saved-svgrepo-com.png";
import Upvoting from "../Upvoting/Upvoting";
import { Link } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import React, { useState, useEffect } from "react";

export default function ResourceDetailCard({
  selectedResource,
  handleToggleBookmarked,
  savedBookmarks,
  isBookmarked,
  // comments,
}) {
  const [isRead, setIsRead] = useState(false);
  useEffect(() => {
    const savedReadState = localStorage.getItem(selectedResource.id);
    if (savedReadState) {
      setIsRead(JSON.parse(savedReadState));
    }
  }, [selectedResource.id]);

  const updatePoints = (pointsToAdd) => {
    const currentPoints = parseInt(localStorage.getItem("userPoints")) || 0;
    const newPoints = currentPoints + pointsToAdd;
    localStorage.setItem("userPoints", newPoints);
  };

  const handleToggleRead = () => {
    const newReadState = !isRead;
    setIsRead(newReadState);
    localStorage.setItem(selectedResource.id, JSON.stringify(newReadState));
    // if (newReadState) {
    //   updatePoints(10);
    // } else {
    //   updatePoints(-10);
    // }
  };

  return (
    <>
      <section className="resource-details">
        <div className="resource-details__heading-top">
          <div className="resource-details__heading-top-container">
            <p className="resource-details__type">{selectedResource.type}</p>
            <img
              src={isBookmarked ? bookmarkedIcon : bookmarkIcon}
              onClick={handleToggleBookmarked}
              alt="bookmark icon"
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
              <Upvoting />
            </p>
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
          <p className="resource-details__preview">
            {selectedResource.preview}{" "}
          </p>
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
              <p>Submitted by: </p>
              <p className="resource-details__author-name">
                {selectedResource.contributor}
              </p>
            </div>
          </div>
          <div className="resource-details__buttons-container">
            <Link to="" key="">
              <button
                className="resource-details__resource-button"
                aria-label="Go to Resource"
              >
                Go to Resource
                {/* <img
                  src={arrowForwardIcon}
                  alt="arrow forward"
                  className="resource-details__forward-arrow-icon"
                  aria-hidden="true"
                /> */}
              </button>
            </Link>
            <button
              className={`resource-details__button ${
                isRead ? "resource-details__button--read" : ""
              }`}
              onClick={handleToggleRead}
              aria-pressed={isRead}
              aria-label={isRead ? "Read!" : "Mark as Read"}
            >
              {isRead ? "Read!" : "Mark as Read"}
            </button>
          </div>
        </div>
      </section>
      <Comments selectedResource={selectedResource} />
    </>
  );
}

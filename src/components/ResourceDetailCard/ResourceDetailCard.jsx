import "./ResourceDetailCard.scss";
import timerIcon from "../../assets/icons/timer.png";
import bookmarkIcon from "../../assets/icons/bookmark-svgrepo-com.svg";
import bookmarkedIcon from "../../assets/icons/bookmarked.svg";
import Upvoting from "../Upvoting/Upvoting";
import { Link } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import React, { useState, useEffect } from "react";

export default function ResourceDetailCard({
  selectedResource,
  handleToggleBookmarked,
  savedBookmarks,
  isBookmarked,
  comments,
  currentUser,
  onResourceUpdate,
}) {
  const [localResource, setLocalResource] = useState(selectedResource);

  useEffect(() => {
    console.log("Selected resource:", selectedResource); // Debug log
    setLocalResource(selectedResource);
  }, [selectedResource]);

  const handleVoteChange = (upvotes, downvotes, resourceId) => {
    console.log("Vote change:", upvotes, downvotes, resourceId); // Debug log
    setLocalResource(prev => ({
      ...prev,
      upvotes,
      downvotes
    }));
    if (onResourceUpdate) {
      onResourceUpdate({
        ...localResource,
        id: resourceId,
        upvotes,
        downvotes
      });
    }
  };

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

  console.log("Passing resourceId to Upvoting:", localResource.id);

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
            <div className="resource-details__stars">
              <Upvoting
                resourceId={localResource.id}
                currentUser={currentUser}
                initialUpvotes={localResource.upvote}
                initialDownvotes={localResource.downvote}
                onVoteChange={handleVoteChange}
                likedByUser={localResource.likedByUser}
              />
            </div>
          </div>
          <div className="resource-details__timer-container">
            <img
              src={timerIcon}
              alt="timer icon"
              className="resource-details__timer-icon"
            />
            <p className="resource-details__time">
              {selectedResource.timeToComplete}
            </p>
          </div>
        </div>
        <p className="resource-details__description">
          {selectedResource.description}
        </p>
        <div className="resource-details__buttons-container">
          <Link to={selectedResource.link}>
            <button className="resource-details__button" type="button">
              Go to resource
            </button>
          </Link>
          <button
            className={`resource-details__button ${isRead ? "resource-details__button--active" : ""
              }`}
            onClick={handleToggleRead}
          >
            {isRead ? "Mark as unread" : "Mark as read"}
          </button>
        </div>
      </section>
      <Comments
        resourceId={selectedResource.id}
        comments={comments}
        currentUser={currentUser}
      />
    </>
  );
}
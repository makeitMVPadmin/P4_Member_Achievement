import React, { useState } from "react";
import { Link } from "react-router-dom";
// import arrowForwardIcon from "../../assets/icons/blue-arrow-forward-svgrepo-com.png";
import arrowForwardIcon from "../../assets/icons/blue-arrow-forward-svgrepo-com.png";
import timerIcon from "../../assets/icons/timer-2-svgrepo-com.png";
import Upvoting from "../Upvoting/Upvoting";
import "./ResourceCard.scss";

export default function ResourceCard(props) {
  const { resource, selectResource, isActive } = props;
  console.log(resource)

  const handleClickCard = () => {
    selectResource(resource.id);
  };

  return (
    <section
      className={`resource ${isActive ? "resource--active" : ""}`}
      onClick={handleClickCard}
      tabIndex="0"
      role="button"
      aria-pressed={isActive ? "true" : "false"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClickCard();
        }
      }}
    >
      <div className="resource__heading-top">
        <div className="resource__heading-top-container">
          <p className="resource__type">{resource.type}</p>
        </div>
        <div className="resource__timer">
          <p className="resource__duration">{resource.estDuration}</p>
          <img
            src={timerIcon}
            alt="timer icon"
            className="resource__timer-icon"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="resource__heading-bottom">
        <h1 className="resource__title">{resource.title}</h1>
        <Upvoting />
      </div>
      <p className="resource__level">{resource.skillLevel}</p>
      <div className="resource__about">
        <p className="resource__preview">{resource.description}</p>
        <Link className="resource__link" aria-label="Go to resource details">
          <img
            src={arrowForwardIcon}
            alt="arrow forward"
            className="resource__forward-arrow-icon"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}

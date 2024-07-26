import React, { useState } from 'react';
import Upvoting from '../Upvoting/Upvoting';
import "../ResourceCard/ResourceCard.scss"
import timerIcon from "../../assets/icons/timer-2-svgrepo-com.png";
import arrowForwardIcon from "../../assets/icons/blue-arrow-forward-svgrepo-com.png";
import { Link } from "react-router-dom";


const Contribution = () => {
  
  const formData = JSON.parse(localStorage.getItem('formData')) || {};
  console.log (formData)

  const { resource, selectResource, isActive } = formData;
  

  const handleClickCard = () => {
    selectResource(resource.title);
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
          <p className="resource__type">{formData.type}</p>
        </div>
        <div className="resource__timer">
          <p className="resource__duration">{formData.duration}</p>
          <img
            src={timerIcon}
            alt="timer icon"
            className="resource__timer-icon"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="resource__heading-bottom">
        <h1 className="resource__title">{formData.title}</h1>
        <Upvoting />
      </div>
      <p className="resource__level">{formData.skillLevel}</p>
      <div className="resource__about">
        <p className="resource__preview">{formData.description}</p>
        <Link
          to=""
          className="resource__link"
          aria-label="Go to resource details"
        >
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

export default Contribution


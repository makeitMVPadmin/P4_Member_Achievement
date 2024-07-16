import { Link } from "react-router-dom";
import arrowForwardIcon from "../../assets/icons/arrow-forward-svgrepo-com.png";
import timerIcon from "../../assets/icons/timer-svgrepo-com.png";
import starIcon from "../../assets/icons/star-svgrepo-com.png";
import "./ResourceCard.scss";

export default function ResourceCard(props) {
  const { resource, selectResource } = props;

  return (
    <section
      className="resource"
      onClick={() => selectResource(resource.id)}
      tabIndex="0"
      role="button"
      aria-pressed="false"
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          selectResource(resource.id);
        }
      }}
    >
      <div className="resource__heading-top">
        <div className="resource__heading-top-container">
          <p className="resource__type">{resource.type}</p>
        </div>
        <div className="resource__timer">
          <p className="resource__duration">{resource.duration}</p>
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
        <p className="resource__rating">
          <img
            src={starIcon}
            alt="star icon"
            className="resource__star-icon"
            aria-hidden="true"
          />
          <img
            src={starIcon}
            alt="star icon"
            className="resource__star-icon"
            aria-hidden="true"
          />
          <img
            src={starIcon}
            alt="star icon"
            className="resource__star-icon"
            aria-hidden="true"
          />
          <img
            src={starIcon}
            alt="star icon"
            className="resource__star-icon"
            aria-hidden="true"
          />
          <img
            src={starIcon}
            alt="star icon"
            className="resource__star-icon"
            aria-hidden="true"
          />
        </p>
      </div>
      <p className="resource__level">{resource.level}</p>
      <div className="resource__about">
        <p className="resource__preview">{resource.preview}</p>
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

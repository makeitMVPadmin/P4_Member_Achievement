import { Link } from "react-router-dom";
import arrowForwardIcon from "../../assets/icons/arrow-forward-svgrepo-com.png";
import timerIcon from "../../assets/icons/timer-svgrepo-com.png";
import starIcon from "../../assets/icons/star-svgrepo-com.png";
import "./ResourceCard.scss";

export default function ResourceCard() {
  return (
    <section className="resource">
      <div className="resource__heading-top">
        <div className="resource__heading-top-container">
          <p className="resource__type">Course</p>
        </div>
        <div className="resource__timer">
          <p className="resource__duration">8 min</p>
          <img
            src={timerIcon}
            alt="timer icon"
            className="resource__timer-icon"
          />
        </div>
      </div>
      <div className="resource__heading-bottom">
        <h1 className="resource__title">Build a Machine Learning Model</h1>
        <p className="resource__rating">
          <img src={starIcon} alt="star icon" className="resource__star-icon" />
          <img src={starIcon} alt="star icon" className="resource__star-icon" />
          <img src={starIcon} alt="star icon" className="resource__star-icon" />
          <img src={starIcon} alt="star icon" className="resource__star-icon" />
          <img src={starIcon} alt="star icon" className="resource__star-icon" />
        </p>
      </div>
      <p className="resource__level">Intermediate Level</p>
      <div className="resource__about">
        <p className="resource__preview">
          Learn to build machine learning models using regression,
          classification, and clustering.
        </p>
        <Link to="" className="resource__link">
          <img
            src={arrowForwardIcon}
            alt="arrow forward"
            className="resource__forward-arrow-icon"
          />
        </Link>
      </div>
    </section>
  );
}

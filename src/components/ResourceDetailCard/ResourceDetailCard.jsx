import "./ResourceDetailCard.scss";
import arrowForwardIcon from "../../assets/icons/arrow-forward-svgrepo-com.png";
import timerIcon from "../../assets/icons/timer-svgrepo-com.png";
import savedIcon from "../../assets/icons/saved-svgrepo-com.png";
import starIcon from "../../assets/icons/star-svgrepo-com.png";

export default function ResourceDetailCard() {
  return (
    <section className="resource-details">
      <div className="resource-details__heading-top">
        <div className="resource-details__heading-top-container">
          <p className="resource-details__type">Course</p>
          <img
            src={savedIcon}
            alt="saved icon"
            className="resource-details__saved-icon"
          />
        </div>
      </div>
      <div className="resource-details__heading-bottom">
        <h1 className="resource-details__title">
          Build a Machine Learning Model
        </h1>
      </div>
      <p className="resource-details__level">Intermediate Level</p>

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
          <p className="resource-details__duration">8 min</p>
          <img
            src={timerIcon}
            alt="timer icon"
            className="resource-details__timer-icon"
          />
        </div>
      </div>

      <div className="resource-details__about">
        <p className="resource-details__preview">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita,
          facilis eius accusantium quia voluptas cum ex quo, dolores, quam harum
          quae impedit. Harum, possimus tenetur commodi nam et odit labore!
          Praesentium, a! Animi odio distinctio rerum! Distinctio ut eum eius,
          ipsa asperiores obcaecati possimus deserunt mollitia ea voluptatibus.
          Iusto adipisci facilis tenetur dolor unde, aspernatur voluptate
          laudantium commodi sit natus, harum necessitatibus voluptatem modi
          laboriosam quisquam eaque, facere praesentium veniam omnis rem!
          Debitis facilis accusantium atque dolor et laudantium accusamus sint
          aliquam ad sed molestiae quibusdam facere ut consequuntur repellat,
          beatae excepturi fugit eos veniam? Voluptatem, officia. Minus vitae
          facere beatae placeat adipisci doloremque iure iusto ad est
          voluptatum! Ab, dicta eius, quisquam alias voluptatum in possimus vero
          reiciendis atque enim quasi, beatae inventore! Quam placeat, quas
          commodi rem itaque quasi assumenda, nam nemo voluptates ea excepturi
          magnam possimus, laborum eum voluptatem est laboriosam doloremque.
          Aliquam animi eum velit amet fugit minus. Eveniet neque, eaque tempora
          ullam nemo repellat optio porro beatae soluta corporis labore nostrum
          excepturi deserunt, molestiae hic velit vitae eum ipsum aut quia.
          Quasi praesentium iste nihil reprehenderit. Nobis recusandae debitis
          ab atque mollitia accusamus ipsum eveniet, possimus impedit inventore,
          animi sequi aperiam incidunt aliquam veniam aspernatur. Quia veniam
          laboriosam iste illo mollitia. Sapiente ex vero, voluptate modi
          consectetur non ratione asperiores quisquam perspiciatis harum
          possimus laborum, rem maxime est iusto cum vel odio quasi fugiat?
          Quibusdam magni, illum reiciendis minima labore ducimus vel aliquam
          vitae.
        </p>
      </div>
      <div className="resource-details__tags-container">
        <p className="resource-details__tag">Python</p>
        <p className="resource-details__tag">Machine Learning</p>
        <p className="resource-details__tag">Regression</p>
        <p className="resource-details__tag">Big Data</p>
      </div>
      <div className="resource-details__bottom-container">
        <div className="resource-details__author-container">
          <div className="resource-details__avatar"></div>
          <div className="resource-details__author">
            <p>Submitted by:</p>
            <p>Anna Lei</p>
          </div>
        </div>
        <div className="resource-details__buttons-container">
          <button className="resource-details__button">
            Go to Resource
            <img
              src={arrowForwardIcon}
              alt="arrow forward"
              className="resource-details__forward-arrow-icon"
            />
          </button>
          <button className="resource-details__button">Mark as Read</button>
        </div>
      </div>
    </section>
  );
}

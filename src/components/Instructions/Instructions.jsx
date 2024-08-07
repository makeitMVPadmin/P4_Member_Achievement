import "./Instructions.scss";
import documentImg from "../../assets/images/document.png";
import trophyImg from "../../assets/images/trophy.png";
import bookshelfImg from "../../assets/images/bookshelf.png";
import bookmarkBlueImg from "../../assets/images/bookmark-blue.png";

export default function Instructions() {
  return (
    <div className="instructions__container">
      <section className="instructions__section">
        <img
          src={bookshelfImg}
          alt="bookshelf image"
          className="instructions__img"
        />
        <p className="instructions__text">
          Select <span className="instructions__bold">Learning Library</span> to
          explore resources submitted by other Community members.
        </p>
      </section>
      <section className="instructions__section">
        <img
          src={documentImg}
          alt="document file image"
          className="instructions__img"
        />
        <p className="instructions__text">
          Select <span className="instructions__bold">Contributions</span> to
          view resources you've submitted.
        </p>
      </section>
      <section className="instructions__section">
        <img
          src={bookmarkBlueImg}
          alt="blue bookmark image"
          className="instructions__img"
        />
        <p className="instructions__text">
          Select <span className="instructions__bold">Bookmarked</span> to
          revisit resources you've saved.
        </p>
      </section>
      <section className="instructions__section">
        <img src={trophyImg} alt="trophy image" className="instructions__img" />
        <p className="instructions__text">
          Select <span className="instructions__bold">Rewards</span> to track
          your points and redeem rewards.
        </p>
      </section>
    </div>
  );
}

import Coin from "../../assets/icons/coin.png";
import "./RedemptionCard.scss";
import RedemptionToast from "./RedemptionToast";

export default function RedemptionCardTest3({ points, deductPoints }) {
  const requiredPoints = 400;

  return (
    <section className="reward">
      <div className="reward__heading-top">
        <div className="reward__heading-top-container">
          <h1 className="reward__title">Resume Review</h1>
        </div>
        <div className="reward__content">
          <p className="reward__description">
            Get a professional and thorough review and enhancement of your
            resume.
          </p>
          <div className="reward__point-container">
            <img src={Coin} alt="coin icon" className="coin-icon" />
            <span className="reward__required-points">400 points</span>
          </div>
        </div>
        <div className="reward__button-container">
          <RedemptionToast
            onClick={() => deductPoints(requiredPoints)}
            // disabled={points < requiredPoints}
          />
        </div>
      </div>
    </section>
  );
}

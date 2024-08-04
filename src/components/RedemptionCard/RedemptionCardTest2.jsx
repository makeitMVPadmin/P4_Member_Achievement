import Coin from "../../assets/icons/coin.png";
import "./RedemptionCard.scss";
import RedemptionToast from "./RedemptionToast";

export default function RedemptionCardTest2({ deductPoints }) {
  return (
    <section className="reward">
      <div className="reward__heading-top">
        <div className="reward__heading-top-container">
          <h1 className="reward__title">Resume Template</h1>
        </div>
        <div className="reward__content">
          <p className="reward__description">
            Access a professionally designed resume template to create a
            standout CV.
          </p>
          <div className="reward__point-container">
            <img src={Coin} alt="coin icon" className="coin-icon" />
            <span className="reward__required-points">300 points</span>
          </div>
        </div>
        <div className="reward__button-container">
          <RedemptionToast onClick={() => deductPoints(300)} />
        </div>
      </div>
    </section>
  );
}

import Coin from "../../assets/icons/coin.png";
import "./RedemptionCard.scss";
import RedemptionToast from "./RedemptionToast";

export default function RedemptionCardTest({ deductPoints }) {
  const handleClaimReward = () => {
    deductPoints(200);
  };

  return (
    <section className="reward">
      <div className="reward__heading-top">
        <div className="reward__heading-top-container">
          <h1 className="reward__title">Internship Placement Assistance </h1>
        </div>
        <div className="reward__content">
          <p className="reward__description">
            Receive help finding and securing internship oppurtunities.
          </p>
          <div className="reward__point-container">
            <img src={Coin} alt="coin icon" className="coin-icon" />
            <span className="reward__required-points">200 points</span>
          </div>
        </div>
        <div className="reward__button-container">
          {/* <RedemptionToast onClick={handleClaimReward} /> */}
          <RedemptionToast onClick={() => deductPoints(200)} />
        </div>
      </div>
    </section>
  );
}

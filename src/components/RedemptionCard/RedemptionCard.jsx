import Coin from "../../assets/icons/coin.png";
import "./RedemptionCard.scss";
import rewardOptionsData from "../../data/reward-options.json";

export default function RedemptionCard() {
  return (
    <div className="reward-options__cards2">
      {rewardOptionsData.map((reward) => (
        <section key={reward.id}  className="reward reward--error">
          <div className="reward__heading-top">
            <div className="reward__heading-top-container">
              <h1 className="reward__title">{reward.name}</h1>
            </div>
            <div className="reward__content">
              <p className="reward__description">{reward.detail}</p>
              <div className="reward__point-container">
                <img src={Coin} alt="coin icon" className="coin-icon" />
                <span className="reward__required-points">{reward.points}</span>
              </div>
            </div>
            <div className="reward__button-container">
              <button className="reward__claim-button-error">Claim</button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

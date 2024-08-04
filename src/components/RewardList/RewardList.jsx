import "./RewardList.scss";
import { useState } from "react";
import Coin from "../../assets/icons/coin.png";
import rewardOptionsData from "../../data/reward-options.json";

export default function RewardList() {
  return (
    <div className="reward-list__container">
      {rewardOptionsData.map((reward) => (
        <section className="reward-list__card">
          <div className="reward-list__top">
            <p className="reward-list__name">{reward.name}</p>
            <div className="reward-list__points">
              <img src={Coin} alt="coin icon" className="reward-list__icon" />
              <p>{reward.points}</p>
            </div>
          </div>
          <p className="reward-list__detail">{reward.detail}</p>
        </section>
      ))}
    </div>
  );
}

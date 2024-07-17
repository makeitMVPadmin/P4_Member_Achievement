import NavBar from "../../components/NavBar/NavBar";
import PointsBalance from "../../components/PointsBalance/PointsBalance";
import RedemptionCard from "../../components/RedemptionCard/RedemptionCard";
import RedemptionCardTest from "../../components/RedemptionCard/RedemptionCardTest";
import "./Rewardspage.scss";
import RedemptionOptions from "../../components/RedemptionOptions/RedemptionOptions";

export default function RewardsPage() {
  return (
    <div className="rewards_container">
      <div className="resource__navbar-container">
        <NavBar />
      </div>

      <div className="rewards-right-container">
        {/* <div className="points-balance-container">
          <h2>Your Points</h2>
        <PointsBalance />
        </div> */}

        <div className="daily-redemption-options-container">
          <h1 className="rewards-redemption-title">Daily Redemption Options</h1>
          <p className="options-description">
            Earn points by completing any of the actions listed below! Please
            note: certain actions have daily restrictions. You are welcome to
            continue completing these actions, but will only accumulate points
            up to the daily restriction.{" "}
          </p>
          <div className="redemption-options">
            <RedemptionOptions />
          </div>
        </div>

        <div className="rewards-redemption__container">
          <h2 className="rewards-redemption-title2">
            Reward Redemption Options
          </h2>
          <div className="rewards-redemption-cards">
            <RedemptionCardTest />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
          </div>
        </div>
      </div>
    </div>
  );
}

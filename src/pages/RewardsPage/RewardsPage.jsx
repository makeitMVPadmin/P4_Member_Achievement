import NavBar from "../../components/NavBar/NavBar";
import PointsBalance from "../../components/PointsBalance/PointsBalance";
import RedemptionCard from "../../components/RedemptionCard/RedemptionCard";
import RedemptionCardTest from "../../components/RedemptionCard/RedemptionCardTest";
import "./Rewardspage.css"


export default function RewardsPage() {
  return (
    <div className="rewards_container">
      <div className="resource__navbar-container">
        <NavBar />
      </div>

    {/*<div className="points-balance-container">
        <h2>Your Points</h2>
        <PointsBalance />
      </div> */}

  
  `{/* <div className="daily-redemption-options-container">
        <h1 className="redemption-options-title">Daily Redemption Options</h1>
          <div className="redemption-options">
            <PointsBalance
            <RedemptionOptions />
          </div>
      </div> */}
     
      <div className="rewards-redemption__container">
         <h2 className="rewards-redemption-title">Reward Redemption Options</h2>
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
  );
}
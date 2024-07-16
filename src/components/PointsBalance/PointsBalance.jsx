import Piggy from "../../assets/icons/piggy-bank.png";
import "./PointsBalance.scss"

export default function PointsBalance () {
  return (
    <div className="">
      <div className="">
        <img src={Piggy} alt="piggy bank icon" className="reward__icon" />
        <p>Your Points Balance</p>
      </div>

    <div className="reward_balance">
      <p>280 <span className="grey-text">20 points to next reward</span></p>
    </div>
    </div>
  );
}
import Coin from "../../assets/icons/coin.png"
import "./RedemptionCard.css"
import RedemptionToast from "./RedemptionToast"


export default function RedemptionCardTest () {
  return (
    <section className="reward">
      <div className="reward__heading-top">
        <div className="reward__heading-top-container">
          <h1 className="reward__title">Internship Placement Assistance </h1>
        </div>
        <div className="reward__content" >
          <p className="reward__description">Receive help finding and securing internship oppurtunities.</p>
          <div className="reward__point-container">
            <img src={Coin} alt="coin icon" className="coin-icon" />
            <span className="reward__required-points">300 points</span>
          </div>
        </div>
        <div className="reward__button-container">
          {/* <button className="reward__claim-button">
            Claim
          </button> */}
          <RedemptionToast />
        </div>

      </div>
    </section>
  )
}


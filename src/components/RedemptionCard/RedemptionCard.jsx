import Coin from "../../assets/icons/coin.png"
import "./RedemptionCard.css"



export default function RedemptionCard () {
  return (
    <section className="reward">
      <div className="reward__heading-top">
        <div className="reward__heading-top-container">
          <h1 className="reward__title">Mentorship Session</h1>
        </div>
        <div className="reward__content" >
          <p className="reward__description">Receive guidance from one of our experienced mentor.</p>
          <div className="reward__point-container">
            <img src={Coin} alt="coin icon" className="coin-icon" />
            <span className="reward__required-points">1000 points</span>
          </div>
        </div>
        <div className="reward__button-container">
          <button className="reward__claim-button-error">
            Claim
          </button>
        </div>

      </div>
    </section>
  )
}
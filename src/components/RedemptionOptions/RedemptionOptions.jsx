import Thumb from "../../assets/icons/social-network.png"
import Left from "../../assets/icons/turn-left.png"
import Check from "../../assets/icons/check.png"
import Stop from "../../assets/icons/ban.png"
import Book from "../../assets/icons/book-bookmark.png"
import "./RedemptionOptions.css"

export default function RedemptionOptions () {
  return (
    // <div className="redemption-options-cards">
    //   <div className="redemption-options-card">
    //     <img src={Thumb} alt="" className="option-icon" />
    //     <span className="option-title">Text</span>
    //     <span className="option-point-limits">Daily Limit: 14 points</span>
    //     {/* <p className="option-points">+10 points</p> */}
        
    //   </div>
    // </div>
    <div className="redemption-options-cards">
        <div className="redemption-options-card">
            <div class="option-icon">
                <img src={Thumb} alt="Like a resource" width="24" height="24"/>
                <span class="item-text">Like a resource</span>
            </div>
            <div class="points">+2 points<br/>Daily limit: 14 points</div>
        </div>
        <div className="redemption-options-card">
            <div class="option-icon">
                <img src={Book} alt="Mark a resource as read" width="24" height="24"/>
                <span class="item-text">Mark a resource as read</span>
            </div>
            <div class="points">+10 points<br/>No daily limit</div>
        </div>
        <div className="redemption-options-card">
            <div class="option-icon">
                <img src={Left} alt="Suggest a resource" width="24" height="24"/>
                <span class="item-text">Suggest a resource</span>
            </div>
            <div class="points">+20 points<br/>No daily limit</div>
        </div>
        <div className="redemption-options-card">
            <div class="option-icon">
                <img src={Thumb} alt="Like a resource" width="24" height="24"/>
                <span class="item-text">Like a resource</span>
            </div>
            <div class="points">+2 points<br/>Daily limit: 14 points</div>
        </div>
        <div className="redemption-options-card">
            <div class="option-icon">
                <img src={Book} alt="Mark a resource as read" width="24" height="24"/>
                <span class="item-text">Mark a resource as read</span>
            </div>
            <div class="points">+10 points<br/>No daily limit</div>
        </div>
    </div>
  )
}

{/* <div className="redemption-options-cards">
        <div className="redemption-options-card">
            <div class="option-icon">
                <img src="thumb-icon.png" alt="Like a resource" width="24" height="24"/>
                <span class="item-text">Like a resource</span>
            </div>
            <div class="points">+2 points<br/>Daily limit: 14 points</div>
        </div>
        <div className="redemption-options-card">
            <div class="option-icon">
                <img src="mark-icon.png" alt="Mark a resource as read" width="24" height="24"/>
                <span class="item-text">Mark a resource as read</span>
            </div>
            <div class="points">+10 points<br/>No daily limit</div>
        </div>
        <div className="redemption-options-card">
            <div class="option-icon">
                <img src="suggest-icon.png" alt="Suggest a resource" width="24" height="24"/>
                <span class="item-text">Suggest a resource</span>
            </div>
            <div class="points">+20 points<br/>No daily limit</div>
        </div>
    </div> */}
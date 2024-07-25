import NavBar from "../../components/NavBar/NavBar";
import "./ContributionsPage.scss"


function ContributionsPage() {
  return (
    <div className="contributions__container">
    <div className="resource__navbar-container">
      <NavBar />
    </div>

    <div className="contributions__cards">
    <h1>These are the smaller resource cards</h1>
    </div>

    <div className="contributions__details-container">
    <h2>This is the expanded resource card</h2>
    </div>
    </div>
  )
}

export default ContributionsPage
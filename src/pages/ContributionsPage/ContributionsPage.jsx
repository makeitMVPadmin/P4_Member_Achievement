import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./ContributionsPage.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../config/firebase";
import Contribution from "../../components/Contributions/Contribution";

function ContributionsPage({ currentUser }) {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const getAllContributedResources = async () => {
      try {
        const resourcesCollectionRef = collection(database, "Resources");
        const userResourcesQuery = query(
          resourcesCollectionRef,
          where("userID", "==", currentUser)
        );
        const querySnapshot = await getDocs(userResourcesQuery);
        const resourcesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContributions(resourcesData);
      } catch (error) {
        console.error("Error fetching user resources: ", error);
      }
    };

    getAllContributedResources();
  }, [currentUser]);

  // Just to show the log of contributions update after it's been set. Can be deleted.
  useEffect(() => {
    console.log("Contributions:");
    console.log(contributions);
  }, [contributions]);

  return (
    <div className="contributions__container">
      <div className="resource__navbar-container">
        <NavBar />
      </div>

      <div className="contributions__cards">
        {/* <h1>These are the smaller resource cards</h1> */}
        <Contribution /> 
        {/* Contributions need to be rendered */}
      </div>

      <div className="contributions__details-container">
        <h2>This is the expanded resource card</h2>
      </div>
    </div>
  );
}

export default ContributionsPage;

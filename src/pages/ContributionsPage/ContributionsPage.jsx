import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./ContributionsPage.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../config/firebase";
// import Contribution from "../../components/Contributions/Contribution";
import ResourceList from "../../components/ResourceList/ResourceList";
import blueWaveImg from "../../assets/images/blue-wave.png";

function ContributionsPage({ currentUser }) {
  const navigate = useNavigate()
  const [contributions, setContributions] = useState([]);
  const [displaySelectedResource, setdisplaySelectedResource] = useState([]);

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

  const handleSelectResource = (clickedId) => {
    const foundResource = contributions.find(
      (resource) => clickedId === resource.id
    );
    setdisplaySelectedResource(foundResource)
    navigate(`/resource/${clickedId}`)
  };

  


  return (
    <div className="contributions__container">
      <div className="resource__background">
        <img
          className="resource__container__img"
          src={blueWaveImg}
          alt="blue wave background"
        />
      </div>

      <div className="resource__navbar-container">
        <NavBar />
      </div>

      <div className="contributions__cards">
        <ResourceList
          resources={contributions}
          selectResource={handleSelectResource}
        />
      </div>
    </div>
  );
}

export default ContributionsPage;

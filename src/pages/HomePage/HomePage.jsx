import "./HomePage.scss";
import Onboarding from "../../components/Onboarding/Onboarding";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); //

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenOnboardingModal");

    if (!hasSeenModal) {
      setIsModalOpen(true);
    }
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    localStorage.setItem("hasSeenOnboardingModal", "true");
  };

  return (
    <div className="homepage">
      <Onboarding
        // className="homepage__onboarding"
        isOpen={isModalOpen}
        onClose={handleModalClose}
        style={{
          transform: "translate(-50%, -50%)",
          width: "40rem",
        }}
      />
      <h1>welcome to the community library</h1>
    </div>
  );
};

export default HomePage;

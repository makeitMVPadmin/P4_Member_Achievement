import { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import Confetti from "react-confetti";
import "./RedemptionCard.scss";

function RedemptionToast({ onClick }) {
  const toast = useToast();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = async () => {
    const examplePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        onClick();
        resolve(200);
      }, 5000);
    });

    toast.promise(examplePromise, {
      success: {
        title: "Claim Complete!",
        description: "A community leader will reach out to you shortly.",
      },
      error: {
        title: "Promise rejected",
        description: "Sorry, but you don't have enough points",
      },
      loading: { title: "Claiming Reward", description: "Please wait" },
    });

    try {
      await examplePromise;
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.width}
          height={window.height}
          recycle={false}
          numberOfPieces={600}
          style={{ position: "fixed", top: 10, left: 10, zIndex: 1000 }}
        />
      )}
      <button className="reward__claim-button-approve" onClick={handleClick}>
        Claim
      </button>
    </>
  );
}

export default RedemptionToast;

import { Button, useToast } from "@chakra-ui/react";
import "./RedemptionCard.scss";

function RedemptionToast({ onClick }) {
  const toast = useToast();

  const handleClick = () => {
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
  };

  return (
    <button className="reward__claim-button-approve" onClick={handleClick}>
      Claim
    </button>
  );
}

export default RedemptionToast;

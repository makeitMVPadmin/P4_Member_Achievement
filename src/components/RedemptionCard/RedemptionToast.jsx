import { Button, useToast } from "@chakra-ui/react";
import "./RedemptionCard.scss";

function RedemptionToast() {
  const toast = useToast();
  return (
    <button
      className="reward__claim-button-approve"
      onClick={() => {
        // Create an example promise that resolves in 5s
        const examplePromise = new Promise((resolve, reject) => {
          setTimeout(() => resolve(200), 5000);
        });

        // Will display the loading toast until the promise is either resolved
        // or rejected.
        toast.promise(examplePromise, {
          success: {
            title: "Claim Complete!",
            description: "A community leader will reach out to you shortly.",
          },
          error: { title: "Promise rejected", description: "Something wrong" },
          loading: { title: "Claiming Reward", description: "Please wait" },
        });
      }}
    >
      Claim
    </button>
  );
}

export default RedemptionToast;

import piggy from "../../assets/icons/piggy-bank-svgrepo-com.png";
import "./PointsBalance.scss";
import { Box, Progress } from "@chakra-ui/react";

export default function PointsBalance({ points, maxPoints }) {
  // const nextRewardPoints = maxPoints - points;

  return (
    <div className="rewards__points-wrapper">
      <section>
        <img
          className="rewards__points-img"
          src={piggy}
          alt="piggy bank icon"
        />
      </section>
      <section>
        <div>
          <p className="rewards__points-subtitle">Your Points Balance</p>
          <div className="rewards__points-balance-wrapper">
            <p className="rewards__points-number">{points}</p>
            <p className="rewards__points-next-level">
              20 points to next reward
            </p>
          </div>
        </div>
      </section>
      <section>
        <Box width="100%" maxW="400px" margin="auto" textAlign="center">
          <Progress
            value={points}
            max={maxPoints}
            size="lg"
            colorScheme="teal"
            hasStripe
            isAnimated
          />
        </Box>
      </section>
    </div>
  );
}

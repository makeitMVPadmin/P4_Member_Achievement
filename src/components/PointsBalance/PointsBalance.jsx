import piggy from "../../assets/images/piggy-bank.png";
import "./PointsBalance.scss";
import { Box, Progress } from "@chakra-ui/react";

export default function PointsBalance({ points, maxPoints }) {
  // const nextRewardPoints = maxPoints - points;

  return (
    <>
      <section>
        <img
          className="rewards__points-img"
          src={piggy}
          alt="piggy bank icon"
        />
      </section>
      <section>
        <div>
          {/* <div className="rewards__points-balance-wrapper"> */}
          <h1 className="rewards__points-number">{points}</h1>
          <p className="rewards__points-subtitle">Earned Points</p>
          {/* <p className="rewards__points-next-level">
              20 points to next reward
            </p> */}
          {/* </div> */}
        </div>
      </section>
      <section>
        <Box width="100%" maxW="400px" margin="auto" textAlign="center">
          {/* <Progress
            value={points}
            max={maxPoints}
            size="lg"
            colorScheme="teal"
            hasStripe
            isAnimated
          /> */}
        </Box>
      </section>
    </>
  );
}

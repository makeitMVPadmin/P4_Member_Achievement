import piggy from "../../assets/images/piggy-bank.png";
import "./PointsBalance.scss";
import { Box, Progress } from "@chakra-ui/react";

export default function PointsBalance({ points, maxPoints }) {
  return (
    <>
      {/* <section>
        <img
          className="rewards__points-img"
          src={piggy}
          alt="piggy bank icon"
        />
      </section> */}
      <section>
        <div>
          <h1 className="rewards__points-number">{points}</h1>
          <p className="rewards__points-subtitle">Earned Points</p>
        </div>
      </section>
      <section>
        <Box width="100%" maxW="400px" margin="auto" textAlign="center"></Box>
      </section>
    </>
  );
}

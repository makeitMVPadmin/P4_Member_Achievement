import NavBar from "../../components/NavBar/NavBar";
import PointsBalance from "../../components/PointsBalance/PointsBalance";
import RedemptionCard from "../../components/RedemptionCard/RedemptionCard";
import RedemptionCardTest from "../../components/RedemptionCard/RedemptionCardTest";
import "./Rewardspage.scss";
import RedemptionOptions from "../../components/RedemptionOptions/RedemptionOptions";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Box,
  Circle,
} from "@chakra-ui/react";
import { useState } from "react";

export default function RewardsPage() {
  const [points, setPoints] = useState(280);
  const maxPoints = 1000;

  const handleSliderChange = (value) => {
    setPoints(value);
  };

  const deductPoints = (deduction) => {
    setPoints((prevPoints) => Math.max(prevPoints - deduction, 0));
  };

  return (
    <div className="rewards_container">
      <div className="resource__navbar-container">
        <NavBar />
      </div>

      <div className="rewards-right-container">
        <PointsBalance points={points} maxPoints={maxPoints} />
        <VStack
          spacing={4}
          align="center"
          mt={4}
          width="80%"
          className="pointsBar"
        >
          <Box position="relative" width="90%">
            <Slider
              aria-label="points-slider"
              value={points}
              min={0}
              max={maxPoints}
              step={10}
              onChange={handleSliderChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            {[0, 200, 400, 600, 800, 1000].map((value) => (
              <Box
                key={value}
                position="absolute"
                left={`${(value / maxPoints) * 100}%`}
                top="20px"
                transform="translateX(-50%)"
                color="teal.500"
                fontSize="sm"
              >
                {value}
              </Box>
            ))}
            {[200, 400, 600, 800, 1000].map((value) => (
              <Circle
                key={value}
                size="10px"
                bg="teal.500"
                position="absolute"
                left={`${(value / maxPoints) * 100}%`}
                top="50%"
                transform="translate(-50%, -50%)"
              />
            ))}
          </Box>
        </VStack>

        <div className="daily-redemption-options-container">
          <h1 className="rewards-redemption-title">Daily Redemption Options</h1>
          <p className="options-description">
            Earn points by completing any of the actions listed below! Please
            note: certain actions have daily restrictions. You are welcome to
            continue completing these actions, but will only accumulate points
            up to the daily restriction.{" "}
          </p>
          <div className="redemption-options">
            <RedemptionOptions />
          </div>
        </div>

        <div className="rewards-redemption__container">
          <h2 className="rewards-redemption-title2">
            Reward Redemption Options
          </h2>
          <div className="rewards-redemption-cards">
            <RedemptionCardTest deductPoints={deductPoints} />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
            <RedemptionCard />
          </div>
        </div>
      </div>
    </div>
  );
}

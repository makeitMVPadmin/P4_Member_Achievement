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
  VStack,
  Box,
  Circle,
} from "@chakra-ui/react";
import { useState } from "react";
import RewardOptions from "../../components/RewardOptions/RewardOptions";
import RedemptionCardTest2 from "../../components/RedemptionCard/RedemptionCardTest2";
import RedemptionCardTest3 from "../../components/RedemptionCard/RedemptionCardTest3";

export default function RewardsPage({ points, onPointsChange }) {
  const maxPoints = 1000;

  // const handleSliderChange = (value) => {
  //   setPoints(value);
  // };

  const deductPoints = (deduction) => {
    if (points >= deduction)
      onPointsChange((prevPoints) => Math.max(prevPoints - deduction, 0));
  };

  return (
    <div className="rewards_container">
      <div className="resource__navbar-container">
        <NavBar />
      </div>

      <div className="rewards-right-container">
        <div className="rewards-right-top">
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
                sx={{ paddingTop: "11px" }}
              >
                <SliderTrack
                  style={{
                    "--slider-bg": "gray",
                  }}
                  sx={{ paddingBottom: "5px" }}
                >
                  <SliderFilledTrack
                    style={{
                      background: "#ffd22f",
                      "--slider-bg": "gray",
                    }}
                    sx={{ paddingTop: "13px" }}
                  />
                </SliderTrack>
              </Slider>
              {[0, 200, 400, 600, 800, 1000].map((value) => (
                <Box
                  key={value}
                  position="absolute"
                  left={`${(value / maxPoints) * 100}%`}
                  top="20px"
                  transform="translateX(-50%)"
                  color="black"
                  fontSize="sm"
                  fontWeight={700}
                >
                  {value}
                </Box>
              ))}
              {[200, 400, 600, 800, 1000].map((value) => (
                <Circle
                  key={value}
                  size="12px"
                  bg={points >= value ? "#ffd22f" : "gray"}
                  position="absolute"
                  left={`${(value / maxPoints) * 100}%`}
                  top="50%"
                  transform="translate(-50%, -50%)"
                />
              ))}
            </Box>
          </VStack>
        </div>

        <div className="daily-redemption-options-container">
          <div className="redemption-options">
            <RedemptionOptions />
          </div>
        </div>

        <div className="rewards-redemption__container">
          <h2 className="rewards-redemption-title rewards-redemption-title2">
            Claim Now
          </h2>
          <p className="options-description">
            Congratulations on earning points! Here are the rewards you can
            currently claim.{" "}
          </p>
          <div className="rewards-redemption-cards">
            {/* <RedemptionCardTest deductPoints={deductPoints} points={points} />
            <RedemptionCardTest2 deductPoints={deductPoints} points={points} />
            <RedemptionCardTest3 deductPoints={deductPoints} points={points} /> */}
            <RedemptionCard points={points} deductPoints={deductPoints} />
          </div>

          <div className="reward-options__container">
            <div className="reward-options">
              <RewardOptions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

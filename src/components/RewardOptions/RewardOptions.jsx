import "./RewardOptions.scss";
import {
  ChakraProvider,
  Button,
  Box,
  useDisclosure,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import RedemptionCard from "../RedemptionCard/RedemptionCard";
import RewardList from "../RewardList/RewardList";

export default function RewardOptions() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <ChakraProvider>
      <Box textAlign="left" mt={4}>
        <Box className="header-container" onClick={onToggle}>
          <h2 className="rewards-redemption-title">Reward Options</h2>
          <IconButton
            aria-label={isOpen ? "Hide Options" : "Show Options"}
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            backgroundColor={"white"}
          />
        </Box>

        <Collapse in={isOpen}>
          <Box className="reward-options__container2" mt={4}>
            <p className="reward-options__description">
              Keep saving those points! These are the rewards you can work
              towards by earning more points.
            </p>

            <RewardList />

            {/* <RedemptionCard /> */}
          </Box>
        </Collapse>
        {/* )} */}
      </Box>
    </ChakraProvider>
  );
}

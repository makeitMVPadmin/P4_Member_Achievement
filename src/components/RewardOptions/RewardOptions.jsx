import "./RewardOptions.scss";
import upvoteImg from "../../assets/images/upvote.png";
import markAsRead from "../../assets/images/markAsRead.png";
import bookmark from "../../assets/images/bookmark.png";
import commentsIcon from "../../assets/images/comments.png";
import uploadIcon from "../../assets/images/upload-square-svgrepo-com.png";
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

            {/* <div className="reward-options">
              <div className="redemption-options__cards">
                <div className="redemption-options__card">
                  <div className="option-icon">
                    <img
                      className="redemption__img"
                      src={upvoteImg}
                      alt="Like a resource"
                      width="24"
                      height="24"
                    />
                    <span className="item-text">Like a resource</span>
                  </div>
                  <div className="points">
                    +2 points
                    <br />
                    Daily limit: 14 points
                  </div>
                </div>
                <div className="redemption-options-card">
                  <div className="option-icon">
                    <img
                      className="redemption__img"
                      src={markAsRead}
                      alt="Mark a resource as read"
                      width="24"
                      height="24"
                    />
                    <span className="item-text">Mark a resource as read</span>
                  </div>
                  <div className="points">
                    +10 points
                    <br />
                    No daily limit
                  </div>
                </div>
                <div className="redemption-options-card">
                  <div className="option-icon">
                    <img
                      className="redemption__img redemption__img-bookmark"
                      src={bookmark}
                      alt="Suggest a resource"
                      width="24"
                      height="24"
                    />
                    <span className="item-text">Bookmark a resource</span>
                  </div>
                  <div className="points">
                    +20 points
                    <br />
                    No daily limit
                  </div>
                </div>
                <div className="redemption-options-card">
                  <div className="option-icon">
                    <img
                      className="redemption__img"
                      src={uploadIcon}
                      alt="Submit a resource"
                      width="24"
                      height="24"
                    />
                    <span className="item-text">Submit a resource</span>
                  </div>
                  <div className="points">
                    +2 points
                    <br />
                    Daily limit: 14 points
                  </div>
                </div>
                <div className="redemption-options-card">
                  <div className="option-icon">
                    <img
                      className="redemption__img"
                      src={commentsIcon}
                      alt="Comment on a resource"
                      width="24"
                      height="24"
                    />
                    <span className="item-text">Comment on a resource</span>
                  </div>
                  <div className="points">
                    +10 points
                    <br />
                    No daily limit
                  </div>
                </div>
              </div>
            </div> */}

            <RedemptionCard />
          </Box>
        </Collapse>
        {/* )} */}
      </Box>
    </ChakraProvider>
  );
}

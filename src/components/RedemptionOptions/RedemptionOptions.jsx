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

import "./RedemptionOptions.scss";

export default function RedemptionOptions() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <ChakraProvider>
      <Box textAlign="left" mt={4}>
        <Box className="header-container" onClick={onToggle}>
          <h2 className="rewards-redemption-title">How to Earn Points</h2>
          <IconButton
            aria-label={isOpen ? "Hide Options" : "Show Options"}
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            backgroundColor={"white"}
          />
        </Box>
        {/* {isOpen && ( */}
        <Collapse in={isOpen}>
          <Box className="daily-redemption-options-container2" mt={4}>
            <p className="options-description">
              Earn points by completing any of the actions listed below! Please
              note: certain actions have daily restrictions. You are welcome to
              continue completing these actions, but will only accumulate points
              up to the daily restriction.
            </p>
            <div className="redemption-options">
              <div className="redemption-options-cards">
                <div className="redemption-options-card">
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
            </div>
          </Box>
        </Collapse>
        {/* )} */}
      </Box>
    </ChakraProvider>
  );
}

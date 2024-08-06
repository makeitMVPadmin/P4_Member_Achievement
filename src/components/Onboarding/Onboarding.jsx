import { useState } from "react";
import "./Onboarding.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  Heading,
} from "@chakra-ui/react";
import checkImg from "../../assets/images/check.png";
import documentImg from "../../assets/images/document.png";
import trophyImg from "../../assets/images/trophy.png";
import bookshelfImg from "../../assets/images/bookshelf.png";

export default function Onboarding({ isOpen, onClose }) {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onboardingSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className="onboarding__wrapper">
            <div className="onboarding__right">
              <Text className="onboarding__step">1 of 3</Text>
              <Heading
                as="h3"
                size="lg"
                fontFamily="Corben"
                fontSize="1rem"
                paddingBottom="1rem"
              >
                Community-Curated Resource Library
              </Heading>
              <Text
                fontSize="0.55rem"
                fontFamily="Poppins"
                color="#A9A9A9"
                fontWeight={600}
              >
                Explore educational resources curated and highly-rated by the
                community. Browse, bookmark, and save your favorites. Join the
                community and leave comments!
              </Text>
            </div>
            <img
              className="onboarding__img"
              src={bookshelfImg}
              alt="document file"
            />
          </div>
        );
      case 2:
        return (
          <div className="onboarding__wrapper">
            <div className="onboarding__right">
              <Text className="onboarding__step">2 of 3</Text>
              <Heading
                as="h3"
                size="lg"
                fontFamily="Corben"
                fontSize="1rem"
                paddingBottom="1rem"
              >
                Contribute Valuable Resources
              </Heading>
              <Text
                fontSize="0.55rem"
                fontFamily="Poppins"
                color="#A9A9A9"
                fontWeight={600}
              >
                Contribute to the community by submitting educational resources.
                Help others find high-quality resources, build your reputation,
                and receive feedback on your submissions.
              </Text>
            </div>
            <img
              className="onboarding__img"
              src={documentImg}
              alt="check mark"
            />
          </div>
        );
      case 3:
        return (
          <div className="onboarding__wrapper">
            <div className="onboarding__right">
              <Text className="onboarding__step">3 of 3</Text>
              <Heading
                as="h3"
                size="lg"
                fontFamily="Corben"
                fontSize="1rem"
                paddingBottom="1rem"
              >
                Earn Exclusive Rewards for Your Contributions and Engagement
              </Heading>
              <Text
                fontSize="0.55rem"
                fontFamily="Poppins"
                color="#A9A9A9"
                fontWeight={600}
              >
                Engage with the platform and earn points to unlock higher reward
                tiers, gaining access to valuable perks and exclusive
                opportunities.
              </Text>
            </div>
            <img className="onboarding__img" src={trophyImg} alt="trophy" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        className="onboarding__container"
        sx={{
          border: "1px solid black",
          borderRadius: "0.25rem",
          boxShadow: "4px 4px 0 black",
          width: "40.5rem",
          height: "13rem",
          padding: "1.75rem 0.75rem 0.75rem",
          //   zIndex: 9999,
        }}
      >
        <ModalBody padding="0 0.5rem">
          <Box>{onboardingSteps()}</Box>
        </ModalBody>
        <ModalFooter className="onboarding__footer" padding="0 0.25rem">
          {step > 1 && (
            <Button
              className="onboarding__button"
              onClick={handlePrevious}
              sx={{
                padding: "0.5rem 1rem",
                fontSize: "0.65rem",
                backgroundColor: "#0099ff",
              }}
            >
              Previous
            </Button>
          )}
          <Button
            className="onboarding__button"
            onClick={handleNext}
            sx={{
              padding: "0.5rem 1rem",
              fontSize: "0.65rem",
              backgroundColor: "#0099ff",
            }}
          >
            {step === 3 ? "Get Started" : "Next"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

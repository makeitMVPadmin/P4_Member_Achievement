import SelectTags from "./SelectTags";
import { ChevronDownIcon } from "@chakra-ui/icons";
import UploadFile from "./UploadFile";
import React, { useState, useRef } from "react";
import uploadIcon from "../../assets/icons/upload-folder-svgrepo-com.png";
import "./SubmissionDrawer.scss";
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Box,
  FormLabel,
  Input,
  Select,
  Textarea,
  DrawerFooter,
  FormControl,
  FormErrorMessage,
  // useToast - will use when user tested and upload successful
} from "@chakra-ui/react";
import { color } from "framer-motion";

// import { useForm } from "react-hook-form";

function SubmissionDrawer({ onFormSubmit }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef(null);
  const formRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const tags = selectedOptions.map((option) => option.value);

    const newResource = {
      title: formData.get("title"),
      discipline: formData.get("discipline"),
      type: formData.get("type"),
      level: formData.get("level"),
      duration: formData.get("duration"),
      preview: formData.get("preview"),
      url: formData.get("url"),
      id: Date.now(),
      description: "",
      contributor: "Anonymous",
      tag1: tags[0] || "",
      tag2: tags[1] || "",
      tag3: tags[2] || "",
      tag4: tags[3] || "",
      comments: [],
    };

    // save to local
    const existingResources =
      JSON.parse(localStorage.getItem("resources")) || [];
    existingResources.push(newResource);
    localStorage.setItem("resources", JSON.stringify(existingResources));

    if (onFormSubmit) {
      onFormSubmit(newResource);
    }

    onClose();
  };

  return (
    <>
      {/* Upload Resource Button - pulled from navbar component */}
      <button className="nav__button" onClick={onOpen}>
        <img src={uploadIcon} alt="upload file icon" className="nav__icon" />
        <p className="nav__button-name">Upload Resource</p>
      </button>

      <div>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent
            sx={{
              borderRadius: "30px 0px 0px 30px",
              border: "4px solid black",
            }}
          >
            <DrawerCloseButton
              sx={{ color: "#0099FF", fontSize: "20px", fontWeight: "bolder" }}
            />
            {/* HEADER */}
            <DrawerHeader
              sx={{
                iconColor: "#0099FF",
              }}
            >
              <h1 className="submission__header-title">Submit a Resource </h1>
              <p className="submission__small-text">
                Share your learning resources with the community!
              </p>
              <p className="submission__small-text">
                <span>*</span> Required
              </p>
            </DrawerHeader>

            <DrawerBody className="submission__form-container">
              <form ref={formRef} onSubmit={handleSubmit}>
                <Stack className="submission__form-container">
                  {/* TITLE */}
                  <Box
                    className="submission__form-column"
                  // as="form"
                  // ref={formRef}
                  // onSubmit={handleSubmit}
                  >
                    <FormControl>
                      <FormLabel
                        className="submission__title"
                        fontSize="20px"
                        fontWeight="bold"
                        _after={{ content: '" *"', color: "black" }}
                      >
                        Title
                      </FormLabel>
                      <Input
                        ref={firstField}
                        name="title"
                        id="title"
                        placeholder="Enter a resource title."
                        border="3px solid black"
                        className="submission__inputField"
                        _hover={{}}
                        focusBorderColor="black"
                        fontSize="20px"
                        htmlFor="title"
                      />
                      <FormErrorMessage>
                        Title is required for submission
                      </FormErrorMessage>
                    </FormControl>
                  </Box>

                  {/* DISCIPLINE  */}
                  <Box className="submission__form-column">
                    <FormControl>
                      <FormLabel
                        htmlFor="discipline"
                        className="submission__title"
                        fontSize="20px"
                        fontWeight="bold"
                        _after={{ content: '" *"', color: "black" }}
                      >
                        Discipline
                      </FormLabel>
                      <Select
                        id="discipline"
                        name="discipline"
                        className="submission__inputField"
                        border="3px solid black"
                        _hover={{ }}
                        color="grey"
                        fontFamily="Poppins"
                        fontWeight="bold"
                        placeholder="Select"
                        fontSize="20px"
                        icon={<ChevronDownIcon />}
                        iconSize="45px"
                        iconColor="#0099FF"
                        focusBorderColor="black"
                      >
                        <option value="Software Engineering">
                          Software Engineering
                        </option>
                        <option value="UX/UI Design">UX/UI Design</option>
                        <option value="Product Management">
                          Product Management
                        </option>
                        <option value="Data Science">Data Science</option>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* TYPE  */}
                  <Box className="submission__form-column">
                    <FormControl>
                      <FormLabel
                        htmlFor="type"
                        className="submission__title"
                        fontSize="20px"
                        fontWeight="bold"
                        _after={{ content: '" *"', color: "black" }}
                      >
                        Type
                      </FormLabel>
                      <Select
                        id="type"
                        name="type"
                        className="submission__inputField"
                        border="3px solid black"
                        _hover={{ }}
                        color="grey"
                        fontFamily="Poppins"
                        fontWeight="bold"
                        placeholder="Select"
                        fontSize="20px"
                        icon={<ChevronDownIcon />}
                        iconSize="45px"
                        iconColor="#0099FF"
                        focusBorderColor="black"
                      >
                        <option value="Article">Article</option>
                        <option value="Blog">Blog</option>
                        <option value="Video">Video</option>
                        <option value="Course">Course</option>
                        <option value="Quiz">Quiz</option>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* TAGS */}
                  <Box className="submission__form-column">
                    <SelectTags
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                    />
                  </Box>

                  {/* SKILL LEVEL */}
                  <Box className="submission__form-column">
                    <FormControl>
                      <FormLabel
                        htmlFor="owner"
                        className="submission__title"
                        fontSize="20px"
                        fontWeight="bold"
                        _after={{ content: '" *"', color: "black" }}
                      >
                        Skill Level
                      </FormLabel>
                      <Select
                        fontFamily="Poppins"
                        fontWeight="bold"
                        id="level"
                        htmlFor="level"
                        name="level"
                        iconColor="#0099FF"
                        className="submission__inputField"
                        border="3px solid black"
                        _hover={{}}
                        placeholder="Select"
                        fontSize="20px"
                        color="grey"
                        icon={<ChevronDownIcon />}
                        iconSize="45px"
                        focusBorderColor="black"
                      >
                        <option value="Beginner Level">Beginner</option>
                        <option value="Advanced Level">Advanced</option>
                        <option value="Intermeidate Level">Intermediate</option>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* ESTIMATED DURATION */}
                  <Box className="submission__form-column">
                    <FormControl>
                      <FormLabel
                        htmlFor="owner"
                        className="submission__title"
                        fontSize="20px"
                        fontWeight="bold"
                        _after={{ content: '" *"', color: "black" }}
                      >
                        Estimated Duration
                      </FormLabel>
                      <Select
                        id="duration"
                        name="duration"
                        className="submission__inputField"
                        border="3px solid black"
                        placeholder="Select"
                        fontSize="20px"
                        _hover={{ }}
                        color="grey"
                        iconColor="#0099FF"
                        focusBorderColor="black"
                        fontFamily="Poppins"
                        fontWeight="bold"
                        icon={<ChevronDownIcon />}
                        iconSize="45px"
                      >
                        <option value="3 min">3 min</option>
                        <option value="5 min">5 min</option>
                        <option value="7 min">7 min</option>
                        <option value="10 min">10 min</option>
                        <option value="20 min">20 min</option>
                        <option value="30 min">30 min</option>
                        <option value="40 min">40 min</option>
                        <option value="50 min">50 min</option>
                        <option value="60 min">60 min</option>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* DESCRIPTION */}
                  <Box className="submission__form-column">
                    <FormControl>
                      <FormLabel
                        htmlFor="preview"
                        id="preview"
                        name="preview"
                        className="submission__title"
                        fontSize="20px"
                        fontWeight="bold"
                        _after={{ content: '" *"', color: "black" }}
                      >
                        Description
                      </FormLabel>
                      <Textarea
                        id="preview"
                        name="preview"
                        placeholder="The clearer and shorter the better."
                        className="submission__inputField"
                        border="3px solid black"
                        _hover={{ }}
                        focusBorderColor="black"
                        fontSize="20px"
                        height="200px"
                      />
                    </FormControl>
                  </Box>

                  {/* URL  */}
                  <Box className="submission__form-column">
                    <FormControl>
                      <FormLabel
                        htmlFor="url"
                        className="submission__title"
                        fontSize="20px"
                        fontWeight="bold"
                        _after={{ content: '" *"', color: "black" }}
                      >
                        Url
                      </FormLabel>
                      <Input
                        type="url"
                        id="url"
                        name="url"
                        fontSize="20px"
                        placeholder="Enter the resource URL"
                        className="submission__inputField"
                        border="3px solid black"
                        _hover={{ }}
                        focusBorderColor="black"
                      />
                    </FormControl>
                  </Box>

                  <div className="submission__OR">
                    <p className="submission__upload">OR</p>
                  </div>

                  {/* UPLOAD FILE  */}
                  <Box className="submission__form-column">
                    <UploadFile />
                  </Box>
                </Stack>
              </form>
            </DrawerBody>

            <DrawerFooter>
              <Button
                mr={3}
                bg="white"
                fontSize="18px"
                fontFamily="Poppins"
                padding="6px"
                fontWeight="bold"
                marginTop="20px"
                boxShadow="1px 1px 0px black"
                border="3px solid black"
                color="black"
                _hover={{ bg: "gray.600" }}
                onClick={onClose}
                className="submission__form-button"
              >
                Cancel
              </Button>
              <Button
                bg="#0099FF"
                fontSize="18px"
                fontWeight="bold"
                fontFamily="Poppins"
                padding="6px"
                marginTop="20px"
                boxShadow="1px 1px 0px black"
                border="3px solid black"
                color="black"
                _hover={{ bg: "gray.600" }}
                className="
            submission_form-button"
                type="submit"
                onClick={(event) => handleSubmit(event)}
              >
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default SubmissionDrawer;

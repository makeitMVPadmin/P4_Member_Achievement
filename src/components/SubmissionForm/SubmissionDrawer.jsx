import SelectTags from "./SelectTags";
import { CommentModal } from "../CommentModal/CommentModal.jsx";
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
  Text,
  Textarea,
  DrawerFooter,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { storage, database } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";

export default function SubmissionDrawer({ onFormSubmit, currentUser }) {
  console.log(currentUser)
  const MAX_WORD_COUNT = 50;
  // const [text, setText] = useState('');
  const selectTagsRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();
  const [file, setFile] = useState(null);
  const fileUrl = watch("url");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  function handleSetSelectedOptions(options) {
    setSelectedOptions(options);
  }

  const onSubmit = async (data) => {
    try {
      console.log("Form data before processing:", data);

      if (file) {
        const fileRef = ref(storage, `resourceUploads/${file.name}`);
        await uploadBytes(fileRef, file);
        data.url = await getDownloadURL(fileRef);
      }

      if (!file && !data.url) {
        throw new Error("Upload a file or provide a URL");
      }

      const selectedTags = selectedOptions.map((option) => option.value);

      const newResource = {
        name: currentUser
          ? `${currentUser.firstName} ${currentUser.lastName.charAt(0)}.`
          : "Anonymous",
        userID: currentUser,
        title: data.title,
        discipline: data.discipline,
        type: data.type,
        level: data.level,
        estDuration: data.estDuration,
        description: data.description || "",
        url: data.url,
        tag1: selectedTags[0] || "",
        tag2: selectedTags[1] || "",
        tag3: selectedTags[2] || "",
        tag4: selectedTags[3] || "",
        comments: [],
        commentsCount: 0,
        likedByUser: [],
        downvotedByUsers: [],
        firstName: currentUser ? currentUser.firstName : "",
        lastName: currentUser ? currentUser.lastName : "",
      };

      const docRef = await addDoc(
        collection(database, "Resources"),
        newResource
      );
      onFormSubmit({ id: docRef.id, ...newResource });

      console.log("Form submitted successfully:", newResource);

      // Clear the form and close the drawer
      reset();
      setFile(null);
      onClose();
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCancel = () => {
    reset(); // Reset the form fields
    setFile(null);
    onClose();
  };

  const countWords = (str) => {
    if (typeof str !== 'string') {
      return 0;
    }
    const trimmedStr = str.trim();
    return trimmedStr.length === 0 ? 0 : trimmedStr.split(/\s+/).length;
    // return str.trim().split(/\s+/).length === 0 ? 0 : str.trim().split(/\s+/).length;
  };


  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  //   console.log(inputValue)
  //   setWordCount(countWords(e.target.value))
  // };

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);
  //   setWordCount(countWords(value));
  // };

  const closeModal = () => {
    setShowModal(false);
  };

  const test = countWords(watch("description"));

  console.log("description type", typeof test)
  console.log("the actual description:", test)

  const compareNumbers = () => {
    if (test < MAX_WORD_COUNT) {
      console.log("true")
    }
  }

  compareNumbers();

  return (
    <>
      {/* Upload Resource Button - pulled from navbar component */}
      <button className="nav__button" onClick={onOpen}>
        {/* <img
          src={uploadIcon}
          alt="upload file icon"
          className="nav__icon nav__icon-upload"
        /> */}
        <p className="nav__button-name">Upload Resource</p>
      </button>

      <div>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={handleCancel}
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
            <DrawerHeader>
              <h1 className="submission__header-title">Submit a Resource</h1>
              <p className="submission__small-text">
                Share your learning resources with the community!
              </p>
              <p className="submission__small-text">
                <span>*</span> Required
              </p>
            </DrawerHeader>

            <DrawerBody className="submission__form-container">
              <Stack className="submission__form-container">
                {/* TITLE */}
                <Box
                  as="form"
                  className="submission__form-column"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <FormControl isInvalid={errors.title}>
                    <FormLabel
                      htmlFor="title"
                      fontSize="20px"
                      fontWeight="bold"
                      _after={{ content: '" *"', color: "black" }}
                    >
                      Title
                    </FormLabel>
                    <Input
                      id="title"
                      placeholder="Enter a resource title."
                      _placeholder={{ color: "grey" }}
                      border="3px solid black"
                      className="submission__inputField"
                      _hover={{}}
                      focusBorderColor="black"
                      fontSize="20px"
                      {...register("title", { required: true })}
                    />
                    <FormErrorMessage>
                      {errors.title && "Title is required for submission"}
                    </FormErrorMessage>
                  </FormControl>

                  {/* DISCIPLINE */}
                  <FormControl isInvalid={errors.discipline}>
                    <FormLabel
                      htmlFor="discipline"
                      fontSize="20px"
                      fontWeight="bold"
                      _after={{ content: '" *"', color: "black" }}
                      marginTop="10px"
                    >
                      Discipline
                    </FormLabel>
                    <Select
                      id="discipline"
                      className="submission__inputField"
                      border="3px solid black"
                      _hover={{}}
                      // color='black'
                      fontFamily="Poppins"
                      fontWeight="bold"
                      placeholder="Select"
                      _placeholder={{ color: "grey" }}
                      fontSize="20px"
                      icon={<ChevronDownIcon />}
                      iconSize="45px"
                      iconColor="#0099FF"
                      focusBorderColor="black"
                      {...register("discipline", { required: true })}
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
                    <FormErrorMessage>
                      {errors.discipline && "Discipline is required"}
                    </FormErrorMessage>
                  </FormControl>

                  {/* TYPE */}
                  <FormControl isInvalid={errors.type}>
                    <FormLabel
                      htmlFor="type"
                      fontSize="20px"
                      fontWeight="bold"
                      _after={{ content: '" *"', color: "black" }}
                      marginTop="10px"
                    >
                      Type
                    </FormLabel>
                    <Select
                      id="type"
                      className="submission__inputField"
                      border="3px solid black"
                      _hover={{}}
                      fontFamily="Poppins"
                      fontWeight="bold"
                      placeholder="Select"
                      fontSize="20px"
                      icon={<ChevronDownIcon />}
                      iconSize="45px"
                      iconColor="#0099FF"
                      focusBorderColor="black"
                      {...register("type", { required: true })}
                    >
                      <option value="Article">Article</option>
                      <option value="Blog">Blog</option>
                      <option value="Video">Video</option>
                      <option value="Course">Course</option>
                      <option value="Quiz">Quiz</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.type && "Type is required"}
                    </FormErrorMessage>
                  </FormControl>

                  {/* SKILL LEVEL */}
                  <FormControl isInvalid={errors.level}>
                    <FormLabel
                      htmlFor="level"
                      fontSize="20px"
                      fontWeight="bold"
                      _after={{ content: '" *"', color: "black" }}
                      marginTop="10px"
                    >
                      Skill Level
                    </FormLabel>
                    <Select
                      id="level"
                      className="submission__inputField"
                      border="3px solid black"
                      _hover={{}}
                      fontFamily="Poppins"
                      fontWeight="bold"
                      color="black"
                      placeholder="Select"
                      fontSize="20px"
                      icon={<ChevronDownIcon />}
                      iconSize="45px"
                      iconColor="#0099FF"
                      focusBorderColor="black"
                      {...register("level", { required: true })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.level && "Skill Level is required"}
                    </FormErrorMessage>
                  </FormControl>

                  {/* ESTIMATED DURATION */}
                  <FormControl isInvalid={errors.estDuration}>
                    <FormLabel
                      htmlFor="estDuration"
                      fontSize="20px"
                      fontWeight="bold"
                      _after={{ content: '" *"', color: "black" }}
                      marginTop="10px"
                    >
                      Estimated Duration
                    </FormLabel>
                    <Select
                      id="estDuration"
                      className="submission__inputField"
                      border="3px solid black"
                      _hover={{}}
                      fontFamily="Poppins"
                      fontWeight="bold"
                      placeholder="Select"
                      _placeholder={{ opacity: 4, color: "gray.500" }}
                      fontSize="20px"
                      icon={<ChevronDownIcon />}
                      iconSize="45px"
                      iconColor="#0099FF"
                      focusBorderColor="black"
                      {...register("estDuration", { required: true })}
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
                    <FormErrorMessage>
                      {errors.estDuration && "Estimated Duration is required"}
                    </FormErrorMessage>
                  </FormControl>

                  {/* TAGS */}
                  <Box className="submission__form-column">
                    <FormControl isInvalid={errors.tags}>
                      <SelectTags
                        id="tags"
                        ref={selectTagsRef}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={handleSetSelectedOptions}

                        {...register("tags",
                          {
                            validate: () => {
                              return selectedOptions.length > 3
                            }
                          })}
                      />
                      <FormErrorMessage>
                        {errors.tags && "Atleast 4 tag is required"}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>

                  {/* DESCRIPTION */}
                  <FormControl isInvalid={errors.description}>
                    <FormLabel
                      htmlFor="description"
                      fontSize="20px"
                      fontWeight="bold"
                      _after={{ content: '" *"', color: "black" }}
                      marginTop="-14px"
                    >
                      Description
                    </FormLabel>
                    <Textarea
                      id="description"
                      placeholder="The clearer and shorter the better."
                      _placeholder={{ color: "grey" }}
                      className="submission__inputField"
                      border="3px solid black"
                      _hover={{}}
                      focusBorderColor="black"
                      fontSize="20px"
                      height="200px"
                      // onChange={handleInputChange}

                      {...register("description", {
                        required: true,
                        validate: (value) => {
                          const wordCount = countWords(value);
                          return wordCount <= MAX_WORD_COUNT || `Text must be ${MAX_WORD_COUNT} words or less`;
                        }
                      })}
                    // onChange={handleInputChange}
                    // value={inputValue} // Bind the Textarea value to inputValue
                    // {...register("description", { 
                    //   required: true,
                    //   validate: (value) => countWords(value) <= MAX_WORD_COUNT // Validate based on the value of the Textarea
                    //  })}
                    />
                    <Text mt={2} color={countWords(watch("description")) > MAX_WORD_COUNT ? 'red.500' : 'black'}>
                      {countWords(watch("description"))} / {MAX_WORD_COUNT} words
                    </Text>
                    <FormErrorMessage>
                      {errors.description && `Text must be ${MAX_WORD_COUNT} words or less`}
                    </FormErrorMessage>
                  </FormControl>

                  {/* URL */}
                  <FormControl isInvalid={errors.url}>
                    <FormLabel
                      htmlFor="url"
                      fontSize="20px"
                      fontWeight="bold"
                      _after={{ content: '" *"', color: "black" }}
                      marginTop="10px"
                    >
                      URL
                    </FormLabel>
                    <Input
                      type="url"
                      id="url"
                      placeholder="Enter the resource URL"
                      _placeholder={{ color: "grey" }}
                      className="submission__inputField"
                      border="3px solid black"
                      _hover={{}}
                      focusBorderColor="black"
                      fontSize="20px"
                      {...register("url", { required: !file })}
                    />
                    <FormErrorMessage>
                      {errors.url && "URL is required if no file is uploaded"}
                    </FormErrorMessage>
                  </FormControl>

                  <div className="submission__OR">
                    <p className="submission__upload">OR</p>
                  </div>

                  {/* UPLOAD FILE */}
                  <UploadFile onFileChange={handleFileChange} />
                </Box>
              </Stack>
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
                onClick={handleCancel}
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
                className="submission_form-button"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="submission__modal">
        {showModal && <CommentModal closeModal={closeModal} />}
      </div>
    </>
  );
}

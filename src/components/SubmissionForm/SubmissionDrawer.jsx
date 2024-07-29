import SelectTags from "./SelectTags";
import { ChevronDownIcon } from '@chakra-ui/icons';
import UploadFile from "./UploadFile";
import React, { useState } from "react"
import uploadIcon from "../../assets/icons/upload-folder-svgrepo-com.png";
import "./SubmissionDrawer.scss"
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
} from "@chakra-ui/react"
import { color } from "framer-motion";
import { collection, doc, setDoc } from "firebase/firestore";

import { useForm } from "react-hook-form";

function SubmissionDrawer() {
  
 

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef()
  

  const { submission, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    onClose();
  };

 const SubmitForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    skillLevel: '',
    tags: '',
    estimatedDuration: '',
    description: '',
    url: '',
  });

  const [formErrors, setFormErrors] = useState({
    title: false,
    type: false,
    skillLevel: false,
    tags: false,
    estimatedDuration: false,
    description: false,
    url: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
    setFormErrors({...formErrors, [name]: false});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    for (const field in formData) {
      if (!formData[field]) {
        errors[field] = true; 
      }
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      console.log('Form submitted!', formData);
    }
  };
 }

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
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent 
        sx={{ 
          borderRadius: "30px 0px 0px 30px",
          border: '4px solid black',
          
        }}>
          <DrawerCloseButton sx={{ color: '#0099FF', fontSize: "20px", fontWeight: 'bolder'  }} />
          {/* HEADER */}
          <DrawerHeader
          sx={{
            iconColor: "#0099FF"
          }}
          >
            <h1 className="submission__header-title">Submit a Resource </h1>
            <p className="submission__small-text">Share your learning resources with the community!</p>
            <p className="submission__small-text"><span>*</span>  Required</p>
          </DrawerHeader>

          <DrawerBody className="submission__form-container">
            <Stack className="submission__form-container">
          {/* TITLE */}
              <Box as="form" className="submission__form-column">
                <FormControl>
                  <FormLabel
                  className="submission__title" 
                  fontSize='20px' 
                  fontWeight='bold'
                  _after={{ content: '" *"', color: 'black'}}>Title
                  
                  </FormLabel>
                    <Input
                    ref={firstField}
                    id='title' 
                    placeholder='Enter a resource title.'
                    border='3px solid black'
                    className='submission__inputField'
                    _hover='none'
                    focusBorderColor="black"
                    fontSize="20px"
      
                    />
                  <FormErrorMessage>Title is required for submission</FormErrorMessage>
                </FormControl>
              </Box>

            {/* DISCIPLINE  */}
              <Box className="submission__form-column" >
                <FormControl>
                <FormLabel htmlFor='discipline'
                className="submission__title"
                fontSize='20px'
                fontWeight='bold'
                _after={{ content: '" *"', color: 'black'}}>Discipline
                </FormLabel>      
                <Select
                id='discipline' 
                className='submission__inputField'
                border='3px solid black' 
                _hover='none'
                color='grey'
                fontFamily="Poppins"
                fontWeight='bold'
                placeholder="Select"
                fontSize='20px'
                icon={<ChevronDownIcon />}
                iconSize="45px"
                iconColor="#0099FF"
                focusBorderColor="black"
                 >
                  <option value='1'>Software Engineering</option>
                  <option value='2'>UX/UI Design</option>
                  <option value='3'>Product Management</option>
                  <option value='4'>Data Science</option>
                </Select>
                </FormControl>
              </Box>

          {/* TYPE  */}
              <Box className="submission__form-column" >
                <FormControl>
                <FormLabel htmlFor='type'
                className="submission__title"
                fontSize='20px'
                fontWeight='bold'
                _after={{ content: '" *"', color: 'black'}}>Type
                </FormLabel>      
                <Select
                id='type' 
                className='submission__inputField'
                border='3px solid black' 
                _hover='none'
                color='grey'
                fontFamily="Poppins"
                fontWeight='bold'
                placeholder="Select"
                fontSize='20px'
                icon={<ChevronDownIcon />}
                iconSize="45px"
                iconColor="#0099FF"
                focusBorderColor="black"
                
                 >
                  <option value='select'>Article</option>
                  <option value='select'>Blog</option>
                  <option value='select'>Video</option>
                  <option value='select'>Course</option>
                  <option value='select'>Quiz</option>
                </Select>
                </FormControl>
              </Box>

            {/* TAGS */}
              <Box className="submission__form-column">
                <SelectTags />
              </Box>

            {/* SKILL LEVEL */}
              <Box className="submission__form-column"> 
                <FormControl>
                <FormLabel htmlFor='owner' 
                className="submission__title" 
                fontSize='20px' 
                fontWeight='bold'
                _after={{ content: '" *"', color: 'black'}}>Skill Level
                </FormLabel>
                <Select
                fontFamily="Poppins"
                fontWeight='bold'
                id='level' 
                iconColor="#0099FF"
                className='submission__inputField' 
                border='3px solid black' 
                _hover='none'
                placeholder="Select"
                fontSize='20px'
                color='grey'
                icon={<ChevronDownIcon />}
                iconSize="45px"
                focusBorderColor="black"
                >
                  <option value='skill'>Beginner</option>
                  <option value='skill'>Advanced</option>
                  <option value='skill'>Intermediate</option>
                </Select>
                </FormControl>
              </Box>

            {/* ESTIMATED DURATION */}
              <Box className="submission__form-column">
                <FormControl>
                  <FormLabel htmlFor='owner'
                  className="submission__title" 
                  fontSize='20px' 
                  fontWeight='bold'
                  _after={{ content: '" *"', color: 'black'}}>Estimated Duration
                  </FormLabel>
                  <Select id='duration' 
                  className='submission__inputField' 
                  border='3px solid black'
                  placeholder="Select"
                  fontSize='20px' 
                  _hover='none'
                  color='grey'
                  iconColor="#0099FF"
                  focusBorderColor="black"
                  fontFamily="Poppins"
                  fontWeight='bold'
                  icon={<ChevronDownIcon />}
                  iconSize="45px"
                  >
                      <option value='a'>3 min</option>
                    <option value='b'>5 min</option>
                    <option value='c'>7 min</option>
                    <option value='d'>10 min</option>
                    <option value='f'>20 min</option>
                    <option value='g'>30 min</option>
                    <option value='h'>40 min</option>
                    <option value='i'>50 min</option>
                    <option value='j'>60 min</option>
                  </Select>
                </FormControl>
              </Box>

            {/* DESCRIPTION */}
              <Box className="submission__form-column" >
                <FormControl>
                  <FormLabel htmlFor='desc'
                  className="submission__title"
                  fontSize='20px' 
                  fontWeight='bold'
                  _after={{ content: '" *"', color: 'black'}}>Description
                  </FormLabel>
                  <Textarea id='desc' 
                  placeholder="The clearer and shorter the better." 
                  className='submission__inputField' 
                  border='3px solid black' 
                  _hover='none'
                  focusBorderColor="black"
                  fontSize="20px"
                  height='200px'/>
                  
                </FormControl>
              </Box>

            {/* URL  */}
              <Box className="submission__form-column">
                <FormControl>
                  <FormLabel htmlFor='url' 
                  className="submission__title" 
                  fontSize='20px' 
                  fontWeight='bold'
                  _after={{ content: '" *"', color: 'black'}}>Url
                  </FormLabel>
                  <Input
                    type='url'
                    id='url'
                    fontSize='20px'
                    placeholder='Enter the resource URL'
                    className='submission__inputField' 
                    border='3px solid black' 
                    _hover='none'
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
          </DrawerBody>

          <DrawerFooter>
            <Button mr={3} bg='white' fontSize='18px' fontFamily="Poppins" padding='6px' fontWeight="bold" marginTop='20px' boxShadow='1px 1px 0px black' border='3px solid black'  color="black" _hover={{ bg: 'gray.600' }} onClick={onClose} 
            className="submission__form-button">
              Cancel
            </Button>
            <Button bg='#0099FF' fontSize='18px' fontWeight="bold" fontFamily="Poppins" padding="6px" marginTop='20px' boxShadow='1px 1px 0px black' border='3px solid black' color="black"  _hover={{ bg: 'gray.600' }} className="
            submission_form-button" type="submit">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </div>
    </>
  )
}

export default SubmissionDrawer;
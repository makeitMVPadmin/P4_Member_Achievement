import SelectTags from "./SelectTags";
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

// import { useForm } from "react-hook-form";

function SubmissionDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef()
  // const { submission, handleSubmit, formState: { errors } } = useForm();

  // const onSubmit = data => {
  //   console.log(data);
  //   onClose();
  // };

//  const SubmitForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     type: '',
//     skillLevel: '',
//     tags: '',
//     estimatedDuration: '',
//     description: '',
//     url: '',
//   });

//   const [formErrors, setFormErrors] = useState({
//     title: false,
//     type: false,
//     skillLevel: false,
//     tags: false,
//     estimatedDuration: false,
//     description: false,
//     url: false,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({...formData, [name]: value });
//     setFormErrors({...formErrors, [name]: false});
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = {};

//     for (const field in formData) {
//       if (!formData[field]) {
//         errors[field] = true; 
//       }
//     }
    
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//     } else {
//       console.log('Form submitted!', formData);
//     }
//   };
//  }

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
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent 
        sx={{ 
          borderRadius: "30px 0px 0px 30px",
          border: '4px solid black'
        }}>
          <DrawerCloseButton />
          {/* HEADER */}
          <DrawerHeader>
            <b className="submission__header-title">Submit a <br />Resource</b>
            <p className="submission__small-text">Share your learning resources with the community!</p>
            <p className="submission__small-text"><span>*</span>  Required</p>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
          {/* TITLE */}
              <Box as="form">
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
                    />
                  <FormErrorMessage>Title is required for submission</FormErrorMessage>
                </FormControl>
              </Box>
          {/* TYPE  */}
              <Box >
                <FormControl>
                <FormLabel htmlFor='type'
                className="submission__title"
                fontSize='20px'
                fontWeight='bold'
                _after={{ content: '" *"', color: 'black'}}>Type
                </FormLabel>
                <Select id='type' 
                defaultValue='select' 
                className='submission__inputField'
                border='3px solid black' 
                _hover='none'
                color='grey'
                iconSize="50px"
                focusBorderColor="black" >
                  <option value='select'>Select</option>
                  <option value='select'>Article</option>
                  <option value='select'>Blog</option>
                  <option value='select'>Video</option>
                  <option value='select'>Course</option>
                  <option value='select'>Quiz</option>
                </Select>
                </FormControl>
              </Box>

            {/* SKILL LEVEL */}
              <Box>
                <FormControl>
                <FormLabel htmlFor='owner' 
                className="submission__title" 
                fontSize='20px' 
                fontWeight='bold'
                _after={{ content: '" *"', color: 'black'}}>Skill Level
                </FormLabel>
                <Select
                id='level' 
                defaultValue='select'
                className='submission__inputField' 
                border='3px solid black' 
                _hover='none'
                color='grey'
                iconSize="50px"
                focusBorderColor="black"
                >
                  <option value='select'>Select</option>
                  <option value='skill'>Beginner</option>
                  <option value='skill'>Advanced</option>
                  <option value='skill'>Intermediate</option>
                </Select>
                </FormControl>
              </Box>

            {/* TAGS */}
              <Box>
                <SelectTags />
              </Box>

            {/* ESTIMATED DURATION */}
              <Box>
                <FormControl>
                  <FormLabel htmlFor='owner'
                  className="submission__title" 
                  fontSize='20px' 
                  fontWeight='bold'
                  _after={{ content: '" *"', color: 'black'}}>Estimated Duration
                  </FormLabel>
                  <Select id='duration' 
                  defaultValue='select' 
                  className='submission__inputField' 
                  border='3px solid black' 
                  _hover='none'
                  color='grey'
                  iconSize="50px"
                  focusBorderColor="black"
                  >
                    <option value='select'>Select</option>
                    <option value='a'>10 min</option>
                    <option value='b'>20 min</option>
                    <option value='c'>30 min</option>
                    <option value='d'>40 min</option>
                    <option value='e'>50 min</option>
                    <option value='f'>60 min</option>
                    <option value='f'>90 min</option>
                  </Select>
                </FormControl>
              </Box>

            {/* DESCRIPTION */}
              <Box  >
                <FormControl>
                  <FormLabel htmlFor='desc'
                  fontSize='20px' 
                  fontWeight='bold'
                  _after={{ content: '" *"', color: 'black'}}>Description
                  </FormLabel>
                  <Textarea id='desc' 
                  placeholder="The clearer and shorter the better." 
                  className='submission__inputField' 
                  border='3px solid black' 
                  _hover='none'
                  focusBorderColor="black"/>
                </FormControl>
              </Box>

            {/* URL  */}
              <Box>
                <FormControl>
                <p className="submission__upload">Only one of these fields is required.</p>
                  <FormLabel htmlFor='url' 
                  className="submission__title" 
                  fontSize='20px' 
                  fontWeight='bold'
                  _after={{ content: '" *"', color: 'black'}}>Url
                  </FormLabel>
                  <Input
                    type='url'
                    id='url'
                    placeholder='Paste Url'
                    className='submission__inputField' 
                    border='3px solid black' 
                    _hover='none'
                    focusBorderColor="black"
                  />
                </FormControl>
              </Box>

            {/* UPLOAD FILE  */}
              <Box>
                <UploadFile />
              </Box>

              
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button mr={3} bg='white' fontSize='16px' marginTop='20px' border='4px solid black' fontFamily="Corben" color="black" _hover={{ bg: 'gray.600' }} onClick={onClose} 
            className="submission__form-button">
              Cancel
            </Button>
            <Button bg='white' fontSize='16px' marginTop='20px' border='4px solid black' color="black" fontFamily="Corben" _hover={{ bg: 'gray.600' }} className="
            submission_form-button" type="submit">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </div>
    </>
  )
}

export default SubmissionDrawer;
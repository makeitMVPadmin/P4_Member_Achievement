import SelectTags from "./SelectTags";
import { ChevronDownIcon } from '@chakra-ui/icons';
import UploadFile from "./UploadFile";
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
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

function SubmissionDrawer() {
  

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef()
  
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    skillLevel: '',
    duration: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log(formData)
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
                    name="title"
                    id='title' 
                    placeholder='Enter a resource title.'
                    border='3px solid black'
                    className='submission__inputField'
                    _hover='none'
                    focusBorderColor="black"
                    value={formData.title}
                    onChange={handleChange}
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
                <Select
                id='type' 
                name="type"
                className='submission__inputFieldSelect'
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
                value={formData.type}
                onChange={handleChange}
                 >
                  <option value='Article'>Article</option>
                  <option value='Blog'>Blog</option>
                  <option value='Video'>Video</option>
                  <option value='Course'>Course</option>
                  <option value='Quiz'>Quiz</option>
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
                name="skillLevel"
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
                value={formData.skillLevel}
                onChange={handleChange}
                >
                  <option value='Beginner'>Beginner</option>
                  <option value='Advanced'>Advanced</option>
                  <option value='Intermediate'>Intermediate</option>
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
                  <Select 
                  name="duration"
                  id='duration' 
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
                  value={formData.duration}
                  onChange={handleChange}
                  >
                    <option value='10 min'>10 min</option>
                    <option value='20 min'>20 min</option>
                    <option value='30 min'>30 min</option>
                    <option value='40 min'>40 min</option>
                    <option value='50 min'>50 min</option>
                    <option value='60 min'>60 min</option>
                    <option value='90 min'>90 min</option>
                  </Select>
                </FormControl>
              </Box>

            {/* DESCRIPTION */}
              <Box  >
                <FormControl>
                  <FormLabel htmlFor='desc'
                  className="submission__title"
                  fontSize='20px' 
                  fontWeight='bold'
                  _after={{ content: '" *"', color: 'black'}}>Description
                  </FormLabel>
                  <Textarea id='description'
                  name="description" 
                  placeholder="The clearer and shorter the better." 
                  className='submission__inputField' 
                  border='3px solid black' 
                  _hover='none'
                  focusBorderColor="black"
                  value={formData.description}
                  onChange={handleChange}/>
                </FormControl>
              </Box>
            {/* URL  */}
              <Box>
                <FormControl>
                  <FormLabel htmlFor='url' 
                  className="submission__title" 
                  fontSize='20px' 
                  fontWeight='bold'
                  _after={{ content: '" *"', color: 'black'}}>Url
                  </FormLabel>
                  <Input
                    name="url"
                    type='url'
                    id='url'
                    placeholder='Enter the resource URL'
                    className='submission__inputField' 
                    border='3px solid black' 
                    _hover='none'
                    focusBorderColor="black"
                  />
                </FormControl>
              </Box>

              <div>
              <p className="submission__upload">OR</p>
              </div>
              
            {/* UPLOAD FILE  */}
              <Box>
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
            submission_form-button" type="submit" onClick={handleSubmit}>Submit</Button>
          </DrawerFooter>
      
        </DrawerContent>
      </Drawer>
      </div>
    </>
  )
}

export default SubmissionDrawer;
import SelectTags from "./SelectTags";
import UploadFile from "./UploadFile";
import React from "react"
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
  FormHelperText,
  FormErrorMessage,
  useToast} from "@chakra-ui/react"
import uploadIcon from "../../assets/icons/upload-folder-svgrepo-com.png";
import "./SubmissionDrawer.css"
import { useForm } from "react-hook-form";

function SubmissionDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef()
  const { submission, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    onClose();
  };

  return (
    <>
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
        size="lg"  
      >
        <DrawerOverlay />
        <DrawerContent 
        sx={{ 
          borderRadius: "30px 0px 0px 30px"
           }}>
          <DrawerCloseButton />
          <DrawerHeader>
            <b>Suggest a Resource</b>
            <p className="small-text">Share your learning resources with the community!</p>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
            
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                ref={firstField}
                id='title' 
                placeholder='Enter a resource title.' />
              </FormControl>
                
              </Box>

              <Box>
                <FormControl isRequired>
                <FormLabel htmlFor='type'>Type</FormLabel>
                <Select id='type' defaultValue='select'>
                  <option value='select'>Select</option>
                  <option value='select'>Article</option>
                  <option value='select'>Blog</option>
                  <option value='select'>Video</option>
                  <option value='select'>Course</option>
                  <option value='select'>Quiz</option>
                </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                <FormLabel htmlFor='owner'>Skill Level</FormLabel>
                <Select id='owner' defaultValue='select'>
                  <option value='select'>Select</option>
                  <option value='skill'>Beginner</option>
                  <option value='skill'>Advanced</option>
                  <option value='skill'>Intermediate</option>
                </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor='owner'>Tags</FormLabel>
                    <SelectTags />
                  <FormHelperText>Select up to 4 tags.</FormHelperText>
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor='owner'>Estimated Duration</FormLabel>
                  <Select id='owner' defaultValue='c'>
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

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor='desc'>Description</FormLabel>
                  <Textarea id='desc' />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                <p className="submission__upload">Only one of these fields is required.</p>
                  <FormLabel htmlFor='url'>Url</FormLabel>
                  <Input
                    type='url'
                    id='url'
                    placeholder='Paste Url'
                  />
                </FormControl>
              </Box>

              <Box>
                <UploadFile />
              </Box>

              
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bg='black' color="white" _hover={{ bg: 'gray.500' }} className="
            submit-button">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </div>
    </>
  )
}

export default SubmissionDrawer;
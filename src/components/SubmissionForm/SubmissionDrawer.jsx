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
  // FormHelperText,
  // FormErrorMessage,
  // useToast
} from "@chakra-ui/react"
import uploadIcon from "../../assets/icons/upload-folder-svgrepo-com.png";
import "./SubmissionDrawer.scss"
// import { useForm } from "react-hook-form";

function SubmissionDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef()
  // const { submission, handleSubmit, formState: { errors } } = useForm();

  // const onSubmit = data => {
  //   console.log(data);
  //   onClose();
  // };

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
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent 
        sx={{ 
          borderRadius: "30px 0px 0px 30px",
          border: '4px solid black'
           }}>
          <DrawerCloseButton />
          <DrawerHeader>
            <b className="submission__header-title">Submit a <br />Resource</b>
            <p className="submission__small-text">Share your learning resources with the community!</p>
            <p className="submission__small-text"><span>*</span>  Required</p>

          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
              <FormControl isRequired>
                <FormLabel className="submission__title" fontSize='20px' fontWeight='bold' >Title</FormLabel>
                <Input
                ref={firstField}
                id='title' 
                placeholder='Enter a resource title.'
                border='4px solid black'
                />
              </FormControl>
              </Box>

              <Box >
                <FormControl isRequired>
                <FormLabel htmlFor='type' className="submission__title" fontSize='20px' fontWeight='bold' >Type</FormLabel>
                <Select id='type' defaultValue='select' className="submission__form-border" color='grey'>
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
                <FormLabel htmlFor='owner' className="submission__title" fontSize='20px' fontWeight='bold'>Skill Level</FormLabel>
                <Select id='level' defaultValue='select' color='grey'>
                  <option value='select'>Select</option>
                  <option value='skill'>Beginner</option>
                  <option value='skill'>Advanced</option>
                  <option value='skill'>Intermediate</option>
                </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor='owner' className="submission__title" fontSize='20px' fontWeight='bold'>Tags</FormLabel>
                    <SelectTags />
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor='owner' className="submission__title" fontSize='20px' fontWeight='bold'>Estimated Duration</FormLabel>
                  <Select id='duration' defaultValue='select' color='grey'>
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

              <Box  >
                <FormControl isRequired>
                  <FormLabel htmlFor='desc'fontSize='20px' fontWeight='bold' >Description</FormLabel>
                  <Textarea id='desc' placeholder="The clearer and shorter the better." />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                <p className="submission__upload">Only one of these fields is required.</p>
                  <FormLabel htmlFor='url' className="submission__title" fontSize='20px' fontWeight='bold'>Url</FormLabel>
                  <Input
                    type='url'
                    id='url'
                    placeholder='Paste Url'
                    color='grey'
                  />
                </FormControl>
              </Box>

              <Box>
                <UploadFile />
              </Box>

              
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button mr={3} bg='white' fontSize='24px' marginTop='20px' border='4px solid black' color="black" _hover={{ bg: 'gray.600' }} onClick={onClose} className="
            submit-button">
              Cancel
            </Button>
            <Button bg='white' fontSize='24px' marginTop='20px' border='4px solid black' color="black" _hover={{ bg: 'gray.600' }} className="
            submit-button">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </div>
    </>
  )
}

export default SubmissionDrawer;
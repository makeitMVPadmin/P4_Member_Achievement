import React from "react"
import { Button,useDisclosure,Drawer,DrawerOverlay,DrawerContent,DrawerCloseButton,DrawerHeader,DrawerBody,Stack,Box,FormLabel,Input,InputGroup,InputLeftAddon,InputRightAddon,Select,Textarea,DrawerFooter} from "@chakra-ui/react"
import uploadIcon from "../../assets/icons/upload-folder-svgrepo-com.png";
import "./SubmissionDrawer.css"

function SubmissionDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()

  return (
    <>
      {/* <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen}>
        Create user
      </Button> */}
      <button className="nav__button" colorScheme='teal' onClick={onOpen}>
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
                <FormLabel htmlFor='username'>Title</FormLabel>
                <Input
                  ref={firstField}
                  id='title'
                  placeholder='Enter resource tile'
                />
              </Box>

              <Box>
                <FormLabel htmlFor='type'>Type</FormLabel>
                <Select id='type' defaultValue='select'>
                  <option value='select'>Select</option>
                  <option value='select'>Article</option>
                  <option value='select'>Blog</option>
                  <option value='select'>Video</option>
                  <option value='select'>Course</option>
                  <option value='select'>Quiz</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='owner'>Skill Level</FormLabel>
                <Select id='owner' defaultValue='skill'>
                  <option value='skill'>Beginner</option>
                  <option value='skill'>Advanced</option>
                  <option value='skill'>Intermediate</option>

                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='owner'>Tags</FormLabel>
                <Select id='owner' defaultValue='1'>
                  <option value='1'>Select Tags</option>
                  <option value='2'>UX/UI</option>
                  <option value='3'>Software Engineering</option>
                  <option value='4'>Bootcamp Grad</option>
                  <option value='5'>Project Management</option>
                  <option value='6'>Product Manager</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='owner'>Estimated Duration</FormLabel>
                <Select id='owner' defaultValue='c'>
                  <option value='a'>10 min</option>
                  <option value='b'>20 min</option>
                  <option value='c'>30 min</option>
                  <option value='d'>40 min</option>
                  <option value='e'>50 min</option>
                  <option value='f'>60 min</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='desc'>Description</FormLabel>
                <Textarea id='desc' />
              </Box>

              <Box>
                <FormLabel htmlFor='url'>Url</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    type='url'
                    id='url'
                    placeholder='Please enter domain'
                  />
                  <InputRightAddon>.com</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor='username'>File</FormLabel>
                <Input
                  ref={firstField}
                  id='title'
                  placeholder='Choose File'
                />
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
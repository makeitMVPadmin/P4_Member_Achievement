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
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
        
      >
        <DrawerOverlay className="drawer" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Suggest a Resource
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
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='owner'>Skill Level</FormLabel>
                <Select id='owner' defaultValue='skill'>
                  <option value='skill'>Easy</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='owner'>Tags</FormLabel>
                <Select id='owner' defaultValue='1'>
                  <option value='1'>Enter Tags</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='owner'>Estimated Duration</FormLabel>
                <Select id='owner' defaultValue='a'>
                  <option value='a'>30 min</option>
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

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' className="
            submit-button">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SubmissionDrawer;
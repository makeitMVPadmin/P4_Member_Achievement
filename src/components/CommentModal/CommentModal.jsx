import React from "react";
import modalClose from "../../assets/icons/modalClose.svg";
import './CommentModal.scss'
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import checkImg from "../../assets/images/check.png";




export const CommentModal = ({closeModal}) => {



    return(
        <Box
        position="fixed"
        bottom="20px"
        right="20px"
        width="500px"
        zIndex={9999}
        >
        <Flex align="center" className="modal" 
         >
            <img className="modalX" src={modalClose} alt="closeModal" onClick={closeModal} aria-label="close modal"/>   
            <Image src={checkImg} alt="success Icon"boxSize="80px" mr={4} />
            <Box>
          <Text mb={2} fontWeight="bold" fontFamily="Corben" fontSize="25px" paddingTop="10px">Success!</Text>
          <Text mb={2} fontWeight="bold" marginTop="-5px">Thank you for contributing to the Community Resource Library.</Text>
        </Box>
        </Flex>
        {/* <div className="modal">
            <img className="modalX" src={modalClose} alt="closeModal" onClick={closeModal} aria-label="close modal"/>
            <h2 className="modalHeader">Success!</h2>
            <p className="modalText">Thank you for contributing to the Community Resource Library.</p>
        </div> */}
        </Box>
    )
}
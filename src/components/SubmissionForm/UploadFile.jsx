import React, { useState } from "react";
import { FormLabel, FormControl, Box } from "@chakra-ui/react";
import "../SubmissionForm/SubmissionDrawer.scss"

const UploadFile = ({ onFileChange }) => {
 
  return (
    <Box>
      <FormControl>
        <FormLabel
          className="submission__title"
          fontSize="20px"
          fontWeight="bold"
          marginTop="-10px"
          fontFamily="Poppins"
          _after={{ content: '" *"', color: "black" }}
        >
          File Upload
        </FormLabel>
        <input
          className="submission__file-button"
          type="file"
          onChange={onFileChange}
        />
      </FormControl>
    </Box>
  );
}

export default UploadFile;
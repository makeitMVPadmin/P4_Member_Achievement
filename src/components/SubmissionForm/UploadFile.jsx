import React from "react";
import { FormLabel, FormControl, Box } from "@chakra-ui/react";

const UploadFile = ({ onFileChange }) => {
  return (
    <Box>
      <FormControl>
        <FormLabel
          className="submission__title"
          fontSize="20px"
          fontWeight="bold"
          marginTop="-10px"
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

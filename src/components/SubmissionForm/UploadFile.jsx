import React, { useState } from "react";
import axios from "axios";
import "./SubmissionDrawer.scss";
import { FormLabel, FormControl, Box, Button } from "@chakra-ui/react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

function UploadFile() {
  const [fileUpload, setFileUpload] = useState(null);

  function handleChange(event) {
    setFileUpload(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `resourceUploads/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  // function handleSubmit(event) {
  //   event.preventDefault()
  //   const url = 'http://localhost:3000/uploadFile';
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('fileName', file.name);
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   };
  //   axios.post(url, formData, config).then((response) => {
  //     console.log(response.data);
  //   });

  // }

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
          onChange={handleChange}
        />
        <Button
          className="submission__title"
          fontSize="20px"
          fontWeight="bold"
          marginTop="20px"
          _after={{ content: '" *"', color: "black" }}
          onClick={handleSubmit}
        >This button works for uploading</Button>
      </FormControl>
    </Box>
  );
}

export default UploadFile;

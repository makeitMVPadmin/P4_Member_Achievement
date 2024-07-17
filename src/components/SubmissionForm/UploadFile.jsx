
import React, {useState} from 'react';
import axios from 'axios';
import "./SubmissionDrawer.scss"
import { FormLabel, FormControl } from '@chakra-ui/react';

function UploadFile() {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

  }

  return (
      <FormControl isRequired>
        <FormLabel onSubmit={handleSubmit} className="submission__title">
          File Upload
        </FormLabel>
        <input className='submission__file-button' type="file" onChange={handleChange}/>
        </FormControl>
  );
}

export default UploadFile;

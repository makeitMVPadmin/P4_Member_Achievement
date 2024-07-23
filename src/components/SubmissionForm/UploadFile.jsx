
import React, {useState} from 'react';
import axios from 'axios';
import "./SubmissionDrawer.scss"
import { FormLabel, FormControl, Box } from '@chakra-ui/react';

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
    <Box>
      <FormControl>
        <FormLabel onSubmit={handleSubmit} 
        className="submission__title" 
        fontSize='20px' 
        fontWeight='bold'
        _after={{ content: '" *"', color: 'black'}}>File Upload
        </FormLabel>
        <input className='submission__file-button' type="file" onChange={handleChange}/>
        </FormControl>
        </Box>
  );
}

export default UploadFile;

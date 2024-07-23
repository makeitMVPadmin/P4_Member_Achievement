import { Box,FormControl,FormLabel } from "@chakra-ui/react";
import "./SubmissionDrawer.scss"
import React, {useState} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const options = [
  { value: 'ai', label: 'AI' },
  { value: 'angular', label: 'Angular' },
  { value: 'api', label: 'API' },
  { value: 'data-driven design', label: 'Data-Driven Design' },
  { value: 'flexbox/grid', label: 'Flexbox/Grid' },
  { value: 'product management', label: 'Product Management' },
  { value: 'quality control', label: 'Quality Assistance' },
  { value: 'react', label: 'React' },
  { value: 'software engineering', label: 'Software Engineer' },
  { value: 'sprint planning', label: 'Sprint Planning' },
  { value: 'testing', label: 'Testing' },
  { value: 'usibility', label: 'Usibility' },
  { value: 'ux/ui design', label: 'UX/UI Design' },
  { value: 'vite', label: 'Vite' },
  { value: 'wireframes', label: 'Wireframes' },
]



export default function SelectTags() {

  const [selectedOptions, setSelectedOptions] = useState([]);

  return (

    <Box>
      <FormControl>
        <FormLabel htmlFor='owner' className="submission__title" fontSize='20px' fontWeight='bold'
        _after={{ content: '" *"', color: 'black'}}>Tags</FormLabel>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={selectedOptions}
            options={options}
            onChange={(o) => setSelectedOptions(o)}
            isOptionDisabled={() => selectedOptions.length >= 4}
            placeholder="Select up to 4 tags"
            id='tags'
            styles={{
              control: (base, state) => ({
                ...base,
                border: '3px solid black',
                // borderRadius: '10px',
                boxShadow: '1px 1px 0 black',
                '&:hover': { borderColor: 'black'},
                '&:focus': { outline: 'none' },
              }),
              valueContainer: (base) => ({
                ...base,
                fontSize:'20px',
                color: 'grey',
                fontWeight: 'bold',
                fontFamily: "Poppins",
                
              }),
              indicatorSeparator: (base) => ({
                ...base,
                display: 'none'
              }),
              menu: (base) => ({
                ...base,
                backgroundColor:'#FFFFFF',
                borderRadius: '10px',
                border: '4px solid black',
                // fontFamily: 'Corben',
                fontWeight: 'bold',
                
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#0099FF",
                '& svg': {
                  width: '30px',
                  height: '30px',
                },
              }),
            }}
            // className='submission__inputField' 
        />
    </FormControl>
    </Box>
  );
}
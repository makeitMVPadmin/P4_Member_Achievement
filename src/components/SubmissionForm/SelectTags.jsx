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
                boxShadow: '4px 4px 0px black',
                '&:hover': { borderColor: 'black'},
                '&:focus': { outline: 'none' },
              }),
              valueContainer: (base) => ({
                ...base,
                fontSize:'16px',
                color: 'grey',
                fontWeight: 'bolder'
              }),
              indicatorSeparator: (base) => ({
                ...base,
                display: 'none'
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: 'grey',
                '& svg': {
                  width: '20px',
                  height: '20px',
                },
              }),
            }}
            // className='submission__inputField' 
        />
    </FormControl>
    </Box>
  );
}
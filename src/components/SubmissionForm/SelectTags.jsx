import { Box,FormControl,FormLabel,Icon, position } from "@chakra-ui/react";
import "./SubmissionDrawer.scss"
import { ChevronDownIcon } from '@chakra-ui/icons';
import React, {useState} from 'react';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import { color, wrap } from "framer-motion";
import { hover } from "@testing-library/user-event/dist/hover";

// const animatedComponents = makeAnimated();
const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon as={ChevronDownIcon} boxSize={5} />
    </components.DropdownIndicator>
  );
};

const customComponents = {
  DropdownIndicator: CustomDropdownIndicator,
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    // this changes width of entire container
    // maxWidth:"450px",
    border: '3px solid black',
    borderRadius: '0.25rem',
    boxShadow: '1px 1px 0 black',
    borderRadius: '6px',
    // height: '43px',
    '&:hover': { borderColor: 'black' },
    '&:focus': { outline: 'none' },
    
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    // this changes the width of inner container 
    // maxWidth: '500px',
    padding: '0px',
    fontSize:'20px',
    color: 'grey',
    fontWeight: 'bold',
    fontFamily: "Poppins",
    marginLeft: "14px",   
  }),
  multiValue: (provided) => ({
    ...provided,
    flex: '0 0 auto',
    maxWidth:"400px"
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    maxWidth:"500px"
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    
    color: '#0099FF',
    padding: 0,
    '& svg': {
      position: 'relative',
      right: '-5px',  
      width: '45px',
      height: '45px',
      hover: 'none',
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor:'#FFFFFF',
    borderRadius: '10px',
    border: '4px solid black',
    // fontFamily: 'Corben',
    fontWeight: 'bold',
    
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'grey',
    fontWeight: 'bold',
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    maxWidth:"50px"
  }),
};


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
            components={customComponents}
            isMulti
            value={selectedOptions}
            options={options}
            onChange={(o) => setSelectedOptions(o)}
            isOptionDisabled={() => selectedOptions.length >= 4}
            placeholder="Select up to 4 tags"
            id='tags'
            styles={customStyles}
            // className='submission__inputField' 
        />
    </FormControl>
    </Box>
  );
}


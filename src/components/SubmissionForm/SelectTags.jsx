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
    <Select
      color='grey'
      fontSize='18px'
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      value={selectedOptions}
      options={options}
      defaultValue='select'
      onChange={(o) => setSelectedOptions(o)}
      id='tags'
      isOptionDisabled={() => selectedOptions.length >= 4}
      placeholder="Select up to 4 tags"
    />
  );
}
import "./SubmissionDrawer.css"
import React from 'react';
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
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      defaultValue='select'
      className='submission__tags'
    />
  );
}
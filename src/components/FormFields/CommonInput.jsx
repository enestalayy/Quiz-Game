import React from 'react';
import SelectInput from './SelectInput';

function CommonInput(props) {
  const { id, type, name, className, checked, value, onChange, options, onClick } = props;

  const inputClasses = [
    className,
    type === 'radio' && 'radioInput',
    type === 'checkbox' && 'checkboxInput',
    type === 'select' && 'selectInput',
  ].filter(Boolean).join(' ');

  return (

        
        <input
        id={id}
        type={type}
        name={name}
        className={inputClasses}
        checked={checked}
        value={value}
        onChange={onChange}
        onClick={onClick}
        />
        

  );
}

export default CommonInput;

import React from 'react';

function CommonInput(props) {
  const { id, type, name, className, checked, value, onChange, onClick, onFocus, onBlur } = props;

  // const inputClasses = [
  //   className,
  //   type === 'radio' && 'radioInput',
  //   type === 'checkbox' && 'checkboxInput',
  //   type === 'select' && 'selectInput',
  // ].filter(Boolean).join(' ');

  return (

        
        <input
        id={id}
        type={type}
        name={name}
        className={className}
        checked={checked}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        />
        

  );
}

export default CommonInput;

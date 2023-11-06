import React from 'react'

function RadioInput(props) {
    const { id, type, name, className, checked, onChange } = props;

  return (
    <input
        id= {id}
        type= "radio"
        name= {name}
        className= {className}
        checked= {checked}
        onChange={onChange}
        // style={{ visibility: "hidden" }}
    />
  )
}

export default RadioInput
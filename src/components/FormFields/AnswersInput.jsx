import React from 'react'

function RadioInput(props) {
    const { id, type, name, className, checked, onChange } = props;

  return (
    <input
        id= {id}
        type= {type}
        name= {name}
        className= {className}
        checked= {checked}
        onChange={onChange}
        // style={{ visibility: "hidden" }}
    />
  )
}

export default RadioInput
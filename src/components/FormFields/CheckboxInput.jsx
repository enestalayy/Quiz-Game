import React from 'react'

function CheckboxInput(props) {
    const { id, type, name, className, checked, onChange } = props;

    return (
      <input
          id= {id}
          type= "checkbox"
          name= {name}
          className= {className}
          checked= {checked}
          onChange={onChange}
      />
    )
}

export default CheckboxInput
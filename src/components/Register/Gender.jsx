import React from 'react'
import { SelectInput } from '../FormFields'

function Gender({inputChange, gender}) {
  const options = ['Female', 'Male'];
  return (
    <SelectInput
      id="gender"
      name="gender"
      options={options}
      onChange={((e) => inputChange(e.target.value))}
      value={gender}
    />

  )
}

export default Gender
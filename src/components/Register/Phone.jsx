import React from 'react'
import PhoneInput, { formatPhoneNumber } from 'react-phone-number-input'

function Phone({ phoneNumber, inputChange }) {
    
  return (
    <PhoneInput
    initialValueFormat="national"
    placeholder="Enter phone number"
    value={phoneNumber}
    onChange={((e) => inputChange(e))}
    international
    format={formatPhoneNumber}
    defaultCountry='US'
    id='phoneNumber'
  /> 
  )
}

export default Phone
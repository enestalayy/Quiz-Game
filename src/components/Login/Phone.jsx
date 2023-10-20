import React, { useState } from 'react'
import PhoneInput, { formatPhoneNumber } from 'react-phone-number-input'

function Phone() {
    const [phoneNumber, setPhoneNumber] = useState()
    
  return (
    <PhoneInput
    initialValueFormat="national"
    placeholder="Enter phone number"
    value={phoneNumber}
    onChange={setPhoneNumber}
    international
    format={formatPhoneNumber}
    defaultCountry='US'
    id='phoneNumber'
  /> 
  )
}

export default Phone
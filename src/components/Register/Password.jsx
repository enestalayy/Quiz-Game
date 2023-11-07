import React from 'react'

function Password({password, inputChange, onBlur, onFocus}) {
  return (
    <div>
        <input
        type="password" 
        id="password"
        placeholder="Password*"
        required
        value={password}
        onChange={((e) => inputChange(e.target.value))}
        onBlur={onBlur}
        onFocus={onFocus}
         />
    </div>
  )
}

export default Password
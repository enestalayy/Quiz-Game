import React from 'react'

function Password({password, inputChange}) {
  return (
    <div>
        <input type="password" 
        id="Password"
        placeholder="Password*"
        required
        value={password}
        onChange={((e) => inputChange(e.target.value))} />
    </div>
  )
}

export default Password
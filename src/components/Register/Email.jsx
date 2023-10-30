import React from 'react'

function Email({email, inputChange}) {
  return (
    <div>
        <input
          id='email'
          type="email"
          value={email}
          placeholder='E-mail'
          onChange={((e) => inputChange(e.target.value))}
        />

    </div>
  )
}

export default Email
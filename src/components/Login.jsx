import React from 'react'
import UserName from './Login/UserName'
import Phone from './Login/Phone'

import Email from './Login/Email'
import Gender from './Login/Gender'
function Login() {
  const zort = (() => alert('giriş yapıldı'))
  return (
    <div className='container loginContainer'>
      <form onSubmit={zort}>
        <div className='inputLogin'>
        <label className='labelLogin' htmlFor='username'>Username*</label>
        <UserName />
        </div>
        <div className='inputLogin'>
        <label className='labelLogin'>Phone Number</label>
        <Phone />
        </div>
        <div className='inputLogin'>
        <label className='labelLogin' htmlFor="email">E-mail</label>
        <Email />
        </div>
        <div className='inputLogin'>
        <label className='labelLogin' htmlFor="gender">Gender</label>
        <Gender />
        </div>
        <button>submit</button>
      </form>
    </div>
  )
}

export default Login
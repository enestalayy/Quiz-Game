import React from 'react'
import { logout } from '../Store/authSlice'
import { useNavigate } from 'react-router-dom'
import {BiLogOut} from 'react-icons/bi'
import { useDispatch } from 'react-redux'

function LogoutButton() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <button  className='button' onClick={() => {
        dispatch(logout())
        navigate('/')}
      }
    > <BiLogOut /> Log out
      </button>
  )
}

export default LogoutButton    
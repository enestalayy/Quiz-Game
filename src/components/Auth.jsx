import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { handleAsync } from '../utils/handleAsync'
import { isUserExist, checkPassword } from '../Services/user'
import  {useDispatch} from 'react-redux'
import { login } from '../Store/authSlice'
import Error from './Error'

function Auth() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown, true)
      return () => {
        document.removeEventListener('keydown', handleKeyDown, true);
      };
    }, [])

    const checkUsername = async () => {
        if(username){
          const [response, err] = await handleAsync(isUserExist(username));
        err && console.log(err)
        if(response){
          if (response.status === false) {
          setError(response.message);
        }}}
    };

      const authSubmit = async (e) => {
        e.preventDefault();
          const [response, err] = await handleAsync(checkPassword(username, password))
          err && console.log('password checklenirken bir hata oluştu',err)
          if(response){
            if (response.status === true) {
              dispatch(login({username, password}))
              navigate("/categories")
          } else {
            setError(response.message);
        }}
      }

    
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        document.getElementById('login-button').click()
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const elements = Array.from(document.getElementsByTagName('input'));
        let currentIndex = elements.findIndex((element) => element === document.activeElement);

        if (currentIndex === -1) {
          elements[0].focus();
          currentIndex = 0;
        } else {
          if (e.key === 'ArrowDown') {
            currentIndex = (currentIndex + 1) % elements.length;
          } else if (e.key === 'ArrowUp') {
            currentIndex = (currentIndex - 1 + elements.length) % elements.length;
          }
          elements[currentIndex].focus();
        }
      }
    };

  return (
    <div className='container borderContainer'>
        <form onSubmit={authSubmit}>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="username">
            Username
          </label>
          <input
          className='loginInput'
            type="text"
            placeholder='username*' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setError('')}
            onBlur={checkUsername}
           />
        </div>
        <Error message={error}  />
        <div className="inputLogin">
            <label className="labelLogin" htmlFor="username">
                Password
            </label>
            <input
            className='loginInput'
            type="password"
            placeholder='password*'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError('')}
            />
        </div>
        <div className="footer">
        <button id='login-button' className='button' type='submit'>Log in</button>
        </div>
        </form>
    </div>
  )
}

export default Auth
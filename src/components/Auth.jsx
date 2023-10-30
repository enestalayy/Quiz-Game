import React, {useState} from 'react'
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

    const checkUsername = async () => {
        const [response, err] = await handleAsync(isUserExist(username));
        if (err) {
          setError(err.message);
        } else if (response.status === false) {
          setError(response.message);
        }
    };

    const authSubmit = async (e) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engellemek için
        const response = await handleAsync(checkPassword(username, password))
        console.log(response[0].status)
        if (response[0].status === true) {
            dispatch(login({username, password}))
            navigate("/categories")
          } else {
            setError(response[0].message);
          }

    }
  return (
    <div className='container borderContainer'>
        <form onSubmit={authSubmit}>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            placeholder='username*' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setError('')}
            onBlur={checkUsername}
           />
          {error && <p className="error">{error}</p>}
        </div>
        <Error message={error}  />
        <div className="inputLogin">
            <label className="labelLogin" htmlFor="username">
                Password
            </label>
            <input type="password"
            placeholder='password*'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError('')}
            />
        </div>
        <button>Log in</button>
        </form>
    </div>
  )
}

export default Auth
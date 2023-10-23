import React, {useRef} from 'react'
import { Link} from 'react-router-dom'
import UserName from './Login/UserName'
import Phone from './Login/Phone'
import Email from './Login/Email'
import Gender from './Login/Gender'



function Login() {
  const userNameRef = useRef();

  const zort = (event) => {
    event.preventDefault();
    const username = userNameRef.current.value;
    fetch("http://localhost:3000/scoreboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        point: 0, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className='container loginContainer'>
      <form onSubmit={zort}>
        <div className='inputLogin'>
        <label className='labelLogin' htmlFor='username'>Username*</label>
        <UserName ref={userNameRef} />
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
        <Link to='/categories' >
        <button>Next to categories</button>
        </Link>
      </form>

    </div>
  )
}

export default Login
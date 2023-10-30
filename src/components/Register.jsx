import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  {useDispatch} from 'react-redux'
import { login } from '../Store/authSlice'
import UserName from "./Register/UserName";
import Phone from "./Register/Phone";
import Email from "./Register/Email";
import Gender from "./Register/Gender";
import Password from "./Register/Password";
import { isUserExist, registerUser } from "../Services/user";
import { handleAsync } from "../utils/handleAsync";

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const dispatch = useDispatch()
  const [error, setError] = useState("");


  const registerSubmit = async (e) => {
    e.preventDefault();
    const response = await handleAsync(isUserExist(username))
    if (response[0].status === true) {
      setError(response[0].message);
    } else {
      navigate("/categories")
      await 
      handleAsync(registerUser(username, password, phoneNumber, email, gender))
      dispatch(login({username, password}))
    }
  };

  return (
    <div className="container borderContainer">
      <form onSubmit={registerSubmit}>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="username">
            Username*
          </label>
          <UserName inputChange={(value) => setUsername(value)} />
          {error && <p className="error">{error}</p>}
        </div>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="password">
            Password*
          </label>
          <Password inputChange={(value) => setPassword(value)} />
        </div>
        <div className="inputLogin">
          <label className="labelLogin">Phone Number</label>
          <Phone inputChange={(value) => setPhoneNumber(value)} />
        </div>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="email">
            E-mail
          </label>
          <Email inputChange={(value) => setEmail(value)} />
        </div>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="gender">
            Gender
          </label>
          <Gender inputChange={(value) => setGender(value)} />
        </div>

       <div className="footer">
        <label className="labelLogin" htmlFor="loginbtn" onClick={()=> navigate("/Auth")}>Already have an account?</label>
        
       
       <button type="submit">Sign up</button>
       </div>

      </form>
    </div>
  );
}

export default Register;



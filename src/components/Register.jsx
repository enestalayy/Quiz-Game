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
import {BiErrorAlt} from 'react-icons/bi'
function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const dispatch = useDispatch()
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  
  const usernameExists = async () => {
    const [checkUsername, checkUsernameError] = await handleAsync(isUserExist(username));
    const usernameSpecial = /^[a-zA-Z0-9]+$/;
    const usernameLength = /^.{3,20}$/;
    let errorMessage = '';

    checkUsernameError && console.log(checkUsernameError);

    if (checkUsername.status === true) {
        errorMessage = checkUsername.message;
    }

    if (!usernameSpecial.test(username)) {
        errorMessage += '* No special characters.';
    }

    if (!usernameLength.test(username)) {
        errorMessage += '* Between 3 and 20 characters';
    }

    setUsernameError(errorMessage);
  }
  const checkPassword = () => {
    const digitRegex = /.*\d.*/;
    const specialCharRegex = /.*[@$!%*?&].*/;
    const lengthRegex = /^.{8,}$/;
    let errorMessage = <ul>
      <li>'Password must contain:'</li>
      <ul>;
  
    if (!digitRegex.test(password)) {
      errorMessage += '<li>• Minimum 1 number</li>'
    }
    if (!specialCharRegex.test(password)) {
      errorMessage += '<li>• Minimum 1 special character</li>'
    }
    if (!lengthRegex.test(password)) {
      errorMessage += '<li>• Minimum 8 characters</li>'
    }
  
    errorMessage += </ul>
  </ul>
  
    setPasswordError(errorMessage);
  }
  

  const registerSubmit = async (e) => {
    e.preventDefault();

    if (!usernameError) {
      navigate("/categories")
      await handleAsync(registerUser(username, password, phoneNumber, email, gender))
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
          <UserName inputChange={(value) => setUsername(value)} onBlur={usernameExists} onFocus={() => setUsernameError('')} />
          <div className="usernameErrorBox">{usernameError && <p className="usernameError"> <BiErrorAlt className="errorIcon" />{usernameError}</p>}</div>

        </div>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="password">
            Password*
          </label>
          <Password inputChange={(value) => setPassword(value)} onBlur={checkPassword} onFocus={() => setPasswordError('')} />
          <div className="usernameErrorBox">{passwordError && <p className="usernameError"> <BiErrorAlt className="errorIcon" />{passwordError}</p>}</div>

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
        
       
       <button className="button" type="submit">Sign up</button>
       </div>

      </form>
    </div>
  );
}

export default Register;



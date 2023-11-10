import React, { useEffect, useState } from "react";
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
  const [usernameErrorHidden, setUsernameErrorHidden] = useState(false);
  const [passwordErrorHidden, setPasswordErrorHidden] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [])

  const handleKeyDown = (e) => {

    if (e.key === 'Enter' || e.key === 'ArrowRight') {
      document.getElementById('signup-button').click();
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

  const usernameExists = async () => {
    const [checkUsername, checkUsernameError] = await handleAsync(isUserExist(username));
    checkUsernameError && console.log(checkUsernameError);
    const usernameSpecial = /^[a-zA-Z0-9]+$/;
    const usernameLength = /^.{3,20}$/;
    let error = ['Username must contain;'];

    checkUsername.status === true && error.push(checkUsername.message);
    !usernameSpecial.test(username) && error.push('• No special characters.');
    !usernameLength.test(username) && error.push('• Between 3 and 20 characters');
        
    const errorListUsername = error.map((message, index) => (
      <li key={index}>{message}</li>
    ));
    usernameError && setUsernameErrorHidden(false);
    errorListUsername.length > 1 && true ? setUsernameError(<ul>{errorListUsername}</ul>) : setUsernameError('')
  }

  const checkPassword = () => {
    const digitRegex = /.*\d.*/;
    const specialCharRegex = /.*[@$!%*?&].*/;
    const lengthRegex = /^.{8,}$/;
  
    let errorMessages = ['Password must contain;'];
    !digitRegex.test(password) && errorMessages.push('• Minimum 1 number');
    !specialCharRegex.test(password) && errorMessages.push('• Minimum 1 special character');
    !lengthRegex.test(password) && errorMessages.push('• Minimum 8 characters');

    const errorList = errorMessages.map((message, index) =>  (
      <li key={index}>{message}</li>
    ));
    passwordError && setPasswordErrorHidden(false);

    errorList.length > 1 ? setPasswordError(<ul>{errorList}</ul>) : setPasswordError('')
  }
  const registerSubmit = async (e) => {
    e.preventDefault();
    
    if (!usernameError && !passwordError) {
      await registerUser(username, password, phoneNumber, email, gender)
      dispatch(login({username, password}))
      navigate("/categories")
    } else document.activeElement.blur()
  };
  return (
    <div className="container borderContainer">
      <form onSubmit={registerSubmit}>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="username">
            Username*
          </label>
          <UserName
           inputChange={(value) => {setUsername(value); setUsernameErrorHidden(false)}} onBlur={usernameExists} onFocus={() => usernameError && setUsernameErrorHidden(true)}/>
          <div style={{display: usernameErrorHidden ? "none" : "block"}} className="listErrorBox">{usernameError && <div id="usernameError" className="listError"> <BiErrorAlt className="errorIcon" />{usernameError}</div>}</div>

        </div>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="password">
            Password*
          </label>
          <Password inputChange={(value) => {setPassword(value); checkPassword(); setPasswordErrorHidden(true)}} onBlur={checkPassword} onFocus={() => passwordError && setPasswordErrorHidden(true)} />
          <div style={{display: passwordErrorHidden ? "none" : "block"}} className="listErrorBox">{passwordError && <div id="passwordError" className="listError"> <BiErrorAlt className="errorIcon" />{passwordError}</div>}</div>

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
        
       
       <button className="button" id="signup-button" type="submit" >Sign up</button>
       </div>

      </form>
    </div>
  );
}

export default Register;



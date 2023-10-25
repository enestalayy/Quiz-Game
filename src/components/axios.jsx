import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserName from "./Login/UserName";
import Phone from "./Login/Phone";
import Email from "./Login/Email";
import Gender from "./Login/Gender";

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3000/scoreboard?username=${e.target.value}`)
      .then((response) => {
        // scoreboard dizisinde kullanıcı adıyla eşleşen bir öğe var mı diye bak
        console.log(response.data)
        const userExists = response.data === e.target.value         
        //  console.log(response.data((user) => user.id))
        if (userExists) {
          // eğer varsa, hata mesajı göster
          setError("This username already exists.");
        } else {
          navigate("/categories")
          axios.post("http://localhost:3000/scoreboard", {
            id: username,
            username: username,
            score: 0,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
            // eğer yoksa, hata mesajını temizle
            setError("");
          }
      })
      .catch((error) => {
        console.log(error);
      });
    
  };
  return (
    <div className="container borderContainer">
      <form onSubmit={handleSubmit}>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="username">
            Username*
          </label>
          <UserName onUsernameChange={handleUsernameChange} />
          {error && <p className="error">{error}</p>}
        </div>
        <div className="inputLogin">
          <label className="labelLogin">Phone Number</label>
          <Phone />
        </div>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="email">
            E-mail
          </label>
          <Email />
        </div>
        <div className="inputLogin">
          <label className="labelLogin" htmlFor="gender">
            Gender
          </label>
          <Gender />
        </div>

        <button>Next to categories</button>

      </form>
    </div>
  );
}

export default Login;

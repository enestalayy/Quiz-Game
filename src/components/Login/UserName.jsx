import React, { useState } from "react";
import axios from "axios";

function UserName({ onUsernameChange }) {
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
    onUsernameChange(e.target.value);
    
  };

  return (
    <div>
      <input
        id="userName"
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={handleChange}
      />
    </div>
  );
}

export default UserName;

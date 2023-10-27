// UserName.jsx
import React from "react";

function UserName({ username, onUsernameChange }) {
  
  return (
    <div>
      <input
        id="userName"
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={((e) => onUsernameChange(e.target.value))}
      />
    </div>
  );
}

export default UserName;

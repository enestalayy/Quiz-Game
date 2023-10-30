import React from "react";

function UserName({ username, inputChange }) {
  
  return (
    <div>
      <input
        id="userName"
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={((e) => inputChange(e.target.value))}
      />
    </div>
  );
}

export default UserName;

import React from "react";

function UserName({ username, inputChange, onBlur, onFocus }) {
  
  return (
    <div>
      <input
        id="userName"
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={((e) => inputChange(e.target.value))}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
}

export default UserName;

import React from 'react';

function Error({ message }) {
  return message ? <p className="error">{message}</p> : null;
}

export default Error;

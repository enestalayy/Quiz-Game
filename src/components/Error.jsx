import React from 'react';
import {BiErrorAlt} from 'react-icons/bi'

function Error({ message }) {
  return message ? <p className="error"> <BiErrorAlt /> {message}</p> : null;
}

export default Error;

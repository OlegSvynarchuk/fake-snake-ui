import React from 'react';

export default function Error({errorMessage}) {
    console.log(errorMessage)
  return <div className='error'>{errorMessage}</div>;
}

import React from 'react'
import "../styles/Invalid.css";
import { Link } from 'react-router-dom';

const InvalidUrl = () => {
  return (
    <div className='invalid'>
        <h1>Page not found... :)</h1>
        <h4>Article echo doesn't have this routing please back to home to have our services</h4>
        <Link to={"/"} className='link'>Back to Home</Link>
    </div>
  )
}

export default InvalidUrl
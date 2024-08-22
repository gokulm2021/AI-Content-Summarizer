import React from 'react'
import "../styles/Header.css";
const Header = () => {
    // let OpenLink = () => {
    //     window.open("https://www.linkedin.com/in/santhosh-m-/", "_blank");
    // }
  return (
    <div className='header_container'>
        <div className="logo">
            {/* <img src="/assests/logo_.png" alt="logo" /> */}
            <h4>Article <span className='text'>echo</span></h4>
        </div>
        {/* <div className="social_navigations" title='Follow me on'>
            <div className="social_btn github" onClick={() => OpenLink}>
                linkedIn
            </div>
        </div> */}
    </div>
  )
}

export default Header
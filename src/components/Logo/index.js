import React from 'react';
import logo from '../../../public/assets/logo.png'

const Logo = () => {
    return (
        <a href="/" className="logo">
            <img alt="Posts" src={logo} className="logo__pic"/>
        </a>    
    )
}

export default Logo;
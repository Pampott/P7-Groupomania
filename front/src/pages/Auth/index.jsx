import React from 'react';
import Log from '../../components/Log';
import logo from '../../assets/logo.svg';
import '../Auth/index.css';
const Auth = () => {
    return (
        <div className='auth-wrapper'>
            <div className="log-container">
                <div className="logo-wrapper">
                <img src={logo} alt="Groupomania logo" className='logo' />
                </div>
                <Log />
                
            </div> 
        </div>
    );
};

export default Auth
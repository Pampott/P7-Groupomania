import React from 'react';
import Log from '../../components/Log';
import  Illustration from '../../assets/auth-img.png'
const Auth = () => {
    return (
        <div className='auth-page'>
            <div className="log-container">
                <Log />
                <div className="img-container">
                    <img src={Illustration} alt='authentification'/>
                </div>
            </div> 
        </div>
    );
};

export default Auth
import React from 'react';
import axios from 'axios';

const Logout = () => {
    function redirect() {
        
        axios.get(`${process.env.REACT_APP_API_URL}api/auth/logout`)
        .then(window.location = '/auth')
        .catch(err => alert('Une erreur est survenue : ' + err))
    }
    return (
        <div className='logout-container' onClick={redirect}>
            <div className="logout-img">
                <img src="" alt="" />
            </div>
            <div className="logout-text">
                <p>Se déconnecter</p>
            </div>
        </div>
    );
};

export default Logout;
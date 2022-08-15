import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';

const Logout = () => {
    function redirect() {
        
        axios.get(`${process.env.REACT_APP_API_URL}api/auth/logout`)
        .then(window.location = '/auth')
        .catch(err => alert('Une erreur est survenue : ' + err))
    }
    return (
        <div className='logout-container' onClick={redirect}>
            <div className="logout-img">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='logout-icon' />
            </div>
        </div>
    );
};

export default Logout;
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navigation = () => {
    return (
        <header className='navigation'>
            <nav className='navigation__list'>
                <NavLink to="/">
                    <img className='logo' src={logo} alt="Groupomania logo" />
                </NavLink>
                <div className="links-wrapper">
                    <NavLink className="link" to="/signup">
                        Inscription
                    </NavLink>
                    <NavLink className="link" to='/login'>
                        Connexion
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;
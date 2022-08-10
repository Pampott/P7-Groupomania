import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../../App';
import Auth from '../../pages/Auth';
import Posts from '../../pages/Posts';

const DefaultRoutes = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={ <App />} />
                    <Route path='/auth' element={ <Auth /> } />
                    <Route path='/posts' element={ <Posts />} />
                </Routes>
            </Router>
        </div>
    );
};

export default DefaultRoutes;
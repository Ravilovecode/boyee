import React from 'react';
import './Loader.css';
import logo from '../assets/images/logo.png'; // Make sure this path is correct based on project structure

const Loader = () => {
    return (
        <div className="loader-container">
            <img src={logo} alt="Boyee Loading..." className="loader-logo" />
        </div>
    );
};

export default Loader;

import React from 'react';
import './Navbar.css';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Boyee" className="logo-icon" />
        </div>

        <ul className="navbar-links">
          <li><a href="#shop">Shop</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#delivery">Delivery</a></li>
          <li><a href="#contacts">Contacts</a></li>
        </ul>

        <div className="navbar-auth">
          <a href="#login" className="login-link">Log in</a>
          <span className="divider">|</span>
          <button className="avatar-btn">
            <span>O</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

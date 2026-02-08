import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Boyee" className="logo-icon" />
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={closeMenu}
        ></div>

        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#shop" onClick={closeMenu}>Shop</a></li>
          <li><a href="#features" onClick={closeMenu}>Features</a></li>
          <li><a href="#delivery" onClick={closeMenu}>Delivery</a></li>
          <li><a href="#contacts" onClick={closeMenu}>Contacts</a></li>
        </ul>

        <div className={`navbar-auth ${isMenuOpen ? 'active' : ''}`}>
          <a href="#login" className="login-link" onClick={closeMenu}>Log in</a>
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

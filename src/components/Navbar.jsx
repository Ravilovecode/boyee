import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products with search query
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/account');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <img src={logo} alt="Boyee" className="logo-icon" />
        </Link>

        {/* Search Bar - inline */}
        <div className="navbar-search-container">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search For Plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Right side icons */}
        <div className="navbar-icons">
          {/* Bag Icon */}
          <button className="bag-btn" onClick={() => navigate('/cart')} aria-label="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="bag-count">0</span>
          </button>

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
        </div>

        {/* Mobile Drawer Overlay */}
        <div
          className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={closeMenu}
        ></div>

        {/* ===== Modern Mobile Drawer ===== */}
        <div className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`}>

          {/* Profile Section */}
          <div className="drawer-profile" onClick={() => handleNavClick('/account')}>
            {user ? (
              <>
                <div className="drawer-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="drawer-user-info">
                  <span className="drawer-user-name">{user.name}</span>
                  <span className="drawer-user-email">{user.email || 'View profile'}</span>
                </div>
              </>
            ) : (
              <>
                <div className="drawer-avatar drawer-avatar-guest">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.94 19.58 16.92 18.83 16.17C18.08 15.42 17.06 15 16 15H8C6.94 15 5.92 15.42 5.17 16.17C4.42 16.92 4 17.94 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="drawer-user-info">
                  <span className="drawer-user-name">Sign In</span>
                  <span className="drawer-user-email">Tap to login or register</span>
                </div>
              </>
            )}
            <svg className="drawer-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="drawer-divider"></div>

          {/* Nav Links */}
          <ul className="drawer-nav">
            <li>
              <button onClick={() => handleNavClick('/products')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Products
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('/home')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Features
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('/home')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="1" y="3" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M16 8L20 6V16L16 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 20H22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="9" cy="20" r="2" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="18" cy="20" r="2" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                Delivery
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('/home')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.17 21.04 19.35 21 18.55 20.85C16.97 20.55 15.48 19.94 14.16 19.05C12.93 18.23 11.87 17.17 11.05 15.94C10.16 14.62 9.55 13.13 9.25 11.55C9.1 10.75 9.06 9.94 9.13 9.11C9.17 8.55 9.62 8.11 10.18 8.11H13.18C13.66 8.11 14.07 8.47 14.13 8.94C14.19 9.55 14.31 10.14 14.49 10.72C14.63 11.15 14.52 11.62 14.18 11.96L13.09 13.05C13.85 14.39 14.95 15.49 16.29 16.25L17.38 15.16C17.72 14.82 18.19 14.71 18.62 14.85C19.2 15.03 19.79 15.15 20.4 15.21C20.87 15.27 21.23 15.68 21.23 16.16L22 16.92Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Contacts
              </button>
            </li>
          </ul>

          {/* Logout Button (only when logged in) */}
          {/* Spacer pushes logout to bottom */}
          <div className="drawer-spacer"></div>

          {/* Logout Button (only when logged in) */}
          {user && (
            <>
              <div className="drawer-divider"></div>
              <button className="drawer-logout" onClick={handleLogout}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Log Out
              </button>
            </>
          )}
        </div>

        {/* Desktop-only nav links & auth (hidden on mobile) */}
        <ul className="navbar-links desktop-only">
          <li><button onClick={() => handleNavClick('/products')}>Products</button></li>
          <li><button onClick={() => handleNavClick('/home')}>Features</button></li>
          <li><button onClick={() => handleNavClick('/home')}>Delivery</button></li>
          <li><button onClick={() => handleNavClick('/home')}>Contacts</button></li>
        </ul>

        <div className="navbar-auth desktop-only">
          {user ? (
            <>
              <button className="login-link" onClick={() => handleNavClick('/account')}>
                {user.name}
              </button>
              <span className="divider">|</span>
              <button className="avatar-btn logout-btn" onClick={handleLogout} title="Log out">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button className="login-link" onClick={() => handleNavClick('/account')}>Log in</button>
              <span className="divider">|</span>
              <button className="avatar-btn" onClick={() => handleNavClick('/account')}>
                <span>O</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

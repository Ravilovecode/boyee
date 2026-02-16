import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

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

        {/* Search Bar */}
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

        {/* Desktop Section: Links, Profile, Cart, Logout */}
        <div className="desktop-section desktop-only">
          {/* Nav Links */}
          <ul className="navbar-links">
            <li><button onClick={() => handleNavClick('/home')}>Home</button></li>
            <li><button onClick={() => handleNavClick('/products')}>Products</button></li>
            <li><button onClick={() => handleNavClick('/myorders')}>My Orders</button></li>
            <li><button onClick={() => handleNavClick('/account')}>Account</button></li>
          </ul>

          {/* User Profile (Name + Avatar) */}
          {user ? (
            <div className="navbar-profile" onClick={() => handleNavClick('/account')}>
              <span className="profile-name">{user.name}</span>
              <div className="profile-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          ) : (
            <div className="navbar-profile" onClick={() => handleNavClick('/account')}>
              <span className="profile-name">Sign In</span>
              <div className="profile-avatar guest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
          )}

          {/* Cart Icon */}
          <button className="bag-btn desktop-bag" onClick={() => navigate('/cart')} aria-label="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="bag-count">{totalQty}</span>
          </button>

          {/* Logout Icon (only when logged in) */}
          {user && (
            <button className="logout-icon-btn" onClick={handleLogout} title="Log out">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Icons (Bag + Hamburger) */}
        <div className="navbar-icons mobile-only">
          {/* Bag Icon (Mobile) */}
          <button className="bag-btn" onClick={() => navigate('/cart')} aria-label="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="bag-count">{totalQty}</span>
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
              <button onClick={() => handleNavClick('/home')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20C21 20.53 20.79 21.04 20.41 21.41C20.04 21.79 19.53 22 19 22H5C4.47 22 3.96 21.79 3.59 21.41C3.21 21.04 3 20.53 3 20V9Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('/products')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 13a7 7 0 0 1 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 13a7 7 0 0 0-7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 22h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Products
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('/myorders')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                My Orders
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('/account')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.94 19.58 16.92 18.83 16.17C18.08 15.42 17.06 15 16 15H8C6.94 15 5.92 15.42 5.17 16.17C4.42 16.92 4 17.94 4 19V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Account
              </button>
            </li>
          </ul>

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
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import loginBg from '../assets/images/login/login-bg.png';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', { email, password });
    } else {
      console.log('Signup:', { name, email, password });
    }
  };

  return (
    <div className="login-page">

      {/* ============ MOBILE LAYOUT (card style) ============ */}
      <div className="login-mobile">
        <div className="login-corner-decoration"></div>

        <div className="login-card">
          <div className="login-card-image">
            <img src={loginBg} alt="Plants" className="login-bg-img" />
            <div className="login-card-curve"></div>
          </div>

          <div className="login-logo-circle">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H5L7.68 14.39C7.77 14.83 8.02 15.22 8.38 15.5C8.74 15.78 9.18 15.92 9.64 15.9H19.36C19.82 15.92 20.26 15.78 20.62 15.5C20.98 15.22 21.23 14.83 21.32 14.39L23 6H6" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="20" r="1.5" fill="#2d6a4f"/>
              <circle cx="20" cy="20" r="1.5" fill="#2d6a4f"/>
              <path d="M14 2C14 2 17 3 17 6C17 9 14 10 14 10C14 10 11 9 11 6C11 3 14 2 14 2Z" fill="#2d6a4f" opacity="0.8"/>
              <path d="M14 2V10" stroke="#ffffff" strokeWidth="0.5"/>
            </svg>
          </div>

          <div className="login-form-section">
            <h1 className="login-title">
              {isLogin ? 'Welcome back' : 'Create Account'}
            </h1>
            <p className="login-subtitle">
              {isLogin ? 'login to your account' : 'sign up for a new account'}
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="login-input-group">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 17.94 19.58 16.92 18.83 16.17C18.08 15.42 17.06 15 16 15H8C6.94 15 5.92 15.42 5.17 16.17C4.42 16.92 4 17.94 4 19V21" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="#999" strokeWidth="1.5"/></svg>
                  </span>
                  <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="login-input" />
                </div>
              )}

              <div className="login-input-group">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#999" strokeWidth="1.5"/><path d="M22 6L12 13L2 6" stroke="#999" strokeWidth="1.5"/></svg>
                </span>
                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
                <span className="input-leaf">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 8C17 8 21 4 21 2C15 2 11 6 11 10C11 14 8 16 4 18C4 18 8 20 12 18C16 16 17 12 17 8Z" fill="#2d6a4f" opacity="0.7"/></svg>
                </span>
              </div>

              <div className="login-input-group">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#999" strokeWidth="1.5"/><path d="M7 11V7C7 5.67 7.53 4.4 8.46 3.46C9.4 2.53 10.67 2 12 2C13.33 2 14.6 2.53 15.54 3.46C16.47 4.4 17 5.67 17 7V11" stroke="#999" strokeWidth="1.5"/></svg>
                </span>
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#999" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="#999" strokeWidth="1.5"/></svg>
                </button>
              </div>

              {isLogin && (
                <div className="login-forgot">
                  <button type="button" className="forgot-link">Forgot Password?</button>
                </div>
              )}

              <button type="submit" className="login-btn">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>

            <p className="login-switch">
              {isLogin ? (
                <>Don't have an account?{' '}<button type="button" className="switch-link" onClick={() => setIsLogin(false)}>Signup</button></>
              ) : (
                <>Already have an account?{' '}<button type="button" className="switch-link" onClick={() => setIsLogin(true)}>Login</button></>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ============ DESKTOP LAYOUT (full-width Florista style) ============ */}
      <div className="login-desktop">
        <nav className="ld-nav">
          <Link to="/home" className="ld-nav-link ld-active">HOME</Link>
          <div className="ld-nav-center">
            <Link to="/products" className="ld-nav-link">PRODUCTS</Link>
            <span className="ld-nav-link">SERVICES</span>
            <span className="ld-nav-link">ABOUT US</span>
            <span className="ld-nav-link">CATALOGUE</span>
            <span className="ld-nav-link">LOGIN</span>
          </div>
          <span className="ld-nav-link ld-contact">CONTACT</span>
        </nav>

        <div className="ld-content">
          <div className="ld-form-side">
            <h1 className="ld-title">
              WELCOME TO <span className="ld-highlight">FLORISTA</span>
            </h1>
            <h2 className="ld-subtitle">{isLogin ? 'USER LOGIN' : 'CREATE ACCOUNT'}</h2>

            <form className="ld-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <input type="text" placeholder="full name" value={name} onChange={(e) => setName(e.target.value)} className="ld-input" />
              )}
              <input type="email" placeholder="email address" value={email} onChange={(e) => setEmail(e.target.value)} className="ld-input" />
              <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="ld-input" />

              {isLogin && (
                <div className="ld-options">
                  <label className="ld-remember">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                    <span className="ld-check">✔</span> REMEMBER
                  </label>
                  <button type="button" className="ld-forgot">FORGOT PASSWORD?</button>
                </div>
              )}

              <button type="submit" className="ld-login-btn">{isLogin ? 'LOGIN' : 'SIGN UP'}</button>
            </form>

            <p className="ld-switch">
              {isLogin ? (
                <>Don't have an account?{' '}<button type="button" className="switch-link" onClick={() => setIsLogin(false)}>Sign Up</button></>
              ) : (
                <>Already have an account?{' '}<button type="button" className="switch-link" onClick={() => setIsLogin(true)}>Login</button></>
              )}
            </p>
          </div>

          <div className="ld-image-side">
            <img src={loginBg} alt="Florista" className="ld-bg-img" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;

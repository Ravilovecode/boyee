import React, { useState, useEffect } from 'react';
import './Welcome.css';

const Welcome = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show welcome modal after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-overlay" onClick={handleClose}>
      <div className="welcome-modal" onClick={(e) => e.stopPropagation()}>
        <button className="welcome-close" onClick={handleClose}>
          ×
        </button>
        
        <div className="welcome-content">
          <h2 className="welcome-title">Hi, Welcome to Boyee! 👋</h2>
          <p className="welcome-text typing-effect">
            We don't just sell plants — we provide proper measures to care for your plants 
            with our <span className="highlight">AI-powered app</span>.
          </p>
          <p className="welcome-features">
            ✨ Real-time watering alerts<br />
            🔍 Disease detection & treatment<br />
            ☀️ Sunlight monitoring<br />
            💚 Personalized care tips
          </p>
          <button className="welcome-btn" onClick={handleClose}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

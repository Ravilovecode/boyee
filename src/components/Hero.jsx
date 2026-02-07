import React, { useState, useEffect } from 'react';
import './Hero.css';
import heroPlant from '../assets/images/hero-plant1.png';
import plantSmall1 from '../assets/images/plant-small-1.png';
import plantSmall2 from '../assets/images/plant-small-2.png';

const Hero = () => {
  const categories = ['WATER ALERTS', 'DISEASE DETECTION', 'AI CARE TIPS', 'HEALTH MONITOR', 'MEDICINE GUIDE', 'SUNLIGHT TRACKER'];
  const [typedText, setTypedText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const fullText = "We don't just sell plants — we provide proper measures to care for your plants with our AI-powered app.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Side - Main Plant Image */}
        <div className="hero-left">
          <div className="hero-plant-wrapper">
            <img
              src={heroPlant}
              alt="Snake Plant in cute pot"
              className="hero-plant-img"
            />
            <div className="plant-orbit">
              <div className="orbit-ring"></div>
              <div className="orbit-controls">
                <span>&lt;</span>
                <span>&gt;</span>
              </div>
            </div>
          </div>

          {/* Category Tags */}
          <div className="category-tags">
            {categories.map((cat, index) => (
              <button key={index} className="category-tag">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="hero-right">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-outline">AI-POWERED</span>
              <br />
              <span className="title-green">PLANT CARE</span>{' '}
              <span className="title-outline">FOR</span>
              <br />
              <span className="title-outline">YOUR HOME</span>
            </h1>

            <p className="hero-typing">
              {typedText}
            </p>

            {showDetails && (
              <p className="hero-description">
                Smart plant care with AI-powered monitoring. Get real-time alerts for watering and sunlight, detect plant diseases instantly, and receive personalized medicine recommendations to keep your plants thriving.
              </p>
            )}

            <div className="hero-actions">
              <a href="#shop" className="btn-shop">
                <span className="btn-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="btn-text">GET THE APP</span>
              </a>
              <button className="btn-details" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'HIDE DETAILS' : 'MORE DETAILS'}
              </button>
            </div>
          </div>

          {/* Small Plant Cards */}
          <div className="plant-cards">
            <div className="plant-card">
              <div className="plant-card-stand"></div>
              <img
                src={plantSmall1}
                alt="Small Plant 1"
                className="plant-card-img"
              />
            </div>
            <div className="plant-card">
              <div className="plant-card-stand"></div>
              <img
                src={plantSmall2}
                alt="Small Plant 2"
                className="plant-card-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

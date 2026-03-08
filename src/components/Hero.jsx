import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import HowItWorksModal from './HowItWorksModal';
import heroPlant from '../assets/images/hero-plant1.png';
import plantSmall1 from '../assets/images/plant-small-1.png';
import plantSmall2 from '../assets/images/plant-small-2.png';
import { FloatingLeaves } from './landing/ai-mascot';

const Hero = () => {
  const categories = ['WATER ALERTS', 'DISEASE DETECTION', 'AI CARE TIPS', 'HEALTH MONITOR', 'MEDICINE GUIDE', 'SUNLIGHT TRACKER'];
  const [typedText, setTypedText] = useState('');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
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

  const [mascotPos, setMascotPos] = useState({ top: 'auto', bottom: '30px', left: 'auto', right: '-30px' });
  const [mascotVisible, setMascotVisible] = useState(false);

  useEffect(() => {
    const positions = [
      { bottom: '-10px', right: '-40px', top: 'auto', left: 'auto' },
      { bottom: '-10px', left: '-40px', top: 'auto', right: 'auto' },
      { top: '-10px', right: '-40px', bottom: 'auto', left: 'auto' },
      { top: '-10px', left: '-40px', bottom: 'auto', right: 'auto' },
      { top: '40%', right: '-50px', bottom: 'auto', left: 'auto' },
      { top: '40%', left: '-50px', bottom: 'auto', right: 'auto' },
    ];

    const cycle = () => {
      const randomPos = positions[Math.floor(Math.random() * positions.length)];
      setMascotPos(randomPos);
      setMascotVisible(true);

      setTimeout(() => {
        setMascotVisible(false);
      }, 2500);
    };

    cycle();
    const interval = setInterval(cycle, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {/* Falling leaves animation */}
      <FloatingLeaves />

      {/* Floating gradient orbs */}
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>

      <div className="hero-container">
        {/* Left Side - Main Plant Image */}
        <div className="hero-left">
          <div className="hero-plant-wrapper">
            <img
              src={heroPlant}
              alt="Snake Plant in cute pot"
              className="hero-plant-img"
            />
            {/* Peek-a-boo Mascot */}
            <div
              className={`hero-mascot ${mascotVisible ? 'mascot-show' : 'mascot-hide'}`}
              style={mascotPos}
            >
              <div className="mascot-body">
                <div className="mascot-eyes">
                  <div className="mascot-eye"></div>
                  <div className="mascot-eye"></div>
                </div>
                <div className="mascot-smile"></div>
                <div className="mascot-leaf">
                  <svg viewBox="0 0 24 32" fill="currentColor">
                    <path d="M12 32V16C12 8 4 4 4 4C4 4 8 8 8 16C8 16 12 12 12 8C12 12 16 16 16 16C16 8 20 4 20 4C20 4 12 8 12 16V32Z" />
                  </svg>
                </div>
              </div>
              <div className="mascot-glow"></div>
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
              AI-POWERED <span className="title-green">PLANT CARE</span> <br /> FOR YOUR
              HOME
            </h1>

            <p className="hero-typing">
              {typedText}
            </p>

            <div className="hero-actions">
              <button className="btn-shop" onClick={() => setShowHowItWorks(true)}>
                <span className="btn-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="btn-text">SEE HOW IT WORKS</span>
              </button>
              <Link to="/products" className="btn-explore">
                EXPLORE PLANTS
              </Link>
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

      {/* How It Works Modal */}
      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </section>
  );
};

export default Hero;

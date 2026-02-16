import React, { useState, useEffect } from 'react';
import './PromoCarousel.css';

const slides = [
    {
        id: 1,
        title: "Holi Special Sale",
        subtitle: "Bring colors to your garden",
        bgColor: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
        image: null // Placeholder for now
    },
    {
        id: 2,
        title: "Upcoming Festival Plants",
        subtitle: "Pre-order for the season",
        bgColor: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
        image: null
    },
    {
        id: 3,
        title: "Air Purifying Combo",
        subtitle: "Breathe fresh at home",
        bgColor: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
        image: null
    }
];

const PromoCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 4000); // Auto-slide every 4s
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="promo-carousel-section">
            <div className="promo-carousel-container">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`promo-slide ${index === current ? 'active' : ''}`}
                        style={{ background: slide.bgColor }}
                    >
                        <div className="promo-content">
                            <h3>{slide.title}</h3>
                            <p>{slide.subtitle}</p>
                            <button className="promo-btn">Explore</button>
                        </div>
                    </div>
                ))}

                <div className="promo-indicators">
                    {slides.map((_, idx) => (
                        <span
                            key={idx}
                            className={`indicator ${idx === current ? 'active' : ''}`}
                            onClick={() => setCurrent(idx)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromoCarousel;

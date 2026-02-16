import React, { useState, useEffect, useRef } from 'react';
import './ProductCarousel.css';
import galleryBg from '../assets/images/gallery/gallery-background.png';
// keeping imports for fallbacks or removing if unused
import leftImg from '../assets/images/gallery/left.png';
import middleImg from '../assets/images/gallery/middle.png';
import rightImg from '../assets/images/gallery/right.png';
import snakePlantImg from '../assets/images/gallery/snake-plant.png';
import jedePlantImg from '../assets/images/gallery/jede-plant.png';
import { getAllPlants } from '../services/plantService';

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllPlants();
        const mapped = data.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price || 199,
          image: p.image
        }));
        // Ensure we have enough products for carousel loop or handle it?
        // For now just set what we have.
        setProducts(mapped);
        if (mapped.length > 0) setCurrentIndex(Math.min(1, mapped.length - 1));
      } catch (e) {
        console.error("Carousel fetch failed", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getVisibleProducts = () => {
    const prev = currentIndex === 0 ? null : products[currentIndex - 1];
    const current = products[currentIndex];
    const next = currentIndex === products.length - 1 ? null : products[currentIndex + 1];
    return [prev, current, next];
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = e.pageX;
    const diff = startX - endX;

    // If dragged more than 50px, change slide
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    // If swiped more than 50px, change slide
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  // Add keyboard arrow key support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Add trackpad horizontal swipe gesture support with cooldown
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();

        if (isScrolling.current) return;

        if (e.deltaX > 15) {
          isScrolling.current = true;
          setCurrentIndex(prev => Math.min(prev + 1, products.length - 1));
        } else if (e.deltaX < -15) {
          isScrolling.current = true;
          setCurrentIndex(prev => Math.max(prev - 1, 0));
        }

        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isScrolling.current = false;
        }, 400);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [products.length]);

  if (loading || products.length === 0) return null; // Or a loading skeleton

  return (
    <section className="product-carousel-section" style={{ backgroundImage: `url(${galleryBg})` }}>
      <h2 className="section-heading">Our Top Selling Plants</h2>
      <div className="carousel-container">
        <div
          className="carousel-track"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {getVisibleProducts().map((product, index) => {
            if (!product) {
              return <div key={`empty-${index}`} className="product-card empty"></div>;
            }

            const isCenter = index === 1;

            return (
              <div
                key={product.id}
                className={`product-card ${isCenter ? 'active' : ''}`}
                onClick={() => {
                  if (index === 0) handlePrev();
                  if (index === 2) handleNext();
                }}
              >
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">₹{product.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button className="carousel-btn carousel-btn-prev" onClick={handlePrev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {currentIndex < products.length - 1 && (
          <button className="carousel-btn carousel-btn-next" onClick={handleNext}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Featured Product Details */}
      <div className="featured-product">
        <h2 className="featured-name">{products[currentIndex].name}</h2>
        <p className="featured-price">₹{products[currentIndex].price}</p>
        <button className="add-to-cart-btn">+ Add to Cart</button>
      </div>
    </section>
  );
};

export default ProductCarousel;

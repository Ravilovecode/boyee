import './Products.css'

// Import plant images - No longer strictly needed if fetched from backend, but keeping if fallbacks needed
// import jadePlant from '../assets/images/gallery/jede-plant.png'
// import snakePlant from '../assets/images/gallery/snake-plant.png'
// import leftPlant from '../assets/images/gallery/left.png'
// import rightPlant from '../assets/images/gallery/right.png'

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { getAllPlants } from '../services/plantService';
import Loader from './Loader';
import './Products.css';

function Products({ selectedCategory, title, showViewAll = true }) {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = {};
        if (selectedCategory) {
          query.category = selectedCategory;
        }

        const data = await getAllPlants(query);
        // Map backend data to frontend structure
        const mappedProducts = data.map(plant => ({
          id: plant._id, // Use _id as id
          _id: plant._id, // Keep _id just in case
          name: plant.name,
          image: plant.image,
          rating: plant.rating || 4.5,
          reviews: plant.reviews || 0,
          tags: plant.tags || [],
          price: plant.price || 199,
          originalPrice: plant.originalPrice || (plant.price ? plant.price + 100 : 299),
          badge: (plant.price && plant.originalPrice && plant.price < plant.originalPrice) ? 'Price Drop!' : '',
          badgeType: 'price-drop'
        }));
        setProducts(mappedProducts);
      } catch (err) {
        console.error('Failed to load products', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (loading) return <Loader />;
  if (error) return <div className="products-container"><p>{error}</p></div>;
  // If no products in this category (and it's a section), maybe hide it?
  if (products.length === 0) return null;

  return (
    <section className="products-section">
      <div className="products-container">
        {/* Section Header */}
        <div className="products-header">
          <h2 className="products-title">
            {title || (selectedCategory === 'Best Selling' ? 'Bestsellers' :
              selectedCategory ? `${selectedCategory} Plants` : 'All Plants')}
          </h2>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card-item">
              {/* Product Image Container */}
              <div className="product-image-container">
                {/* Badge */}
                <span className={`product-badge ${product.badgeType}`}>
                  {product.badgeType === 'price-drop' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                    </svg>
                  )}
                  {product.badge}
                </span>

                {/* Product Image */}
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                  />
                </Link>

                {/* Rating Badge */}
                <div className="product-rating">
                  <span className="rating-value">{product.rating}</span>
                  <span className="rating-star">★</span>
                  <span className="rating-divider">|</span>
                  <span className="rating-reviews">{product.reviews}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-name">
                  <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {product.name}
                  </Link>
                </h3>

                {/* Tags */}
                <div className="product-tags">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="product-tag">{tag}</span>
                  ))}
                </div>

                {/* Price */}
                <div className="product-price">
                  <span className="price-label">From</span>
                  <span className="price-current">₹{product.price}</span>
                  <span className="price-original">₹{product.originalPrice}</span>
                </div>

                {/* View Product Button */}
                <button
                  className="view-product-btn"
                  onClick={() => {
                    addToCart(product);
                    showNotification(`${product.name} added to cart!`, 'glass');
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button className="view-all-btn">
          View all
        </button>

        {/* Second Section */}

      </div>
    </section>
  )
}

export default Products

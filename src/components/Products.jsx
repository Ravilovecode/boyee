import './Products.css'

// Import plant images
import jadePlant from '../assets/images/gallery/jede-plant.png'
import snakePlant from '../assets/images/gallery/snake-plant.png'
import leftPlant from '../assets/images/gallery/left.png'
import rightPlant from '../assets/images/gallery/right.png'

const products = [
  {
    id: 1,
    name: 'Jade Mini Plant',
    image: jadePlant,
    rating: 4.76,
    reviews: 407,
    tags: ['Easy Care', 'Vastu Friendly'],
    price: 199,
    originalPrice: 299,
    badge: 'Price Drop!',
    badgeType: 'price-drop'
  },
  {
    id: 2,
    name: 'Snake Plant',
    image: snakePlant,
    rating: 4.7,
    reviews: 421,
    tags: ['Air Purifying', 'Low Light'],
    price: 249,
    originalPrice: 399,
    badge: 'Price Drop!',
    badgeType: 'price-drop'
  },
  {
    id: 3,
    name: 'Money Plant Golden',
    image: leftPlant,
    rating: 4.69,
    reviews: 29,
    tags: ['Pet Friendly', 'Air Purifying'],
    price: 149,
    originalPrice: 249,
    badge: '40% OFF',
    badgeType: 'discount'
  },
  {
    id: 4,
    name: 'Monstera Deliciosa',
    image: rightPlant,
    rating: 4.8,
    reviews: 156,
    tags: ['Easy Care', 'Modern Decor'],
    price: 599,
    originalPrice: 799,
    badge: '23% OFF',
    badgeType: 'discount'
  }
]

function Products() {
  return (
    <section className="products-section">
      <div className="products-container">
        {/* Section Header */}
        <div className="products-header">
          <h2 className="products-title">Bestsellers</h2>
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
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  )}
                  {product.badge}
                </span>
                
                {/* Product Image */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-img"
                />
                
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
                <h3 className="product-name">{product.name}</h3>
                
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
                <button className="view-product-btn">
                  VIEW PRODUCT
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
        <div className="products-header second-section">
          <h2 className="products-title">Greens That Make a Statement</h2>
        </div>

        {/* Features Row */}
        <div className="features-row">
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="#1B5E20" strokeWidth="2"/>
                <path d="M12 3V1M12 23V21M3 12H1M23 12H21" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="feature-text">14-days<br/>Replacement</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1B5E20"/>
              </svg>
            </div>
            <span className="feature-text">Expert Care<br/>Guidance</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <span className="feature-number">10M+</span>
            </div>
            <span className="feature-text">Plant Parents<br/>Trust Us</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products

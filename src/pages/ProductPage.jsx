import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPlantById } from '../services/plantService';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import Loader from '../components/Loader';
import './ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { showNotification } = useNotification();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await getPlantById(id);
                setProduct(data);
                setSelectedImage(data.image);
            } catch (err) {
                console.error("Failed to load product", err);
                setError("Product not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
        window.scrollTo(0, 0);
    }, [id]);

    const handleQuantityChange = (type) => {
        if (type === 'dec') {
            setQuantity(prev => Math.max(1, prev - 1));
        } else {
            setQuantity(prev => Math.min(10, prev + 1));
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity });
            showNotification(`${quantity} x ${product.name} added to cart!`, 'glass');
        }
    };

    const handleBuyNow = () => {
        if (product) {
            // Store item in local storage for "Buy Now" flow (decoupled from cart)
            const buyNowItem = { ...product, quantity };
            // Note: ProductPage uses 'quantity', context uses 'qty' (mapped in addToCart). 
            // Let's standardize to 'qty' for consistency with Checkout.jsx expectation
            const itemForCheckout = { ...product, qty: quantity };

            localStorage.setItem('boyeeBuyNowItem', JSON.stringify([itemForCheckout]));

            if (user) {
                navigate('/checkout?source=buynow');
            } else {
                // Pass the intended destination so Login can redirect back correctly
                navigate('/account', { state: { showSignup: true, from: '/checkout?source=buynow' } });
            }
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-container">{error} <button onClick={() => navigate('/products')}>Go Back</button></div>;
    if (!product) return null;

    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <div className="product-page">
            <div className="product-details-container">
                {/* Image Gallery */}
                <div className="product-gallery">
                    <div className="main-image-container">
                        <img src={selectedImage || product.image} alt={product.name} className="main-image" />
                    </div>
                    {/* Placeholder for multiple images if they exist in future */}
                    <div className="thumbnail-list">
                        <div
                            className={`thumbnail ${selectedImage === product.image ? 'active' : ''}`}
                            onClick={() => setSelectedImage(product.image)}
                        >
                            <img src={product.image} alt="Main" />
                        </div>
                        {/* Fake thumbnails for now since backend only has one image usually. 
                            In a real scenario, map over product.images array. */}
                        {product.images && product.images.length > 0 && product.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img src={img} alt={`View ${idx + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div className="product-info-section">
                    <h1 className="product-title">{product.name}</h1>
                    <p className="scientific-name">{product.scientificName || 'Botanical Name'}</p>



                    <div className="price-container">
                        <span className="current-price">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                            <>
                                <span className="original-price">₹{product.originalPrice}</span>
                                <span className="discount-badge">{discount}% OFF</span>
                            </>
                        )}
                        <span className="tax-note">(Incl. of all taxes)</span>
                    </div>

                    <div className="action-buttons-container">
                        <button className="inline-add-to-cart-btn" onClick={handleAddToCart}>
                            ADD TO CART
                        </button>
                        <button className="inline-buy-now-btn" onClick={handleBuyNow}>
                            BUY NOW
                        </button>
                    </div>

                    {/* Pincode Check */}
                    <div className="pincode-section">
                        <h4>Check Delivery</h4>
                        <div className="pincode-input-wrapper">
                            <input type="text" placeholder="Enter Pincode" maxLength="6" />
                            <button className="check-btn">Check</button>
                        </div>
                        <p className="delivery-estimate">
                            Estimated Delivery By: <strong>{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</strong>
                        </p>
                    </div>

                    {/* About The Product */}
                    <div className="about-section">
                        <h3>About The Product</h3>
                        <p>{product.description}</p>
                    </div>



                    {/* Care Guide Title */}
                    <h3 className="care-guide-title">Care For Your Plant</h3>

                    {/* Care Guide Accordion */}
                    <div className="care-accordion">
                        <CareItem
                            icon="🚿"
                            title="Watering"
                            content={product.careTips?.watering || 'Water once a week'}
                        />
                        <CareItem
                            icon="☀️"
                            title="Sunlight"
                            content={product.careTips?.sunlight || 'Needs direct sunlight'}
                        />
                        <CareItem
                            icon="🐾"
                            title="Pet Friendliness"
                            content="Keep out of pet reach (Generic info)"
                        />
                        <CareItem
                            icon="🌱"
                            title="Difficulty"
                            content="Beginner friendly (Generic info)"
                        />
                    </div>

                    {/* Desktop Actions (Hidden on Mobile) */}
                    <div className="product-actions desktop-only">
                        <div className="quantity-selector">
                            <button className="qty-btn" onClick={() => handleQuantityChange('dec')}>-</button>
                            <input type="text" className="qty-input" value={quantity} readOnly />
                            <button className="qty-btn" onClick={() => handleQuantityChange('inc')}>+</button>
                        </div>
                        <div className="desktop-action-buttons">
                            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                ADD TO CART
                            </button>
                            <button className="buy-now-btn" onClick={handleBuyNow}>
                                BUY NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Bar for Mobile */}
            <div className="sticky-bottom-bar mobile-only">
                <div className="sticky-price">
                    <span className="sticky-current">₹{product.price}</span>
                    {product.originalPrice > product.price && <span className="sticky-original">₹{product.originalPrice}</span>}
                </div>
                <button className="sticky-add-btn" onClick={handleAddToCart}>
                    ADD TO CART
                </button>
            </div>
        </div>
    );
};

// Helper Component for Accordion Item
const CareItem = ({ icon, title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="care-accordion-item">
            <button className="care-header" onClick={() => setIsOpen(!isOpen)}>
                <div className="care-header-left">
                    <span className="care-icon">{icon}</span>
                    <span className="care-title">{title}</span>
                </div>
                <span className={`care-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            {isOpen && <div className="care-body">{content}</div>}
        </div>
    );
};

export default ProductPage;

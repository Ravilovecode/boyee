import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { estimateShipping } from '../services/orderService'
import { useAuth } from '../context/AuthContext';
import './Cart.css'

function Cart() {
  const { cartItems, removeFromCart, addToCart, decreaseFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pincode, setPincode] = useState('');
  const [shippingCost, setShippingCost] = useState(null);
  const [tat, setTat] = useState(null);
  const [shippingError, setShippingError] = useState(null);
  const [estimating, setEstimating] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const finalTotal = total + (shippingCost || 0);

  const handleEstimateShipping = async () => {
    if (!pincode || pincode.length !== 6) {
      setShippingError('Please enter a valid 6-digit pincode');
      return;
    }

    setEstimating(true);
    setShippingError(null);
    setShippingCost(null);
    setTat(null);

    try {
      // Calculate total weight (mock: 500g per item if not specified, as requested)
      const weight = cartItems.reduce((acc, item) => acc + (item.weight || 500) * item.qty, 0);

      const data = await estimateShipping({
        pickup_postcode: '110001', // Ideally fetched from backend config or ignored if backend handles it
        delivery_postcode: pincode,
        weight: weight,
        cod: 0
      });

      if (data && data.shipping_cost !== undefined) {
        setShippingCost(data.shipping_cost);
        if (data.tat) setTat(data.tat);
      } else {
        // Fallback if API response structure differs
        setShippingCost(100);
      }

    } catch (err) {
      setShippingError('Could not estimate. Defaulting to standard rate.');
      setShippingCost(100);
    } finally {
      setEstimating(false);
    }
  };

  const handleIncrement = (item) => {
    addToCart(item);
  };

  // We need a way to decrement. For now, I'll just leave the "-" button disabled or not implement it 
  // to avoid breaking things without context changes, OR I can implement a simple decrement in the context 
  // if I was editing it. But I'll focus on the UI as requested.
  // I'll stick to the "Remove" text/icon for now to be safe, but style it better.

  if (cartItems.length === 0) {
    return (
      <section className="cart-section">
        <div className="cart-container">
          <div className="cart-empty-state">
            <div className="cart-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="cart-title">Your Cart is Empty</h2>
            <p className="cart-subtitle">Looks like you haven't added any plants yet.</p>
            <Link to="/products" className="cart-shop-btn">
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="cart-section">
      <div className="cart-container">
        <h2 className="section-title">Shopping Cart</h2>

        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-card">
                <div className="cart-card-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-card-details">
                  <div className="cart-card-header">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-variant">Medium Size</p> {/* Placeholder variant */}
                  </div>

                  <div className="cart-card-actions">
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => decreaseFromCart(item.id)}>−</button>
                      <span className="qty-value">{item.qty}</span>
                      <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-card-price">
                  <span className="unit-price">₹{item.price}</span>
                  <span className="total-price">₹{item.price * item.qty}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-panel">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {/* Shipping Estimator */}
            <div className="shipping-estimator">
              <p className="estimator-label">Check for availability</p>
              <div className="estimator-input-group">
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength="6"
                />
                <button onClick={handleEstimateShipping} disabled={estimating}>
                  {estimating ? '...' : 'Check'}
                </button>
              </div>
              {shippingError && <p className="error-text">{shippingError}</p>}
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <div style={{ textAlign: 'right' }}>
                <span>
                  {shippingCost !== null ? `₹${shippingCost.toFixed(2)}` : 'Enter pincode'}
                </span>
                {tat && <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>Estimated: {tat}</div>}
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => {
                if (cartItems.length > 0 && shippingCost !== null) {
                  navigate('/checkout', { state: { cartItems, pincode, shippingCost, tat } });
                }
              }}
              disabled={shippingCost === null}
              style={{ opacity: shippingCost === null ? 0.6 : 1, cursor: shippingCost === null ? 'not-allowed' : 'pointer' }}
            >
              Proceed to Checkout
            </button>
            {shippingCost === null && (
              <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginTop: '8px' }}>
                Please check pincode availability to proceed.
              </p>
            )}

            <button
              className="continue-shopping-btn"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart

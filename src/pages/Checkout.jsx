import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder, createRazorpayOrder, payOrder, estimateShipping } from '../services/orderService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext'; // Import Notification
import Confetti from '../components/Confetti'; // Import Confetti
import Login from '../components/Login';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { cartItems: contextCartItems } = useCart();

    // Check if coming from "Buy Now" flow via query param
    const searchParams = new URLSearchParams(location.search);
    const isBuyNow = searchParams.get('source') === 'buynow';

    const cartItems = useMemo(() => {
        if (isBuyNow) {
            try {
                const storedBuyNow = localStorage.getItem('boyeeBuyNowItem');
                return storedBuyNow ? JSON.parse(storedBuyNow) : [];
            } catch (e) {
                console.error("Failed to load buy now item", e);
                return [];
            }
        } else {
            return location.state?.cartItems || contextCartItems;
        }
    }, [isBuyNow, location.state, contextCartItems]);

    const [name, setName] = useState(user?.name || '');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState(location.state?.pincode || '');
    const [country, setCountry] = useState('India');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [landmark, setLandmark] = useState('');

    const [shippingPrice, setShippingPrice] = useState(location.state?.shippingCost || 0);
    const [taxPrice, setTaxPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemsPrice, setItemsPrice] = useState(0);
    const [tat, setTat] = useState(location.state?.tat || null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false); // Confetti state
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('select'); // 'select', 'login', 'signup'
    const { showNotification } = useNotification(); // Notification hook


    useEffect(() => {
        // Calculate items price
        const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        setItemsPrice(itemsTotal);

        // Basic tax generic calculation (e.g. 18% GST) - adjust as needed
        const tax = itemsTotal * 0.18;
        setTaxPrice(tax);

        // Initial total with shipping if available
        setTotalPrice(itemsTotal + tax + (location.state?.shippingCost || 0));

    }, [cartItems, location.state]);


    const handleShippingEstimate = async (pincodeOverride) => {
        const pin = typeof pincodeOverride === 'string' ? pincodeOverride : postalCode;

        if (!pin || pin.length < 6) {
            // Don't show error while typing, just return or clear
            // But if called explicitly (blur), maybe show error?
            // For now, if length is not sufficient, do nothing or clear shipping
            return;
        }

        try {
            // Using product weight if available, else default to 500gm
            const weight = cartItems.reduce((acc, item) => acc + (item.weight || 500) * item.qty, 0);

            const data = await estimateShipping({
                pickup_postcode: '110001', // Example warehouse pincode
                delivery_postcode: pin,
                weight: weight,
                cod: 0
            });

            setShippingPrice(data.shipping_cost || 0);
            setTotalPrice(itemsPrice + taxPrice + (data.shipping_cost || 0));
            setTat(data.tat); // Set TAT
            setError(null);
        } catch (err) {
            console.error("Shipping estimate failed:", err);
            setError('Could not estimate shipping. Please check pincode.');
            // Removed default defaulting to 100 as per user request
            setShippingPrice(0);
            // setTotalPrice(itemsPrice + taxPrice + 0); // Optional: reset total or leave as is? Better to recalculate without shipping.
            setTotalPrice(itemsPrice + taxPrice);
        }
    };

    const handlePayment = async () => {
        if (!name || !address || !city || !postalCode || !country || !phoneNumber) {
            setError('Please fill in all shipping details including phone number');
            return;
        }

        if (phoneNumber.length < 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        if (!user) {
            setAuthMode('select');
            setShowAuthModal(true);
            return;
        }

        setLoading(true);

        try {
            // 1. Create Order in Backend (Pending Payment)
            const orderData = {
                orderItems: cartItems.map(item => ({
                    ...item,
                    product: item._id || item.id, // Ensure product ID is mapped to 'product'
                    _id: undefined, // Remove _id if it was there to avoid confusion? Or just keep it.
                })),
                shippingAddress: {
                    fullName: name,
                    address,
                    city,
                    postalCode,
                    country,
                    phoneNumber,
                    landmark
                },
                paymentMethod: 'Razorpay',
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            };

            // 2. Create Razorpay Order
            const razorpayOrder = await createRazorpayOrder(totalPrice);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use Environment Variable
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: "Boyee Plants",
                description: "Purchase Order",
                order_id: razorpayOrder.id,
                handler: async function (response) {
                    try {
                        // 3. Verify and Save Order on Success
                        const finalOrder = await createOrder({
                            ...orderData,
                            paymentResult: {
                                id: response.razorpay_payment_id,
                                status: 'COMPLETED',
                                update_time: new Date().toISOString(),
                                email_address: user.email
                            },
                            isPaid: true,
                            paidAt: new Date().toISOString()

                        });

                        console.log("PAYMENT SUCESS: Handler called");
                        setLoading(false);
                        setShowConfetti(true);
                        console.log("Confetti state set to true");

                        // Delay redirect to show animation
                        setTimeout(() => {
                            navigate('/myorders');
                        }, 4000);
                    } catch (err) {
                        setError('Payment success but failed to create order: ' + err.message);
                        setLoading(false);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: "9999999999" // TODO: Add contact to user model or input
                },
                theme: {
                    color: "#3399cc"
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

            rzp1.on('payment.failed', function (response) {
                setError('Payment Failed: ' + response.error.description);
                setLoading(false);
            });


        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    const toggleSummary = () => {
        setIsSummaryOpen(!isSummaryOpen);
    };

    // Removed early return to prevent blank page on refresh
    // if (cartItems.length === 0) { ... }

    return (
        <section className="checkout-section">
            {showConfetti && (
                <div className="order-success-overlay">
                    <Confetti />
                    <div className="success-content">
                        <div className="success-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 11.08V12A10 10 0 1 1 15.93 6" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 4L12 14.01L9 11.01" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2>Congratulations!</h2>
                        <p>Your order has been placed successfully.</p>
                        <p className="redirect-text">Redirecting to your orders...</p>
                    </div>
                </div>
            )}

            {showAuthModal && (
                <div className="auth-modal-overlay">
                    <div className="auth-modal-content">
                        <button className="auth-modal-close" onClick={() => setShowAuthModal(false)}>×</button>

                        {authMode === 'select' ? (
                            <div className="auth-selection-container">
                                <h3>Please Log In to Continue</h3>
                                <p>You need an account to complete your purchase and track you order.</p>
                                <div className="auth-selection-buttons">
                                    <button
                                        className="auth-select-btn login"
                                        onClick={() => setAuthMode('login')}
                                    >
                                        Log In
                                    </button>
                                    <button
                                        className="auth-select-btn signup"
                                        onClick={() => setAuthMode('signup')}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Login
                                initialIsLogin={authMode === 'login'}
                                isModal={true}
                                onSuccess={() => setShowAuthModal(false)}
                            />
                        )}
                    </div>
                </div>
            )}

            <div className="checkout-container">
                <h2 className="checkout-title">Checkout</h2>
                {error && <div className="error-message">{error}</div>}

                <div className="checkout-grid">
                    <div className="shipping-form">
                        <h3>Shipping Address</h3>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Postal Code</label>
                            <input
                                type="text"
                                value={postalCode}
                                onChange={(e) => {
                                    setPostalCode(e.target.value);
                                    if (e.target.value.length === 6) {
                                        handleShippingEstimate(e.target.value);
                                    }
                                }}
                                onBlur={() => handleShippingEstimate()} // Estimate on blur
                            />
                            <small>Enter postal code to estimate shipping</small>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="10-digit mobile number"
                                maxLength="10"
                            />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Landmark (Optional)</label>
                            <input
                                type="text"
                                value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                                placeholder="Near park, behind temple, etc."
                            />
                        </div>
                    </div>

                    <div className="order-summary-container">
                        <div className="order-summary-header" onClick={toggleSummary}>
                            <div className="header-left">
                                <span className="summary-label">
                                    {isSummaryOpen ? 'Hide order summary' : 'Show order summary'}
                                    <span className={`summary-chevron ${isSummaryOpen ? 'open' : ''}`}>▼</span>
                                </span>
                                {!isSummaryOpen && (
                                    <span className="header-total">₹{totalPrice.toFixed(2)}</span>
                                )}
                            </div>
                        </div>

                        {isSummaryOpen && (
                            <div className="order-summary-content">
                                {/* Items List */}
                                <div className="summary-items-list">
                                    {cartItems.map((item) => (
                                        <div key={item.id || item._id} className="summary-item">
                                            <div className="item-image-badge">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="item-info">
                                                <p className="item-name">{item.name}</p>
                                                <p className="item-variant">{item.variant || 'Standard'}</p>
                                            </div>
                                            <div className="item-price">₹{(item.price * item.qty).toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Login Banner for Guest */}
                                {!user && (
                                    <div className="login-banner">
                                        <div className="login-banner-content">
                                            <div className="login-banner-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" /></svg>
                                            </div>
                                            <div className="login-banner-text">
                                                <p>Login to view and apply rewards</p>
                                            </div>
                                        </div>
                                        <button className="login-banner-btn" onClick={() => navigate('/login', { state: { from: '/checkout' } })}>Login</button>
                                    </div>
                                )}

                                <div className="summary-divider"></div>

                                <div className="summary-totals">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>₹{itemsPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Shipping</span>
                                        <div style={{ textAlign: 'right' }}>
                                            {shippingPrice > 0 ? (
                                                <span>₹{shippingPrice.toFixed(2)}</span>
                                            ) : (
                                                <span className="enter-shipping-text">Enter shipping address</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="summary-divider"></div>

                                <div className="summary-row total" style={{ alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Total</span>
                                    <div className="total-right">
                                        <span className="currency-code">INR</span>
                                        <span className="final-price">₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div style={{ padding: '0 24px 24px 24px' }}>
                            <button
                                className="pay-now-btn"
                                onClick={handlePayment}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Pay now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;

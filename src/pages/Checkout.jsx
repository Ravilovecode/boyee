import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder, createRazorpayOrder, payOrder, estimateShipping } from '../services/orderService';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext'; // Import Notification
import Confetti from '../components/Confetti'; // Import Confetti
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    // Check if cartItems are passed via state, otherwise redirect or fetch from context/storage
    const [cartItems] = useState(location.state?.cartItems || []);

    const [name, setName] = useState(user?.name || '');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('India');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [landmark, setLandmark] = useState('');

    const [shippingPrice, setShippingPrice] = useState(0);
    const [taxPrice, setTaxPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemsPrice, setItemsPrice] = useState(0);
    const [tat, setTat] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false); // Confetti state
    const { showNotification } = useNotification(); // Notification hook


    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Calculate items price
        const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        setItemsPrice(itemsTotal);

        // Basic tax generic calculation (e.g. 18% GST) - adjust as needed
        const tax = itemsTotal * 0.18;
        setTaxPrice(tax);

        // Initial total without shipping
        setTotalPrice(itemsTotal + tax);

    }, [cartItems, user, navigate]);


    const handleShippingEstimate = async () => {
        if (!postalCode) {
            setError('Please enter postal code for shipping estimate');
            return;
        }

        try {
            // Using product weight if available, else default to 500gm
            const weight = cartItems.reduce((acc, item) => acc + (item.weight || 500) * item.qty, 0);

            const data = await estimateShipping({
                pickup_postcode: '110001', // Example warehouse pincode
                delivery_postcode: postalCode,
                weight: weight,
                cod: 0
            });

            setShippingPrice(data.shipping_cost || 0);
            setTotalPrice(itemsPrice + taxPrice + (data.shipping_cost || 0));
            setTat(data.tat); // Set TAT
            setError(null);
        } catch (err) {
            setError('Could not estimate shipping. Defaulting to flat rate.');
            setShippingPrice(100);
            setTotalPrice(itemsPrice + taxPrice + 100);
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

    if (cartItems.length === 0) {
        return <div className="container" style={{ padding: '120px 20px', textAlign: 'center' }}>Your cart is empty. <button onClick={() => navigate('/products')} style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}>Go Shopping</button></div>
    }

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
                                onChange={(e) => setPostalCode(e.target.value)}
                                onBlur={handleShippingEstimate} // Estimate on blur
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

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Items:</span>
                            <span>₹{itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>₹{taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <div style={{ textAlign: 'right' }}>
                                <span>₹{shippingPrice.toFixed(2)}</span>
                                {tat && <div style={{ fontSize: '0.8rem', color: '#666' }}>({tat})</div>}
                            </div>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>

                        <button
                            className="place-order-btn"
                            onClick={handlePayment}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;

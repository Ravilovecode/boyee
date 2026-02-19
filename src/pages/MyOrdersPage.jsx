import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyOrders } from '../services/orderService';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import './MyOrdersPage.css';

const MyOrdersPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data);
            } catch (err) {
                setError(err.message || 'Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) return <Loader />;

    // Guest View
    if (!user) {
        return (
            <section className="my-orders-section guest-view">
                <div className="container">
                    <div className="guest-orders-container">
                        <div className="guest-icon">📦</div>
                        <h2>Track Your Orders</h2>
                        <p>You have not logged in. Please login or signup if you are a new user to view your orders and exciting offers.</p>
                        <div className="guest-actions">
                            <button
                                className="login-btn"
                                onClick={() => navigate('/login', { state: { from: '/myorders' } })}
                            >
                                Log In
                            </button>
                            <button
                                className="signup-btn"
                                onClick={() => navigate('/login', { state: { showSignup: true, from: '/myorders' } })}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) return <div className="error-container">{error}</div>;

    return (
        <section className="my-orders-section">
            <div className="container">
                <h2>My Orders</h2>
                {orders.length === 0 ? (
                    <div className="empty-orders">
                        <p>You haven't placed any orders yet.</p>
                        <Link to="/products" className="shop-now-btn">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <Link key={order._id} to={`/order/${order._id}`} className="order-card">
                                <div className="order-card-content">
                                    <div className="order-image-column">
                                        {order.orderItems.length > 0 && (
                                            <div className="main-order-image">
                                                <img
                                                    src={order.orderItems[0].image}
                                                    alt={order.orderItems[0].name}
                                                />
                                                {order.orderItems.length > 1 && (
                                                    <span className="image-overlay">+{order.orderItems.length - 1}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="order-details-column">
                                        <div className="order-primary-info">
                                            <div className="order-status-row">
                                                <span className={`status-text ${order.isDelivered ? 'delivered' : 'processing'}`}>
                                                    {order.isDelivered ? 'Delivered' : 'Processing'}
                                                </span>
                                                <span className="order-date">On {new Date(order.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="product-names">
                                                {order.orderItems.map(item => item.name).join(', ')}
                                            </h3>
                                            <div className="order-meta-row">
                                                <span className="order-rating">★★★★☆</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-right-column">
                                        <span className="order-right-price">₹{order.totalPrice.toFixed(0)}</span>
                                        <span className="order-right-qty">
                                            {order.orderItems.reduce((sum, item) => sum + item.qty, 0)} item{order.orderItems.reduce((sum, item) => sum + item.qty, 0) !== 1 ? 's' : ''}
                                        </span>
                                        <span className="order-chevron">›</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyOrdersPage;

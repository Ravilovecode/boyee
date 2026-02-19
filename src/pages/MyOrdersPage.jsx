import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../services/orderService';
import Loader from '../components/Loader';
import './MyOrdersPage.css';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    }, []);

    if (loading) return <Loader />;
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
                            <div key={order._id} className="order-card">
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
                                                <span className="order-rating">★★★★☆</span> {/* Placeholder for rating */}
                                            </div>
                                            <div className="order-price-row">
                                                <span className="currency">₹</span>
                                                <span className="price">{order.totalPrice.toFixed(0)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-actions-row">
                                    {/* View details could go here or be a full clickable card */}
                                    <Link to={`/order/${order._id}`} className="view-details-link">View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyOrdersPage;

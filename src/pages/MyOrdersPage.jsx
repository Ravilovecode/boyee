import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../services/orderService';
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

    if (loading) return <div className="loading-container">Loading your orders...</div>;
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
                                <div className="order-header">
                                    <div>
                                        <span className="order-id">Order ID: {order._id}</span>
                                        <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <Link to={`/order/${order._id}`} className="view-details-btn">View Details</Link>
                                </div>
                                <div className="order-body">
                                    <div className="order-info">
                                        <p>Total: <strong>₹{order.totalPrice.toFixed(2)}</strong></p>
                                        <p>Items: {order.orderItems.length}</p>
                                    </div>
                                    <div className="order-status">
                                        <span className={`status-badge ${order.isPaid ? 'paid' : 'unpaid'}`}>
                                            {order.isPaid ? 'Paid' : 'Not Paid'}
                                        </span>
                                        <span className={`status-badge ${order.isDelivered ? 'delivered' : 'processing'}`}>
                                            {order.isDelivered ? 'Delivered' : 'Processing'}
                                        </span>
                                    </div>
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

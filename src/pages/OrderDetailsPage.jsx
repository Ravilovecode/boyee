import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../services/orderService';
import Loader from '../components/Loader';
import './OrderDetailsPage.css';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            console.log('Fetching order details for ID:', id);
            try {
                const data = await getOrderById(id);
                console.log('Order data received:', data);
                console.log('Shipping Address:', data.shippingAddress);
                setOrder(data);
            } catch (err) {
                console.error('Error fetching order:', err);
                setError(err.message || 'Failed to load order');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchOrder();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div className="error-container">{error}</div>;
    if (!order) return <div className="error-container">Order not found</div>;

    const formatDate = (dateString) => {
        try {
            return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
        } catch (e) {
            return 'Invalid Date';
        }
    };

    return (
        <section className="order-details-section">
            <div className="order-container">
                <div className="order-header">
                    <h2>Order Details</h2>
                    <p className="order-id">Order ID: {order?._id}</p>
                    <p className="order-date">Placed on: {formatDate(order?.createdAt)}</p>
                </div>

                <div className="order-grid">
                    <div className="order-items-column">
                        <h3>Items</h3>
                        <div className="order-items-list">
                            {order?.orderItems?.length > 0 ? (
                                order.orderItems.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <div className="item-image">
                                            <img
                                                src={item.image || '/placeholder-plant.png'}
                                                alt={item.name || 'Product'}
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=No+Image' }}
                                            />
                                        </div>
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <p>Qty: {item.qty}</p>
                                            <p>Price: ₹{item.price}</p>
                                        </div>
                                        <div className="item-total">
                                            ₹{(item.price * item.qty).toFixed(2)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No items found in this order.</p>
                            )}
                        </div>
                    </div>

                    <div className="order-summary-column">
                        <div className="shipping-info-card">
                            <h3>Shipping Address</h3>
                            {order?.shippingAddress ? (
                                <>
                                    <p><strong>{order.shippingAddress.fullName || 'N/A'}</strong></p>
                                    <p>{order.shippingAddress.address || ''}</p>
                                    {order.shippingAddress.landmark && <p>Landmark: {order.shippingAddress.landmark}</p>}
                                    <p>
                                        {order.shippingAddress.city || ''}
                                        {order.shippingAddress.postalCode ? `, ${order.shippingAddress.postalCode}` : ''}
                                    </p>
                                    <p>{order.shippingAddress.country || ''}</p>
                                    <p>Phone: {order.shippingAddress.phoneNumber || 'N/A'}</p>
                                </>
                            ) : (
                                <p>Shipping address not available</p>
                            )}
                        </div>

                        <div className="payment-info-card">
                            <h3>Payment Status</h3>
                            <p>Method: {order?.paymentMethod || 'N/A'}</p>
                            <div className={`status-badge ${order?.isPaid ? 'paid' : 'unpaid'}`}>
                                {order?.isPaid ? `Paid on ${formatDate(order.paidAt)}` : 'Not Paid'}
                            </div>
                        </div>

                        <div className="delivery-info-card">
                            <h3>Delivery Status</h3>
                            <div className={`status-badge ${order?.isDelivered ? 'delivered'
                                    : order?.isShipped ? 'shipped'
                                        : 'processing'
                                }`}>
                                {order?.isDelivered
                                    ? `Delivered on ${formatDate(order.deliveredAt)}`
                                    : order?.isShipped
                                        ? `Shipped on ${formatDate(order.shippedAt)}`
                                        : 'Processing'
                                }
                            </div>
                            {!order?.isDelivered && !order?.isShipped && <p className="tat-note">Estimated Delivery: 5-7 Days</p>}
                            {order?.isShipped && !order?.isDelivered && <p className="tat-note">Your order is on the way!</p>}
                        </div>

                        <div className="cost-summary-card">
                            <h3>Order Summary</h3>
                            <div className="summary-row"><span>Items</span><span>₹{(order?.itemsPrice || 0).toFixed(2)}</span></div>
                            <div className="summary-row"><span>Shipping</span><span>₹{(order?.shippingPrice || 0).toFixed(2)}</span></div>
                            <div className="summary-row"><span>Tax</span><span>₹{(order?.taxPrice || 0).toFixed(2)}</span></div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total"><span>Total</span><span>₹{(order?.totalPrice || 0).toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>

                <div className="back-to-shop">
                    <Link to="/products" className="continue-btn">Continue Shopping</Link>
                </div>
            </div>
        </section>
    );
};

export default OrderDetailsPage;

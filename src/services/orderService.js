const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('boyeeUser'));
    return {
        'Content-Type': 'application/json',
        'Authorization': user ? `Bearer ${user.token}` : ''
    };
};

export const createOrder = async (order) => {
    const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
};

export const getOrderById = async (id) => {
    const user = JSON.parse(localStorage.getItem('boyeeUser')); // Ensure token is fresh
    const res = await fetch(`${API_URL}/api/orders/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': user ? `Bearer ${user.token}` : ''
        },
    });
    if (!res.ok) throw new Error('Failed to get order details');
    return res.json();
};

export const getMyOrders = async () => {
    const user = JSON.parse(localStorage.getItem('boyeeUser'));
    const res = await fetch(`${API_URL}/api/orders/myorders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': user ? `Bearer ${user.token}` : ''
        },
    });
    if (!res.ok) throw new Error('Failed to fetch your orders');
    return res.json();
};

export const payOrder = async (orderId, paymentResult) => {
    const res = await fetch(`${API_URL}/api/orders/${orderId}/pay`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(paymentResult),
    });
    if (!res.ok) throw new Error('Failed to pay order');
    return res.json();
};

export const createRazorpayOrder = async (amount) => {
    const res = await fetch(`${API_URL}/api/orders/razorpay`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ amount }),
    });
    if (!res.ok) throw new Error('Failed to create Razorpay order');
    return res.json();
};

export const estimateShipping = async (shippingData) => {
    const res = await fetch(`${API_URL}/api/orders/shipping/estimate`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(shippingData),
    });
    if (!res.ok) throw new Error('Failed to estimate shipping');
    return res.json();
};

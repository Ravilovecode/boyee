import React, { createContext, useContext, useState, useCallback } from 'react';
import './NotificationContext.css'; // We'll create this CSS next

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message, type = 'success') => {
        setNotification({ message, type });
        // Auto-hide after 3 seconds
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }, []);

    const closeNotification = () => {
        setNotification(null);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && (
                <div className={`notification-toast ${notification.type}`}>
                    <div className="notification-content">
                        {(notification.type === 'success' || notification.type === 'glass') && (
                            <span className="notification-icon">
                                {notification.type === 'glass' ? '🛍️' : '✓'}
                            </span>
                        )}
                        <span className="notification-message">{notification.message}</span>
                    </div>
                    <button className="notification-close" onClick={closeNotification}>×</button>
                </div>
            )}
        </NotificationContext.Provider>
    );
};

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('boyeeCart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('boyeeCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, qty: 1 }];
            }
        });
    };

    const decreaseFromCart = (id) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === id);
            if (existingItem.qty === 1) {
                // If qty is 1, do nothing or remove? 
                // Requirement says "make multiple quantity same order", implies adjusting.
                // Usually '-' on 1 doesn't remove unless explicit, but let's just keep it at 1
                // and let user use "Remove" button for deletion to be safe/clear.
                // OR: commonly it removes. Let's make it remove for better UX if they keep clicking.
                // Actually user said "option for + and - ... so that user can make multiple quantity".
                // Let's allow it to go down to 1.
                return prevItems;
            }
            return prevItems.map((item) =>
                item.id === id ? { ...item, qty: item.qty - 1 } : item
            );
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, decreaseFromCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

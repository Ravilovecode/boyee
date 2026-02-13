import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // On mount, restore user from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('boyeeUser');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem('boyeeUser');
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('boyeeUser', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('boyeeUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

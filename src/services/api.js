const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data;
};

export const registerUser = async (name, email, password) => {
    const res = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    return data;
};

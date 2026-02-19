const API_URL = import.meta.env.VITE_API_URL;

// Error code → user-friendly English message mapping
const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'The email or password you entered is incorrect. Please try again.',
    USER_ALREADY_EXISTS: 'An account with this email already exists. Please login instead.',
    INVALID_USER_DATA: 'Please check your information and try again.',
    USER_NOT_FOUND: 'no account with this email please signup for new account',
    WRONG_PASSWORD: 'password is wrong please enter correct password',
    UNKNOWN_ERROR: 'Something went wrong. Please try again later.',
};

const getErrorMessage = (errorCode, fallback) => {
    return ERROR_MESSAGES[errorCode] || fallback || ERROR_MESSAGES.UNKNOWN_ERROR;
};

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    let data;
    try {
        data = await res.json();
    } catch {
        throw new Error('Something went wrong. Please try again later.');
    }

    if (!res.ok) {
        throw new Error(getErrorMessage(data.errorCode, data.message));
    }

    return data;
};

export const registerUser = async (name, email, password) => {
    const res = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    let data;
    try {
        data = await res.json();
    } catch {
        throw new Error('Something went wrong. Please try again later.');
    }

    if (!res.ok) {
        throw new Error(getErrorMessage(data.errorCode, data.message));
    }

    return data;
};

export const sendOtpApi = async (email, type = 'signup') => {
    const res = await fetch(`${API_URL}/api/users/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type }),
    });

    let data;
    try {
        data = await res.json();
    } catch {
        throw new Error('Something went wrong. Please try again later.');
    }

    if (!res.ok) {
        throw new Error(getErrorMessage(data.errorCode, data.message));
    }

    return data;
};

export const verifyOtpApi = async (email, otp) => {
    const res = await fetch(`${API_URL}/api/users/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
    });

    let data;
    try {
        data = await res.json();
    } catch {
        throw new Error('Something went wrong. Please try again later.');
    }

    if (!res.ok) {
        throw new Error(getErrorMessage(data.errorCode, data.message));
    }

    return data;
};

export const resetPasswordApi = async (email, otp, newPassword) => {
    const res = await fetch(`${API_URL}/api/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
    });

    let data;
    try {
        data = await res.json();
    } catch {
        throw new Error('Something went wrong. Please try again later.');
    }

    if (!res.ok) {
        throw new Error(getErrorMessage(data.errorCode, data.message));
    }

    return data;
};

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null
    });

    useEffect(() => {
        // Check if user is already logged in (you can use a token in localStorage)
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/check-auth', { withCredentials: true });
                setAuthState({ isAuthenticated: true, user: response.data.user });
            } catch (error) {
                setAuthState({ isAuthenticated: false, user: null });
            }
        };
        checkAuth();
    }, []);

    const login = (user) => {
        setAuthState({ isAuthenticated: true, user });
    };

    const logout = async () => {
        await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
        setAuthState({ isAuthenticated: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
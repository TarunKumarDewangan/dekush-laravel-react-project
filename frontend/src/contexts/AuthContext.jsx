// frontend/src/contexts/AuthContext.jsx

import { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/api';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // This effect runs once on component mount to fetch user data if a token exists
    useEffect(() => {
        if (token) {
            // Set the token for all future Axios requests
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Fetch the user data
            apiClient.get('/user')
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    // If the token is invalid, clear it
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                });
        }
    }, [token]);

    const login = async (email, password) => {
        const response = await apiClient.post('/login', { email, password });
        const { token: newToken, user: newUser } = response.data;

        // Store the token and user data
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = async () => {
        try {
            await apiClient.post('/logout');
        } catch (error) {
            console.error('Logout failed, but clearing session locally.', error);
        } finally {
            // Always clear local state and storage
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            delete apiClient.defaults.headers.common['Authorization'];
        }
    };

    const authContextValue = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};

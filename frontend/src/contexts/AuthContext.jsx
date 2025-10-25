// In frontend/src/contexts/AuthContext.jsx (REPLACE ENTIRE FILE)

import { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            apiClient.get('/user')
                .then(response => setUser(response.data))
                .catch(() => {
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (loginIdentifier, password) => {
        const response = await apiClient.post('/login', { login_identifier: loginIdentifier, password });
        const { token: newToken, user: newUser } = response.data;
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
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            delete apiClient.defaults.headers.common['Authorization'];
        }
    };

    // --- THIS IS THE NEW FUNCTION ---
    // It allows any component to update the global user state.
    const updateUserContext = (newUserData) => {
        setUser(newUserData);
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
        updateUserContext, // <-- EXPOSE THE NEW FUNCTION
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

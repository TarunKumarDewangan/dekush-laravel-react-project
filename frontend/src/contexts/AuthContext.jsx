// frontend/src/contexts/AuthContext.jsx

import { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/api';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // --- ADD THIS LINE ---
    const [loading, setLoading] = useState(true); // Start as true

    // This effect runs once on component mount to fetch user data if a token exists
    useEffect(() => {
        // We set loading to true here again just in case, but it's mainly for the initial load.
        setLoading(true);

        if (token) {
            // Set the token for all future Axios requests
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Fetch the user data
            apiClient.get('/user') // Make sure this is '/api/user' if you have a prefix
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    // If the token is invalid, clear it
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                })
                .finally(() => {
                    // --- ADD THIS LINE ---
                    // No matter what happens, set loading to false when the check is complete.
                    setLoading(false);
                });
        } else {
            // --- ADD THIS LINE ---
            // If there's no token, we are not loading.
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        const response = await apiClient.post('/login', { email, password }); // Same here, '/api/login' if needed
        const { token: newToken, user: newUser } = response.data;

        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = async () => {
        try {
            await apiClient.post('/logout'); // '/api/logout'
        } catch (error) {
            console.error('Logout failed, but clearing session locally.', error);
        } finally {
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
        loading, // --- ADD THIS LINE --- Pass the loading state in the context value
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

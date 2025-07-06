// frontend/src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// This component checks for authentication and a specific role
function ProtectedRoute({ children, role }) {
    const { isAuthenticated, user } = useAuth();

    // 1. If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // 2. If a role is required and the user's role doesn't match, redirect to home
    // This prevents a regular 'user' from accessing a 'shopowner' dashboard
    if (role && user.role !== role) {
        return <Navigate to="/" />;
    }

    // 3. If everything is fine, render the requested component
    return children;
}

export default ProtectedRoute;

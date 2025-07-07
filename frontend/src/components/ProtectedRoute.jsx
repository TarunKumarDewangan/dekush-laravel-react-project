// frontend/src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from 'react-bootstrap'; // Import the spinner

function ProtectedRoute({ children, role }) {
    // We now get the 'loading' state from our AuthContext
    const { isAuthenticated, user, loading } = useAuth();

    // 1. NEW: If the authentication status is still being determined, show a loading screen.
    // This is the most important fix. It prevents the component from proceeding
    // with a null 'user' object.
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Spinner animation="border" />
            </div>
        );
    }

    // 2. If loading is finished and the user is NOT authenticated, redirect to login.
    // This check is now safe because we know 'loading' is false.
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // 3. If a role is required, check if the user's role matches.
    // This check is also safe now, because if isAuthenticated is true, 'user' must be an object.
    if (role && user.role !== role) {
        // You could redirect to an "Unauthorized" page for a better user experience
        return <Navigate to="/" />;
    }

    // 4. If all checks pass, render the child component.
    return children;
}

export default ProtectedRoute;

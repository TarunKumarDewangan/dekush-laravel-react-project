// frontend/src/components/AdminRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AdminRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a spinner
    }

    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute;

// In frontend/src/pages/AdminDashboardPage.jsx (REPLACE ENTIRE FILE)

import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Badge, Alert } from 'react-bootstrap';
import api from '../services/api';
import EditUserModal from '../components/EditUserModal';
import CreateUserModal from '../components/CreateUserModal'; // <-- 1. IMPORT

const getRoleBadge = (role) => {
    const roleColors = {
        admin: 'success',
        shopowner: 'primary',
        user: 'secondary'
    };
    return <Badge bg={roleColors[role] || 'light'} text={roleColors[role] ? 'light' : 'dark'}>{role}</Badge>;
};

function AdminDashboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for modals
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false); // <-- 2. ADD STATE FOR CREATE MODAL

    const fetchUsers = () => {
        setLoading(true);
        setError('');
        api.get('/admin/users')
            .then(response => {
                setUsers(response.data.users);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setError(err.response?.data?.message || 'Could not load user data.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // --- Modal Handlers ---

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleUpdateSuccess = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setShowEditModal(false);
    };

    // 3. ADD HANDLER FOR SUCCESSFUL CREATION
    const handleUserCreated = (newUser) => {
        setUsers(currentUsers => [newUser, ...currentUsers]); // Add new user to the top of the list
        setShowCreateModal(false); // Close the modal
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action is permanent.')) {
            try {
                await api.delete(`/admin/users/${userId}`);
                setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
            } catch (err) {
                console.error('Failed to delete user', err);
                setError(err.response?.data?.message || 'Could not delete the user.');
            }
        }
    };

    if (loading) {
        return <div className="text-center"><Spinner animation="border" /></div>;
    }

    return (
        <>
            {/* 4. UPDATE HEADER WITH CREATE BUTTON */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                 <h1 className="mb-0">User Management</h1>
                 <Button variant="success" onClick={() => setShowCreateModal(true)}>
                     + Create New User
                 </Button>
            </div>

            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

            <Table striped bordered hover responsive variant="dark">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Has Shop?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{getRoleBadge(user.role)}</td>
                            <td>
                                {user.shops && user.shops.length > 0 ? `Yes (${user.shops[0].name})` : 'No'}
                            </td>
                            <td>
                                <Button variant="info" size="sm" className="me-2" onClick={() => handleEditClick(user)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* --- Render Modals --- */}
            {selectedUser && (
                <EditUserModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    user={selectedUser}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}

            {/* 5. RENDER THE CREATE MODAL */}
            <CreateUserModal
                show={showCreateModal}
                handleClose={() => setShowCreateModal(false)}
                onUserCreated={handleUserCreated}
            />
        </>
    );
}

export default AdminDashboardPage;

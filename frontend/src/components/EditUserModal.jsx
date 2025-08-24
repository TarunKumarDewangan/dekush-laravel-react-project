// In frontend/src/components/EditUserModal.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

function EditUserModal({ show, handleClose, user, onUpdateSuccess }) {
    // Add phone_number to our form state
    const [formData, setFormData] = useState({ name: '', email: '', phone_number: '', role: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pre-fill the form, including the new phone_number field
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone_number: user.phone_number || '',
                role: user.role || 'user',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await api.put(`/admin/users/${user.id}`, formData);
            onUpdateSuccess(response.data.user);
        } catch (err) {
            if (err.response?.data?.errors) {
                const messages = Object.values(err.response.data.errors).flat();
                setError(messages.join(' '));
            } else {
                setError(err.response?.data?.message || 'An error occurred.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User: {user?.name}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>

                    {/* --- THIS IS THE NEW PHONE NUMBER FIELD --- */}
                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            maxLength="10"
                            required
                        />
                    </Form.Group>
                    {/* --- END OF NEW FIELD --- */}

                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select name="role" value={formData.role} onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="shopowner">Shop Owner</option>
                            <option value="admin">Admin</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditUserModal;

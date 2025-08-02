import { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import apiClient from '../services/api';

function CreateUserModal({ show, handleClose, onUserCreated }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        role: 'user', // Default role
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await apiClient.post('/admin/users', formData);
            onUserCreated(response.data.user); // Pass the new user back to the parent
            handleClose(); // Close the modal on success
        } catch (err) {
            if (err.response?.data?.errors) {
                // Join all error messages from the backend into a single string
                setError(Object.values(err.response.data.errors).flat().join(' '));
            } else {
                setError(err.response?.data?.message || 'An error occurred while creating the user.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form when modal is fully closed
    const handleExited = () => {
        setFormData({
            name: '',
            email: '',
            phone_number: '',
            role: 'user',
            password: '',
            password_confirmation: '',
        });
        setError('');
    };

    return (
        <Modal show={show} onHide={handleClose} onExited={handleExited} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Create New User</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" name="phone_number" placeholder="10 digits" maxLength="10" value={formData.phone_number} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select name="role" value={formData.role} onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="shopowner">Shop Owner</option>
                            <option value="admin">Admin</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password (Min 8 characters)</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <><Spinner as="span" size="sm" /> Creating...</> : 'Create User'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateUserModal;

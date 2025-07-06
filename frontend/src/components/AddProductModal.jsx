// frontend/src/components/AddProductModal.jsx

import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import apiClient from '../services/api';

function AddProductModal({ show, handleClose, onProductAdded }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await apiClient.post('/products', {
                name,
                description,
                price,
            });
            onProductAdded(response.data); // Pass the new product back to the dashboard
            handleClose(); // Close the modal on success
            // Reset form fields
            setName('');
            setDescription('');
            setPrice('');
        } catch (err) {
            setError('Failed to add product. Please check your input.');
            console.error(err);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" type="submit" className="ms-2">Add Product</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddProductModal;

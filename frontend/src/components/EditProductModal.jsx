// frontend/src/components/EditProductModal.jsx

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import apiClient from '../services/api';

function EditProductModal({ show, handleClose, product, onProductUpdated }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    // When the 'product' prop changes, update the form fields
    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!product) return;

        try {
            const response = await apiClient.put(`/products/${product.id}`, {
                name,
                description,
                price,
            });
            onProductUpdated(response.data); // Pass the updated product back
            handleClose();
        } catch (err) {
            setError('Failed to update product. Please check your input.');
            console.error(err);
        }
    };

    if (!product) return null; // Don't render the modal if no product is selected

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product: {product.name}</Modal.Title>
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
                    <Button variant="primary" type="submit" className="ms-2">Save Changes</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditProductModal;

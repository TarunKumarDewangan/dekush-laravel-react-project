// In frontend/src/components/EditProductModal.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Image, Spinner } from 'react-bootstrap';
import apiClient from '../services/api';

function EditProductModal({ show, handleClose, product, onProductUpdated }) {
    // State for text fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    // State for image management
    const [currentImageUrl, setCurrentImageUrl] = useState(null); // The existing image
    const [newImageFile, setNewImageFile] = useState(null); // The newly selected file
    const [newImagePreview, setNewImagePreview] = useState(null); // Preview for the new file
    const [isImageMarkedForDeletion, setIsImageMarkedForDeletion] = useState(false); // Flag for deletion

    // UI State
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // This effect runs when the modal opens, populating the form with the product's data
    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setPrice(product.price || '');
            setCurrentImageUrl(product.image_path ? `${import.meta.env.VITE_BACKEND_URL}/storage/${product.image_path}` : null);

            // Reset image states for the new product being edited
            setNewImageFile(null);
            setNewImagePreview(null);
            setIsImageMarkedForDeletion(false);
            setError('');
        }
    }, [product]); // Rerun when a new product is passed in

    // Handler for when the user selects a new image file
    const handleNewImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImageFile(file);
            setNewImagePreview(URL.createObjectURL(file));
            // If user selects a new image, we assume they don't want to delete the old one without replacing it
            setIsImageMarkedForDeletion(false);
        }
    };

    // Handler for the "Remove Image" button
    const handleRemoveImage = () => {
        setCurrentImageUrl(null); // Visually remove the current image
        setNewImageFile(null); // Clear any newly selected file
        setNewImagePreview(null); // Clear the preview
        setIsImageMarkedForDeletion(true); // Set the flag to send to the backend
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);

    // formData.append('_method', 'PUT'); // <-- DELETE THIS LINE

    if (newImageFile) {
        formData.append('image', newImageFile);
    } else if (isImageMarkedForDeletion) {
        formData.append('delete_image', '1');
    }

    try {
        // This POST request will now correctly match the POST route in your API
        const response = await apiClient.post(`/products/${product.id}`, formData);
        onProductUpdated(response.data);
        handleClose();
    } catch (err) {
        // Now it's a good idea to get more specific errors
        if (err.response && err.response.data && err.response.data.errors) {
            setError(Object.values(err.response.data.errors).flat().join(' '));
        } else {
            setError('Failed to update product. Please check your input.');
        }
    } finally {
        setIsSubmitting(false);
    }
};

    if (!product) return null;

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Edit Product: {product.name}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* --- CURRENT IMAGE DISPLAY & REMOVE BUTTON --- */}
                    {currentImageUrl && !newImagePreview && (
                        <Form.Group className="mb-3 text-center">
                            <Form.Label>Current Image</Form.Label>
                            <div>
                                <Image src={currentImageUrl} thumbnail style={{ maxHeight: '150px' }} />
                            </div>
                            <Button variant="outline-danger" size="sm" className="mt-2" onClick={handleRemoveImage}>
                                Remove Image
                            </Button>
                        </Form.Group>
                    )}

                    {/* --- NEW IMAGE PREVIEW --- */}
                    {newImagePreview && (
                        <Form.Group className="mb-3 text-center">
                            <Form.Label>New Image Preview</Form.Label>
                            <div>
                                <Image src={newImagePreview} thumbnail style={{ maxHeight: '150px' }} />
                            </div>
                        </Form.Group>
                    )}

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
                    <Form.Group className="mb-3">
                        <Form.Label>{currentImageUrl ? 'Change Image' : 'Add Image'}</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleNewImageChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <><Spinner as="span" size="sm" /> Saving...</> : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditProductModal;

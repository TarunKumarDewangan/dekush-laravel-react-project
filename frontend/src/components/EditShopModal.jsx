// In frontend/src/components/EditShopModal.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner, Row, Col, Image } from 'react-bootstrap';
import apiClient from '../services/api';
import './EditShopModal.css'; // <-- 1. IMPORT THE NEW CSS FILE

const MAX_IMAGES = 4;

function EditShopModal({ show, handleClose, shop, onShopUpdated }) {
    // All your existing state is perfect
    const [formData, setFormData] = useState({ name: '', description: '', address: '', shop_incharge_phone: '' });
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // This useEffect populates the form and is also correct
    useEffect(() => {
        if (shop && show) {
            apiClient.get('/owner/categories/all')
                .then(response => {
                    const allCategories = response.data;
                    setMainCategories(allCategories);
                    setFormData({
                        name: shop.name || '',
                        description: shop.description || '',
                        address: shop.address || '',
                        shop_incharge_phone: shop.shop_incharge_phone || '',
                    });
                    setExistingImages(shop.images || []); // <-- This line loads the existing images into state

                    if (shop.category_id) {
                        const parentCategory = allCategories.find(cat => cat.children.some(child => child.id === shop.category_id));
                        if (parentCategory) {
                            setSelectedMainCategory(parentCategory.id);
                            setSubCategories(parentCategory.children);
                            setSelectedSubCategory(shop.category_id);
                        }
                    }
                })
                .catch(() => setError('Could not load category data.'));
        }
    }, [shop, show]);

    // --- 2. THIS IS THE FUNCTION FOR THE DELETE BUTTON ---
    // BEFORE THE FIX
// AFTER THE FIX
const handleDeleteExistingImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to permanently delete this image?')) return;

    try {
        await apiClient.delete(`/owner/shops/images/${imageId}`);
        setExistingImages(currentImages => currentImages.filter(img => img.id !== imageId));
        setError(''); // Clear any previous errors on success
    } catch (err) {
        // Set the error message to the specific one from the backend, or a fallback.
        const errorMessage = err.response?.data?.message || 'Failed to delete image. Please try again.';
        setError(errorMessage);
    }
};

    // All other handler functions (handleMainCategoryChange, handleNewImageChange, handleSubmit, handleExited) remain the same.
    const handleMainCategoryChange = (e) => {
        const mainCatId = e.target.value;
        setSelectedMainCategory(mainCatId);
        setSelectedSubCategory('');
        if (mainCatId) {
            const selectedCat = mainCategories.find(cat => cat.id === parseInt(mainCatId));
            setSubCategories(selectedCat ? selectedCat.children : []);
        } else {
            setSubCategories([]);
        }
    };

    const handleNewImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = existingImages.length + newImages.length + files.length;
        if (totalImages > MAX_IMAGES) {
            setError(`You can only have a maximum of ${MAX_IMAGES} images.`);
            return;
        }
        setNewImages(prev => [...prev, ...files]);
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviewUrls]);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        const uploadData = new FormData();
        uploadData.append('name', formData.name);
        uploadData.append('description', formData.description);
        uploadData.append('address', formData.address);
        uploadData.append('shop_incharge_phone', formData.shop_incharge_phone);
        uploadData.append('category_id', selectedSubCategory);
        newImages.forEach(file => {
            uploadData.append('images[]', file);
        });
        try {
            const response = await apiClient.post(`/owner/shops/${shop.id}`, uploadData);
            onShopUpdated(response.data);
            handleClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleExited = () => {
        //... this function is fine as is
        setError(''); setFormData({ name: '', description: '', address: '', shop_incharge_phone: '' }); setExistingImages([]); setNewImages([]); setPreviews([]); setMainCategories([]); setSubCategories([]); setSelectedMainCategory(''); setSelectedSubCategory('');
    };

    if (!shop) return null;

    const assetUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <Modal show={show} onHide={handleClose} onExited={handleExited} backdrop="static" centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Shop: {shop.name}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* --- 3. THIS IS THE NEW SECTION TO RENDER EXISTING IMAGES --- */}
                    {existingImages.length > 0 && (
                        <Form.Group className="mb-4">
                            <Form.Label>Current Images</Form.Label>
                            <Row>
                                {existingImages.map(img => (
                                    <Col xs={6} md={3} key={img.id} className="image-thumbnail-wrapper">
                                        <Image src={`${assetUrl}/storage/${img.image_path}`} thumbnail alt="Existing shop image" />
                                        <Button
                                            variant="danger"
                                            className="delete-image-btn"
                                            onClick={() => handleDeleteExistingImage(img.id)}
                                            title="Delete this image"
                                        >
                                            &times;
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        </Form.Group>
                    )}

                    {/* The rest of your form is perfect */}
                    <Row>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Main Category</Form.Label><Form.Select value={selectedMainCategory} onChange={handleMainCategoryChange} required><option value="">-- Select --</option>{mainCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}</Form.Select></Form.Group></Col>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Sub-Category</Form.Label><Form.Select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)} required disabled={!selectedMainCategory}><option value="">-- Select --</option>{subCategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}</Form.Select></Form.Group></Col>
                    </Row>
                    <Form.Group className="mb-3"><Form.Label>Shop Name</Form.Label><Form.Control type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required /></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Shop Address</Form.Label><Form.Control type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required /></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Shop In-Charge Mobile No.</Form.Label><Form.Control type="tel" value={formData.shop_incharge_phone} onChange={(e) => setFormData({...formData, shop_incharge_phone: e.target.value})} required maxLength="10" /></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Shop Description</Form.Label><Form.Control as="textarea" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} /></Form.Group>

                    {/* The uploader for new images */}
                    {(existingImages.length + newImages.length) < MAX_IMAGES && (
                         <Form.Group className="mb-3">
                            <Form.Label>Add More Images (up to {MAX_IMAGES - existingImages.length - newImages.length} more)</Form.Label>
                            <Form.Control type="file" accept="image/*" multiple onChange={handleNewImageChange} />
                        </Form.Group>
                    )}

                    {previews.length > 0 && (
                        <div className="mb-3"><p>New images to be uploaded:</p><Row>{previews.map((previewUrl, index) => <Col xs={6} md={3} key={index}><Image src={previewUrl} thumbnail alt="New image preview" /></Col>)}</Row></div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <><Spinner as="span" size="sm" /> Saving...</> : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditShopModal;

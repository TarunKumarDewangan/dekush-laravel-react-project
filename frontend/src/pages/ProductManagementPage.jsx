// In frontend/src/pages/ProductManagementPage.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert, ListGroup, Image, Modal } from 'react-bootstrap';
import apiClient from '../services/api';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';

function ProductManagementPage() {
    // State for the page
    const { shopId } = useParams();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState({ src: '', alt: '' });

    // Fetch shop data when the component mounts
    useEffect(() => {
        apiClient.get(`/owner/shops/${shopId}`)
            .then(response => setShop(response.data))
            .catch(err => setError('Could not load shop data. You may not have permission.'))
            .finally(() => setLoading(false));
    }, [shopId]);

    // --- HANDLER FUNCTIONS (Defined only ONCE) ---

    const handleProductAdded = (newProduct) => {
        setShop(prev => ({ ...prev, products: [...prev.products, newProduct] }));
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleProductUpdated = (updatedProduct) => {
        setShop(prev => ({ ...prev, products: prev.products.map(p => p.id === updatedProduct.id ? updatedProduct : p) }));
    };

    const handleDeleteClick = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await apiClient.delete(`/products/${productId}`);
                setShop(prev => ({ ...prev, products: prev.products.filter(p => p.id !== productId) }));
            } catch (err) {
                setError('Could not delete product.');
            }
        }
    };

    const handleImageClick = (imageUrl, productName) => {
        setSelectedImage({ src: imageUrl, alt: productName });
        setShowImageModal(true);
    };


    // --- RENDER LOGIC ---

    if (loading) return <div className="text-center my-5"><Spinner /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!shop) return <Alert variant="warning">Shop not found.</Alert>;

    const assetUrl = import.meta.env.VITE_BACKEND_URL;
    const localPlaceholder = '/images/placeholder.png';

    return (
        <>
            <Container>
                <Button as={Link} to="/dashboard" variant="outline-secondary" className="mb-4">← Back to My Shops</Button>
                <h1>Manage Products for: {shop.name}</h1>
                <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <h4>Product List</h4>
                        <Button variant="primary" onClick={() => setShowAddModal(true)}>+ Add Product</Button>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            {shop.products && shop.products.length > 0 ? shop.products.map(product => {
                                const imageUrl = product.image_path
                                    ? `${assetUrl}/storage/${product.image_path}`
                                    : localPlaceholder;

                                return (
                                    <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <Image
                                                src={imageUrl}
                                                alt={product.name}
                                                rounded
                                                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px', cursor: 'pointer' }}
                                                onError={(e) => { e.target.onerror = null; e.target.src = localPlaceholder; }}
                                                onClick={() => handleImageClick(imageUrl, product.name)}
                                                title="Click to enlarge"
                                            />
                                            <div>
                                                <strong>{product.name}</strong> - ₹{parseFloat(product.price).toFixed(2)}
                                                <p className="text-muted mb-0 small">{product.description?.substring(0, 70)}...</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleEditClick(product)}>Edit</Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(product.id)}>Delete</Button>
                                        </div>
                                    </ListGroup.Item>
                                );
                            }) : <p className="p-3">This shop has no products yet. Click "+ Add Product" to get started.</p>}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>

            {/* Modals */}
            <AddProductModal show={showAddModal} handleClose={() => setShowAddModal(false)} onProductAdded={handleProductAdded} shopId={shopId} />
            <EditProductModal show={showEditModal} handleClose={() => setShowEditModal(false)} product={selectedProduct} onProductUpdated={handleProductUpdated} />
            <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedImage.alt}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Image src={selectedImage.src} alt={selectedImage.alt} fluid />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProductManagementPage;

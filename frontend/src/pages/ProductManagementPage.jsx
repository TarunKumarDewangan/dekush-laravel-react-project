// // src/pages/ProductManagementPage.jsx

// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
// import apiClient from '../services/api';
// import AddProductModal from '../components/AddProductModal';
// import EditProductModal from '../components/EditProductModal';

// function ProductManagementPage() {
//     const { shopId } = useParams(); // Get the shop ID from the URL
//     const [shop, setShop] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     // State for the modals
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     // Fetch the specific shop and its products using the shopId
//     useEffect(() => {
//         apiClient.get(`/owner/shops/${shopId}`) // Use the public route to get shop details
//             .then(response => {
//                 setShop(response.data);
//             })
//             .catch(err => {
//                 console.error('Failed to fetch shop data:', err);
//                 setError('Could not load shop data. It may not exist or you may not have permission.');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, [shopId]); // Re-run this effect if the shopId in the URL changes

//     // --- HANDLER FUNCTIONS for product modals ---
//     const handleProductAdded = (newProduct) => {
//         setShop(prevShop => ({ ...prevShop, products: [...prevShop.products, newProduct] }));
//     };

//     const handleEditClick = (product) => {
//         setSelectedProduct(product);
//         setShowEditModal(true);
//     };

//     const handleProductUpdated = (updatedProduct) => {
//         setShop(prevShop => ({
//             ...prevShop,
//             products: prevShop.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
//         }));
//         setShowEditModal(false);
//     };

//     const handleDeleteClick = async (productId) => {
//         if (window.confirm('Are you sure you want to delete this product?')) {
//             try {
//                 await apiClient.delete(`/api/products/${productId}`);
//                 setShop(prevShop => ({
//                     ...prevShop,
//                     products: prevShop.products.filter(p => p.id !== productId)
//                 }));
//             } catch (err) {
//                 setError('Could not delete the product.');
//             }
//         }
//     };

//     if (loading) return <div className="text-center my-5"><Spinner /></div>;
//     if (error) return <Alert variant="danger">{error}</Alert>;
//     if (!shop) return <Alert variant="warning">Shop not found.</Alert>;

//     return (
//         <>
//             <Container>
//                 <Button as={Link} to="/dashboard" variant="outline-secondary" className="mb-4">
//                     ← Back to My Shops
//                 </Button>
//                 <h1 className="mb-4">Manage Products for: {shop.name}</h1>

//                 <Card>
//                     <Card.Header className="d-flex justify-content-between align-items-center">
//                         <h4>Product List</h4>
//                         <Button variant="primary" onClick={() => setShowAddModal(true)}>+ Add Product</Button>
//                     </Card.Header>
//                     <Card.Body>
//                         <ListGroup variant="flush">
//                             {shop.products && shop.products.length > 0 ? (
//                                 shop.products.map(product => (
//                                     <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
//                                         <div>
//                                             <strong>{product.name}</strong> - ${parseFloat(product.price).toFixed(2)}
//                                         </div>
//                                         <div>
//                                             <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleEditClick(product)}>Edit</Button>
//                                             <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(product.id)}>Delete</Button>
//                                         </div>
//                                     </ListGroup.Item>
//                                 ))
//                             ) : (
//                                 <p>This shop has no products yet. Click "+ Add Product" to get started.</p>
//                             )}
//                         </ListGroup>
//                     </Card.Body>
//                 </Card>
//             </Container>

//             <AddProductModal
//                 show={showAddModal}
//                 handleClose={() => setShowAddModal(false)}
//                 onProductAdded={handleProductAdded}
//             />

//             <EditProductModal
//                 show={showEditModal}
//                 handleClose={() => setShowEditModal(false)}
//                 product={selectedProduct}
//                 onProductUpdated={handleProductUpdated}
//             />
//         </>
//     );
// }

// export default ProductManagementPage;


// frontend/src/pages/ProductManagementPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
import apiClient from '../services/api';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';

function ProductManagementPage() {
    const { shopId } = useParams();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Use the protected owner route to get the shop data
        apiClient.get(`/owner/shops/${shopId}`)
            .then(response => setShop(response.data))
            .catch(err => setError('Could not load shop data. You may not have permission.'))
            .finally(() => setLoading(false));
    }, [shopId]);

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
        if (window.confirm('Are you sure?')) {
            try {
                await apiClient.delete(`/products/${productId}`);
                setShop(prev => ({ ...prev, products: prev.products.filter(p => p.id !== productId) }));
            } catch (err) {
                setError('Could not delete product.');
            }
        }
    };

    if (loading) return <div className="text-center my-5"><Spinner /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!shop) return <Alert variant="warning">Shop not found.</Alert>;

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
                            {shop.products && shop.products.length > 0 ? shop.products.map(product => (
                                <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
                                    <div><strong>{product.name}</strong> - ₹{parseFloat(product.price).toFixed(2)}</div>
                                    <div>
                                        <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleEditClick(product)}>Edit</Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(product.id)}>Delete</Button>
                                    </div>
                                </ListGroup.Item>
                            )) : <p>This shop has no products yet.</p>}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>

            <AddProductModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                onProductAdded={handleProductAdded}
                shopId={shopId} // <-- PASS THE shopId
            />
            <EditProductModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                product={selectedProduct}
                onProductUpdated={handleProductUpdated}
            />
        </>
    );
}
export default ProductManagementPage;

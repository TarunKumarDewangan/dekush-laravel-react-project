
// // // frontend/src/pages/DashboardPage.jsx

// // import { useState, useEffect } from 'react';
// // import { useAuth } from '../contexts/AuthContext';
// // import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
// // import apiClient from '../services/api';
// // import AddProductModal from '../components/AddProductModal';

// // function DashboardPage() {
// //     const { user } = useAuth();
// //     const [shop, setShop] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');

// //     // State for the modal
// //     const [showModal, setShowModal] = useState(false);

// //     // Fetch the shop owner's shop data when the component mounts
// //     useEffect(() => {
// //         if (user && user.role === 'shopowner' && user.shop) {
// //             apiClient.get(`/shops/${user.shop.id}`)
// //                 .then(response => {
// //                     setShop(response.data);
// //                 })
// //                 .catch(err => {
// //                     console.error('Failed to fetch shop data', err);
// //                     setError('Could not load your shop data.');
// //                 })
// //                 .finally(() => {
// //                     setLoading(false);
// //                 });
// //         } else {
// //             setLoading(false);
// //         }
// //     }, [user]);

// //     const handleProductAdded = (newProduct) => {
// //         // Add the new product to our local state to update the UI instantly
// //         setShop(prevShop => ({
// //             ...prevShop,
// //             products: [...prevShop.products, newProduct]
// //         }));
// //     };

// //     if (loading) {
// //         return <div className="text-center"><Spinner animation="border" /></div>;
// //     }

// //     if (error) {
// //         return <Alert variant="danger">{error}</Alert>;
// //     }

// //     if (!user || user.role !== 'shopowner' || !shop) {
// //         return <Alert variant="warning">You are not authorized to view this page or you do not have a shop.</Alert>;
// //     }

// //     return (
// //         <Container>
// //             <h1 className="my-4">Dashboard: {shop.name}</h1>
// //             <Row>
// //                 {/* Product Management Section */}
// //                 <Col>
// //                     <Card>
// //                         <Card.Header className="d-flex justify-content-between align-items-center">
// //                             <h4>My Products</h4>
// //                             <Button variant="primary" onClick={() => setShowModal(true)}>+ Add Product</Button>
// //                         </Card.Header>
// //                         <Card.Body>
// //                             <ListGroup variant="flush">
// //                                 {shop.products && shop.products.length > 0 ? (
// //                                     shop.products.map(product => (
// //                                         <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
// //                                             <div>
// //                                                 <strong>{product.name}</strong> - ${product.price}
// //                                             </div>
// //                                             <div>
// //                                                 <Button variant="outline-secondary" size="sm" className="me-2">Edit</Button>
// //                                                 <Button variant="outline-danger" size="sm">Delete</Button>
// //                                             </div>
// //                                         </ListGroup.Item>
// //                                     ))
// //                                 ) : (
// //                                     <p>You haven't added any products yet.</p>
// //                                 )}
// //                             </ListGroup>
// //                         </Card.Body>
// //                     </Card>
// //                 </Col>
// //             </Row>

// //             <AddProductModal
// //                 show={showModal}
// //                 handleClose={() => setShowModal(false)}
// //                 onProductAdded={handleProductAdded}
// //             />
// //         </Container>
// //     );
// // }

// // export default DashboardPage;

// frontend/src/pages/DashboardPage.jsx

// import { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
// import apiClient from '../services/api';
// import AddProductModal from '../components/AddProductModal';
// import EditProductModal from '../components/EditProductModal'; // <-- IMPORT EDIT MODAL

// function DashboardPage() {
//     const { user } = useAuth();
//     const [shop, setShop] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     // State for the modals
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false); // <-- State for Edit Modal
//     const [selectedProduct, setSelectedProduct] = useState(null); // <-- State for the product being edited

//     useEffect(() => {
//         if (user && user.role === 'shopowner' && user.shop) {
//             apiClient.get(`/shops/${user.shop.id}`)
//                 .then(response => setShop(response.data))
//                 .catch(err => {
//                     console.error('Failed to fetch shop data', err);
//                     setError('Could not load your shop data.');
//                 })
//                 .finally(() => setLoading(false));
//         } else {
//             setLoading(false);
//         }
//     }, [user]);

//     // --- HANDLER FUNCTIONS ---

//     const handleProductAdded = (newProduct) => {
//         setShop(prevShop => ({
//             ...prevShop,
//             products: [...prevShop.products, newProduct]
//         }));
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
//     };

//     const handleDeleteClick = async (productId) => {
//         // Confirm before deleting
//         if (window.confirm('Are you sure you want to delete this product?')) {
//             try {
//                 await apiClient.delete(`/products/${productId}`);
//                 // Remove the product from local state to update UI
//                 setShop(prevShop => ({
//                     ...prevShop,
//                     products: prevShop.products.filter(p => p.id !== productId)
//                 }));
//             } catch (err) {
//                 console.error('Failed to delete product', err);
//                 setError('Could not delete the product. Please try again.');
//             }
//         }
//     };

//     // --- RENDER LOGIC (No changes needed here) ---
//     if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
//     if (error) return <Alert variant="danger">{error}</Alert>;
//     if (!user || user.role !== 'shopowner' || !shop) {
//         return <Alert variant="warning">You are not authorized to view this page or you do not have a shop.</Alert>;
//     }

//     return (
//         <Container>
//             <h1 className="my-4">Dashboard: {shop.name}</h1>
//             <Row>
//                 <Col>
//                     <Card>
//                         <Card.Header className="d-flex justify-content-between align-items-center">
//                             <h4>My Products</h4>
//                             <Button variant="primary" onClick={() => setShowAddModal(true)}>+ Add Product</Button>
//                         </Card.Header>
//                         <Card.Body>
//                             {error && <Alert variant="danger">{error}</Alert>}
//                             <ListGroup variant="flush">
//                                 {shop.products && shop.products.length > 0 ? (
//                                     shop.products.map(product => (
//                                         <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
//                                             <div>
//                                                 <strong>{product.name}</strong> - ${parseFloat(product.price).toFixed(2)}
//                                             </div>
//                                             <div>
//                                                 <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleEditClick(product)}>Edit</Button>
//                                                 <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(product.id)}>Delete</Button>
//                                             </div>
//                                         </ListGroup.Item>
//                                     ))
//                                 ) : (
//                                     <p>You haven't added any products yet.</p>
//                                 )}
//                             </ListGroup>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>

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
//         </Container>
//     );
// }

// export default DashboardPage;


//3rd version

// frontend/src/pages/DashboardPage.jsx

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
import apiClient from '../services/api';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';

function DashboardPage() {
    const { user } = useAuth();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true); // Start as true
    const [error, setError] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // FIX #1: If there is no user object yet, do nothing and wait.
        // The loading spinner will show.
        if (!user) {
            return;
        }

        // Now that we know we have a user, check their role.
        if (user.role === 'shopowner' && user.shop) {
            // FIX #2: Make sure loading is true before we fetch.
            setLoading(true);
            apiClient.get(`/shops/${user.shop.id}`)
                .then(response => {
                    setShop(response.data);
                })
                .catch(err => {
                    console.error('Failed to fetch shop data', err);
                    setError('Could not load your shop data.');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            // If the user is loaded but isn't a shop owner, stop the loading process.
            setLoading(false);
        }
    }, [user]); // This useEffect will re-run when `user` changes from null to an object.


    // --- All your handler functions below are perfect. No changes needed. ---
    const handleProductAdded = (newProduct) => {
        setShop(prevShop => ({ ...prevShop, products: [...prevShop.products, newProduct] }));
    };
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };
    const handleProductUpdated = (updatedProduct) => {
        setShop(prevShop => ({ ...prevShop, products: prevShop.products.map(p => p.id === updatedProduct.id ? updatedProduct : p) }));
    };
    const handleDeleteClick = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await apiClient.delete(`/products/${productId}`);
                setShop(prevShop => ({ ...prevShop, products: prevShop.products.filter(p => p.id !== productId) }));
            } catch (err) {
                console.error('Failed to delete product', err);
                setError('Could not delete the product. Please try again.');
            }
        }
    };


    // --- RENDER LOGIC ---
    if (loading) {
        return <div className="text-center my-5"><Spinner animation="border" /></div>;
    }

    // FIX #3: This is the most important fix. Add a dedicated check for the 'shop' object.
    // This acts as a gatekeeper to prevent the final return block from ever running with a null 'shop'.
    if (!shop) {
        return (
            <Container className="my-4">
                <Alert variant="warning">
                    {user ? 'You do not have a shop associated with your account.' : 'You must be logged in to view this page.'}
                </Alert>
            </Container>
        );
    }

    // If the code reaches this point, we are 100% sure that 'shop' is a valid object.
    // The crash is now impossible.
    return (
        <Container>
            <h1 className="my-4">Dashboard: {shop.name}</h1>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h4>My Products</h4>
                            <Button variant="primary" onClick={() => setShowAddModal(true)}>+ Add Product</Button>
                        </Card.Header>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <ListGroup variant="flush">
                                {shop.products && shop.products.length > 0 ? (
                                    shop.products.map(product => (
                                        <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{product.name}</strong> - ${parseFloat(product.price).toFixed(2)}
                                            </div>
                                            <div>
                                                <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleEditClick(product)}>Edit</Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(product.id)}>Delete</Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <p>You haven't added any products yet.</p>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <AddProductModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                onProductAdded={handleProductAdded}
            />

            <EditProductModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                product={selectedProduct}
                onProductUpdated={handleProductUpdated}
            />
        </Container>
    );
}

export default DashboardPage;

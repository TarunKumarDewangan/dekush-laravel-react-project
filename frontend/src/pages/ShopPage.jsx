// // frontend/src/pages/ShopPage.jsx

// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Spinner, Alert, Row, Col, Card, ListGroup } from 'react-bootstrap';
// import apiClient from '../services/api';

// function ShopPage() {
//     const { shopId } = useParams();
//     const [shop, setShop] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         // This API call now returns the shop with its user and products
//         apiClient.get(`/shops/${shopId}`)
//             .then(response => {
//                 setShop(response.data);
//             })
//             .catch(error => {
//                 setError('Failed to load shop details.');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, [shopId]);

//     if (loading) {
//         return <div className="text-center"><Spinner animation="border" /></div>;
//     }
//     if (error) {
//         return <Alert variant="danger">{error}</Alert>;
//     }
//     if (!shop) {
//         return <Alert variant="warning">Shop not found.</Alert>;
//     }

//     let contactNumber = 'Not provided';
//     if (shop.shop_incharge_phone) {
//         contactNumber = shop.shop_incharge_phone;
//     } else if (shop.user && shop.user.phone_number) {
//         contactNumber = shop.user.phone_number;
//     }

//     return (
//         <>
//             <Row className="my-4">
//                 {/* --- UPDATED SHOP DETAILS CARD --- */}
//                 <Col md={4}>
//                     <Card>
//                         <Card.Img variant="top" src="https://via.placeholder.com/300" />
//                         <Card.Body>
//                             <Card.Title>{shop.name}</Card.Title>
//                             <Card.Text>{shop.description}</Card.Text>
//                         </Card.Body>
//                          <ListGroup className="list-group-flush">
//                              {/* Display Owner if available */}
//                             {shop.user && (
//                                 <ListGroup.Item>
//                                     <strong>Owner:</strong> {shop.user.name}
//                                 </ListGroup.Item>
//                             )}
//                              {/* --- THIS IS THE FIX --- */}
//                             {/* Display the contact number we determined earlier */}
//                             <ListGroup.Item>
//                                 <strong>Contact:</strong> {contactNumber}
//                             </ListGroup.Item>

//                             <ListGroup.Item>
//                                 <strong>Address:</strong> {shop.address || 'Not provided'}
//                             </ListGroup.Item>
//                         </ListGroup>
//                     </Card>
//                 </Col>

//                 {/* --- PRODUCT LIST (No changes needed here) --- */}
//                 <Col md={8}>
//                     <h2>Our Products</h2>
//                     <Row xs={1} md={2} lg={3} className="g-4">
//                         {shop.products && shop.products.length > 0 ? (
//                             shop.products.map(product => (
//                                 <Col key={product.id}>
//                                     <Card className="h-100">
//                                         <Card.Body>
//                                             <Card.Title>{product.name}</Card.Title>
//                                             <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
//                                             <Card.Text>{product.description}</Card.Text>
//                                         </Card.Body>
//                                     </Card>
//                                 </Col>
//                             ))
//                         ) : (
//                             <p>This shop has no products yet.</p>
//                         )}
//                     </Row>
//                 </Col>
//             </Row>
//         </>
//     );
// }

// export default ShopPage;


// frontend/src/pages/ShopPage.jsx

// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Spinner, Alert, Row, Col, Card, ListGroup } from 'react-bootstrap';
// import apiClient from '../services/api';

// function ShopPage() {
//     const { shopId } = useParams();
//     const [shop, setShop] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         // This API call fetches the shop with its user, products, and images
//         apiClient.get(`/shops/${shopId}`)
//             .then(response => {
//                 setShop(response.data);
//             })
//             .catch(error => {
//                 setError('Failed to load shop details.');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, [shopId]);

//     // ... loading, error, and null shop checks are the same ...
//     if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
//     if (error) return <Alert variant="danger">{error}</Alert>;
//     if (!shop) return <Alert variant="warning">Shop not found.</Alert>;

//     // Determine the contact number to display
//     let contactNumber = shop.shop_incharge_phone || (shop.user ? shop.user.phone_number : 'Not provided');

//     return (
//         <>
//             <Row className="my-4">
//                 <Col md={4}>
//                     {/* --- NEW 2x2 IMAGE GRID --- */}
//                     {shop.images && shop.images.length > 0 ? (
//                         <div className="shop-image-grid">
//                             {/* We use slice(0, 4) to ensure we only ever show a max of 4 images */}
//                             {shop.images.slice(0, 4).map(image => (
//                                 <img
//                                     key={image.id}
//                                     src={`${import.meta.env.VITE_API_BASE_URL}/storage/${image.image_path}`}
//                                     alt="Shop detail"
//                                     className="shop-image-grid-item"
//                                 />
//                             ))}
//                         </div>
//                     ) : (
//                         // Fallback placeholder if there are no images
//                         <img
//                             src="https://via.placeholder.com/300x300?text=No+Image"
//                             alt="Placeholder"
//                             className="img-fluid rounded border mb-3"
//                         />
//                     )}

//                     {/* The details are now outside the Card.Img structure */}
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>{shop.name}</Card.Title>
//                             <Card.Text>{shop.description}</Card.Text>
//                         </Card.Body>
//                         <ListGroup className="list-group-flush">
//                             {shop.user && <ListGroup.Item><strong>Owner:</strong> {shop.user.name}</ListGroup.Item>}
//                             <ListGroup.Item><strong>Contact:</strong> {contactNumber}</ListGroup.Item>
//                             <ListGroup.Item><strong>Address:</strong> {shop.address || 'Not provided'}</ListGroup.Item>
//                         </ListGroup>
//                     </Card>
//                 </Col>

//                 {/* PRODUCT LIST (No changes needed) */}
//                 <Col md={8}>
//                    <h2>Our Products</h2>
//                     <Row xs={1} md={2} lg={3} className="g-4">
//                         {shop.products && shop.products.length > 0 ? (
//                             shop.products.map(product => (
//                                 <Col key={product.id}>
//                                     <Card className="h-100">
//                                         <Card.Body>
//                                             <Card.Title>{product.name}</Card.Title>
//                                             <Card.Subtitle className="mb-2 text-muted">${parseFloat(product.price).toFixed(2)}</Card.Subtitle>
//                                             <Card.Text>{product.description}</Card.Text>
//                                         </Card.Body>
//                                     </Card>
//                                 </Col>
//                             ))
//                         ) : (
//                             <p>This shop has no products yet.</p>
//                         )}
//                     </Row>
//                 </Col>
//             </Row>
//         </>
//     );
// }

// export default ShopPage;


// frontend/src/pages/ShopPage.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert, Row, Col, Card, ListGroup } from 'react-bootstrap';
import apiClient from '../services/api';

function ShopPage() {
    const { shopId } = useParams();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        apiClient.get(`/shops/${shopId}`)
            .then(response => {
                setShop(response.data);
            })
            .catch(error => setError('Failed to load shop details.'))
            .finally(() => setLoading(false));
    }, [shopId]);

    if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!shop) return <Alert variant="warning">Shop not found.</Alert>;

    const contactNumber = shop.shop_incharge_phone || (shop.user ? shop.user.phone_number : 'Not provided');

    // --- Get the base URL for assets ---
    const assetUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <>
            <Row className="my-4">
                <Col md={4}>
                    {shop.images && shop.images.length > 0 ? (
                        <div className="shop-image-grid">
                            {shop.images.slice(0, 4).map(image => (
                               <img
                                key={image.id}
                                src={`${assetUrl}/storage/${image.image_path}`} // This builds http://127.0.0.1:8000/storage/shop_images/your_file.png
                                alt="Shop detail"
                                className="shop-image-grid-item"
                            />
                            ))}
                        </div>
                    ) : (
                        <img
                            src="https://via.placeholder.com/300x300?text=No+Image"
                            alt="Placeholder"
                            className="img-fluid rounded border mb-3"
                        />
                    )}

                    <Card>
                        <Card.Body>
                            <Card.Title>{shop.name}</Card.Title>
                            <Card.Text>{shop.description}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            {shop.user && <ListGroup.Item><strong>Owner:</strong> {shop.user.name}</ListGroup.Item>}
                            <ListGroup.Item><strong>Contact:</strong> {contactNumber}</ListGroup.Item>
                            <ListGroup.Item><strong>Address:</strong> {shop.address || 'Not provided'}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

                <Col md={8}>
                   <h2>Our Products</h2>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {shop.products && shop.products.length > 0 ? (
                            shop.products.map(product => (
                                <Col key={product.id}>
                                    <Card className="h-100">
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">₹{parseFloat(product.price).toFixed(2)}</Card.Subtitle>
                                            <Card.Text>{product.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>This shop has no products yet.</p>
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default ShopPage;

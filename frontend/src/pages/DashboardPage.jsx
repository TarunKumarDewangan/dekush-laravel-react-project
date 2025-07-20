// // frontend/src/pages/DashboardPage.jsx
// import { useState, useEffect } from 'react';
// import { Container, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import apiClient from '../services/api';
// import CreateShopModal from '../components/CreateShopModel';

// function DashboardPage() {
//     const [shops, setShops] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [showCreateModal, setShowCreateModal] = useState(false);

//     useEffect(() => {
//         apiClient.get('/owner/shops')
//             .then(response => {
//                 setShops(response.data);
//             })
//             .catch(err => {
//                 setError('Could not load your shops.');
//                 console.error(err);
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     const handleShopCreated = (newShop) => {
//         setShops(currentShops => [newShop, ...currentShops]);
//     };

//     if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
//     if (error) return <Alert variant="danger">{error}</Alert>;

//     return (
//         <>
//             <Container>
//                 <div className="d-flex justify-content-between align-items-center my-4">
//                     <h1>My Shops</h1>
//                     <Button variant="primary" onClick={() => setShowCreateModal(true)}>
//                         + Create New Shop
//                     </Button>
//                 </div>
//                 <Row xs={1} md={2} lg={3} className="g-4">
//                     {shops.length > 0 ? (
//                         shops.map(shop => (
//                             <Col key={shop.id}>
//                                 <Card className="h-100">
//                                     <Card.Body>
//                                         <Card.Title>{shop.name}</Card.Title>
//                                         <Card.Text>{shop.description || 'No description provided.'}</Card.Text>
//                                         <Button as={Link} to={`/owner/shops/${shop.id}/manage`}>Manage Products</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         ))
//                     ) : (
//                         <Col>
//                             <Alert variant="info">You haven't created any shops yet. Click the button to get started!</Alert>
//                         </Col>
//                     )}
//                 </Row>
//             </Container>
//             <CreateShopModal
//                 show={showCreateModal}
//                 handleClose={() => setShowCreateModal(false)}
//                 onShopCreated={handleShopCreated}
//             />
//         </>
//     );
// }
// export default DashboardPage;




//version


// In frontend/src/pages/DashboardPage.jsx (REPLACE ENTIRE FILE)

// import { useState, useEffect } from 'react';
// import { Container, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import apiClient from '../services/api';
// import CreateShopModal from '../components/CreateShopModel'; // Corrected the import name

// function DashboardPage() {
//     const [shops, setShops] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [showCreateModal, setShowCreateModal] = useState(false);

//     useEffect(() => {
//         apiClient.get('/owner/shops')
//             .then(response => {
//                 setShops(response.data);
//             })
//             .catch(err => {
//                 setError('Could not load your shops.');
//                 console.error(err);
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     const handleShopCreated = (newShop) => {
//         setShops(currentShops => [newShop, ...currentShops]);
//     };

//     // --- NEW: Function to handle deleting a shop ---
//     const handleDeleteShop = async (shopId) => {
//         // Confirm before deleting
//         if (window.confirm('Are you sure you want to delete this shop? This will also delete all of its products. This action cannot be undone.')) {
//             try {
//                 await apiClient.delete(`/owner/shops/${shopId}`);
//                 // Remove the deleted shop from the state for an immediate UI update
//                 setShops(currentShops => currentShops.filter(shop => shop.id !== shopId));
//             } catch (err) {
//                 console.error('Failed to delete shop:', err);
//                 // Display an error message to the user
//                 setError('Could not delete the shop. Please try again.');
//             }
//         }
//     };

//     if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;

//     return (
//         <>
//             <Container>
//                 <div className="d-flex justify-content-between align-items-center my-4">
//                     <h1>My Shops</h1>
//                     <Button variant="primary" onClick={() => setShowCreateModal(true)}>
//                         + Create New Shop
//                     </Button>
//                 </div>

//                 {/* Display any error messages */}
//                 {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

//                 <Row xs={1} md={2} lg={3} className="g-4">
//                     {shops.length > 0 ? (
//                         shops.map(shop => (
//                             <Col key={shop.id}>
//                                 <Card className="h-100 bg-dark text-white border-secondary">
//                                     <Card.Body>
//                                         <Card.Title>{shop.name}</Card.Title>
//                                         <Card.Text>{shop.description || 'No description provided.'}</Card.Text>

//                                         {/* --- UPDATED: Button Group --- */}
//                                         <Button as={Link} to={`/owner/shops/${shop.id}/manage`} className="me-2">
//                                             Manage Products
//                                         </Button>
//                                         <Button variant="outline-danger" onClick={() => handleDeleteShop(shop.id)}>
//                                             Delete
//                                         </Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         ))
//                     ) : (
//                         <Col>
//                             <Alert variant="info">You haven't created any shops yet. Click the button to get started!</Alert>
//                         </Col>
//                     )}
//                 </Row>
//             </Container>
//             <CreateShopModal
//                 show={showCreateModal}
//                 handleClose={() => setShowCreateModal(false)}
//                 onShopCreated={handleShopCreated}
//             />
//         </>
//     );
// }

// export default DashboardPage;



// frontend/src/pages/DashboardPage.jsx

import { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Spinner, Alert, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import CreateShopModal from '../components/CreateShopModel';

function DashboardPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    apiClient.get('/owner/shops')
      .then(res => setShops(res.data))
      .catch(err => {
        console.error(err);
        setError('Could not load your shops.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleShopCreated = newShop => {
    setShops(current => [newShop, ...current]);
  };

  const handleDeleteShop = async id => {
    if (!window.confirm('Delete this shop and all its products?')) return;
    try {
      await apiClient.delete(`/owner/shops/${id}`);
      setShops(current => current.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      setError('Could not delete the shop.');
    }
  };

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;

  return (
    <>
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>My Shops</h1>
          <Button onClick={() => setShowCreateModal(true)}>+ Create New Shop</Button>
        </div>

        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

        <ListGroup>
          {shops.length > 0 ? shops.map(shop => (
            <ListGroup.Item key={shop.id} className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{shop.name}</h5>
                <p className="mb-0 text-muted">{shop.description || 'No description provided.'}</p>
              </div>
              <div>
                <Button as={Link} to={`/owner/shops/${shop.id}/manage`} className="me-2">
                  Manage Products
                </Button>
                <Button variant="outline-danger" onClick={() => handleDeleteShop(shop.id)}>
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          )) : (
            <Alert variant="info">You haven't created any shops yet. Click the button to get started!</Alert>
          )}
        </ListGroup>
      </Container>

      <CreateShopModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        onShopCreated={handleShopCreated}
      />
    </>
  );
}

export default DashboardPage;

// // src/pages/AmbulancePage.jsx

// import { useState, useEffect } from 'react';
// import { Container, Spinner, Alert, Table, Button } from 'react-bootstrap';
// import apiClient from '../services/api';

// function AmbulancePage() {
//     const [ambulances, setAmbulances] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [copiedId, setCopiedId] = useState(null); // State for copy feedback

//     useEffect(() => {
//         apiClient.get('/ambulances')
//             .then(response => {
//                 setAmbulances(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching ambulance data:', error);
//                 setError('Failed to load ambulance contacts.');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, []);

//     const handleCopy = (ambulance) => {
//         navigator.clipboard.writeText(ambulance.phone_number);
//         setCopiedId(ambulance.id);
//         setTimeout(() => {
//             setCopiedId(null);
//         }, 2000);
//     };

//     if (loading) {
//         return <div className="text-center my-5"><Spinner animation="border" /></div>;
//     }

//     if (error) {
//         return <Alert variant="danger">{error}</Alert>;
//     }

//     return (
//         <Container className="my-4">
//             <h1 className="mb-4">All Ambulance Services</h1>
//             <Table striped bordered hover responsive>
//                 <thead className="table-dark">
//                     <tr>
//                         <th>Service Name</th>
//                         <th>City</th>
//                         <th>Phone Number</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {ambulances.map(ambulance => (
//                         <tr key={ambulance.id}>
//                             <td>{ambulance.service_name}</td>
//                             <td>{ambulance.city}</td>
//                             <td>
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <span>{ambulance.phone_number}</span>
//                                     <Button
//                                         size="sm"
//                                         variant={copiedId === ambulance.id ? 'success' : 'secondary'}
//                                         onClick={() => handleCopy(ambulance)}
//                                     >
//                                         {copiedId === ambulance.id ? 'Copied!' : 'Copy'}
//                                     </Button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// }

// export default AmbulancePage;


// In frontend/src/pages/DashboardPage.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Spinner, Alert, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import CreateShopModal from '../components/CreateShopModel'; // Corrected import name
import EditShopModal from '../components/EditShopModal'; // <-- 1. IMPORT THE NEW MODAL

function DashboardPage() {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // --- State for Modals ---
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false); // <-- 2. ADD STATE FOR EDIT MODAL
    const [selectedShop, setSelectedShop] = useState(null); // <-- 3. ADD STATE FOR THE SHOP BEING EDITED

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

    // --- 4. HANDLERS FOR THE EDIT MODAL ---
    const handleEditClick = (shop) => {
        setSelectedShop(shop);
        setShowEditModal(true);
    };

    const handleShopUpdated = (updatedShop) => {
        // Find the shop in the list and replace it with the updated data
        setShops(currentShops => currentShops.map(s => (s.id === updatedShop.id ? updatedShop : s)));
        setShowEditModal(false); // Close the modal
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
                        <ListGroup.Item key={shop.id} className="d-flex justify-content-between align-items-center flex-wrap">
                            <div>
                                <h5 className="mb-1">{shop.name}</h5>
                                <p className="mb-0 text-muted">{shop.description || 'No description provided.'}</p>
                            </div>
                            {/* --- 5. UPDATED BUTTON GROUP --- */}
                            <div className="mt-2 mt-md-0">
                                <Button as={Link} to={`/shops/${shop.id}`} variant="outline-info" size="sm" className="me-2" target="_blank">
                                    View
                                </Button>
                                <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleEditClick(shop)}>
                                    Edit
                                </Button>
                                <Button as={Link} to={`/owner/shops/${shop.id}/manage`} size="sm" className="me-2">
                                    Manage Products
                                </Button>
                                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteShop(shop.id)}>
                                    Delete
                                </Button>
                            </div>
                        </ListGroup.Item>
                    )) : (
                        <Alert variant="info">You haven't created any shops yet. Click the button to get started!</Alert>
                    )}
                </ListGroup>
            </Container>

            {/* --- Render Modals --- */}
            <CreateShopModal
                show={showCreateModal}
                handleClose={() => setShowCreateModal(false)}
                onShopCreated={handleShopCreated}
            />
            {/* --- 6. RENDER THE EDIT MODAL --- */}
            <EditShopModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                shop={selectedShop}
                onShopUpdated={handleShopUpdated}
            />
        </>
    );
}

export default DashboardPage;

// frontend/src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { Container, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
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
            .then(response => {
                setShops(response.data);
            })
            .catch(err => {
                setError('Could not load your shops.');
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleShopCreated = (newShop) => {
        setShops(currentShops => [newShop, ...currentShops]);
    };

    if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <Container>
                <div className="d-flex justify-content-between align-items-center my-4">
                    <h1>My Shops</h1>
                    <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                        + Create New Shop
                    </Button>
                </div>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {shops.length > 0 ? (
                        shops.map(shop => (
                            <Col key={shop.id}>
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>{shop.name}</Card.Title>
                                        <Card.Text>{shop.description || 'No description provided.'}</Card.Text>
                                        <Button as={Link} to={`/owner/shops/${shop.id}/manage`}>Manage Products</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <Alert variant="info">You haven't created any shops yet. Click the button to get started!</Alert>
                        </Col>
                    )}
                </Row>
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

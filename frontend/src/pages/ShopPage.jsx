// frontend/src/pages/ShopPage.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert, Row, Col, Card, ListGroup } from 'react-bootstrap';
import apiClient from '../services/api';

function ShopPage() {
    const { shopId } = useParams(); // Get the 'shopId' from the URL
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        apiClient.get(`/shops/${shopId}`)
            .then(response => {
                setShop(response.data);
            })
            .catch(error => {
                console.error(`Error fetching shop ${shopId}:`, error);
                setError('Failed to load shop details.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [shopId]); // Re-run the effect if the shopId changes

    if (loading) {
        return <div className="text-center"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!shop) {
        return <Alert variant="warning">Shop not found.</Alert>;
    }

    return (
        <>
            <Row className="my-4">
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/300" />
                        <Card.Body>
                            <Card.Title>{shop.name}</Card.Title>
                            <Card.Text>{shop.description}</Card.Text>
                        </Card.Body>
                         <ListGroup className="list-group-flush">
                            <ListGroup.Item><strong>Contact:</strong> {shop.contact_info}</ListGroup.Item>
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
                                            <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
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

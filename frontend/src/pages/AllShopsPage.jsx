// src/pages/AllShopsPage.jsx

import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import apiClient from '../services/api';
import ShopCard from '../components/ShopCard';

function AllShopsPage() {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        apiClient.get('/shops')
            .then(response => {
                setShops(response.data);
            })
            .catch(error => {
                console.error('Error fetching all shops:', error);
                setError('Failed to load shops. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center my-5"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container>
            <h1 className="my-4">All Shops</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {shops.map(shop => (
                    <Col key={shop.id}>
                        <ShopCard shop={shop} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default AllShopsPage;

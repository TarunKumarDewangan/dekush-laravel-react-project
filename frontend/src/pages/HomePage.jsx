// frontend/src/pages/HomePage.jsx

import { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import apiClient from '../services/api';
import ShopCard from '../components/ShopCard';

function HomePage() {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        apiClient.get('/shops')
            .then(response => {
                setShops(response.data);
            })
            .catch(error => {
                console.error('Error fetching shops:', error);
                setError('Failed to load shops. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // The empty array means this effect runs once on component mount

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <>
            <h1 className="my-4">Welcome to ShopHub!</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {shops.map(shop => (
                    <Col key={shop.id}>
                        <ShopCard shop={shop} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default HomePage;

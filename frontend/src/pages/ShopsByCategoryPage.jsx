// In frontend/src/pages/ShopsByCategoryPage.jsx (NEW FILE)

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import apiClient from '../services/api';
import ShopCard from '../components/ShopCard';

function ShopsByCategoryPage() {
    const { slug } = useParams(); // Get the category slug from the URL
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!slug) return;

        apiClient.get(`/categories/${slug}/shops`)
            .then(response => {
                setCategory(response.data);
            })
            .catch(err => {
                console.error("Failed to fetch shops by category:", err);
                setError('Could not load this category. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]); // Re-fetch if the slug changes

    if (loading) {
        return <div className="text-center my-5"><Spinner animation="border" /></div>;
    }
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }
    if (!category) {
        return <Alert variant="info">Category not found.</Alert>;
    }

    return (
        <Container>
            <Button as={Link} to="/" variant="outline-secondary" className="mb-4">
                ← Back to Home
            </Button>
            <h1 className="mb-4">Shops in: {category.name}</h1>
            <p className="lead">{category.description}</p>
            <hr />

            <Row xs={1} md={2} lg={3} className="g-4">
                {category.shops && category.shops.length > 0 ? (
                    category.shops.map(shop => (
                        <Col key={shop.id}>
                            <ShopCard shop={shop} />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Alert variant="info">There are currently no shops listed in this category.</Alert>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default ShopsByCategoryPage;

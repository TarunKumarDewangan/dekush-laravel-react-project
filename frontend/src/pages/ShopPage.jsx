// In frontend/src/pages/ShopPage.jsx (REPLACE ENTIRE FILE)

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
      .then(res => setShop(res.data))
      .catch(() => setError('Failed to load shop details.'))
      .finally(() => setLoading(false));
  }, [shopId]);

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (error)   return <Alert variant="danger">{error}</Alert>;
  if (!shop)   return <Alert variant="warning">Shop not found.</Alert>;

  const contactNumber = shop.shop_incharge_phone
    || (shop.user ? shop.user.phone_number : 'Not provided');
  const assetUrl = import.meta.env.VITE_BACKEND_URL;
  // NEW: Define the local placeholder path here as well.
  const localPlaceholder = '/images/placeholder.png';

  return (
    <>
      <Row className="my-4">
        <Col md={4}>
          {shop.images && shop.images.length > 0 ? (
            <div className="shop-image-grid mb-3">
              {shop.images.slice(0, 4).map(img => (
                <img
                  key={img.id}
                  src={`${assetUrl}/storage/${img.image_path}`}
                  alt="Shop detail"
                  className="shop-image-grid-item rounded border"
                  // UPDATED: Add the onError handler for the main shop images
                  onError={(e) => { e.target.onerror = null; e.target.src = localPlaceholder; }}
                />
              ))}
            </div>
          ) : (
            <img
              src={localPlaceholder} // Use the local placeholder
              alt="Placeholder"
              className="img-fluid rounded border mb-3"
            />
          )}

          <Card>
            <Card.Body>
              <Card.Title>{shop.name}</Card.Title>
              <Card.Text>{shop.description}</Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              {shop.user && (
                <ListGroup.Item>
                  <strong>Owner:</strong> {shop.user.name}
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <strong>Contact:</strong> {contactNumber}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Address:</strong> {shop.address || 'Not provided'}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={8}>
          <h2>Our Products</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {shop.products && shop.products.length > 0 ? (
              shop.products.map(product => {
                const imgUrl = product.image_path
                  ? `${assetUrl}/storage/${product.image_path}`
                  : localPlaceholder; // Use local placeholder for products

                return (
                  <Col key={product.id}>
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={imgUrl}
                        style={{ height: '150px', objectFit: 'cover' }}
                        alt={product.name}
                        // UPDATED: Add the onError handler for product images
                        onError={(e) => { e.target.onerror = null; e.target.src = localPlaceholder; }}
                      />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          ₹{parseFloat(product.price).toFixed(2)}
                        </Card.Subtitle>
                        <Card.Text>{product.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Alert variant="info">This shop has no products yet.</Alert>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default ShopPage;

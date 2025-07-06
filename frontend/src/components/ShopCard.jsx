// frontend/src/components/ShopCard.jsx

import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ShopCard({ shop }) {
    // A placeholder image if no logo is provided
    const logoUrl = shop.logo_path ? `http://localhost:8000/storage/${shop.logo_path}` : 'https://via.placeholder.com/150';

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={logoUrl} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{shop.name}</Card.Title>
                <Card.Text>
                    {shop.description.substring(0, 100)}...
                </Card.Text>
                <Button as={Link} to={`/shops/${shop.id}`} variant="primary">Visit Shop</Button>
            </Card.Body>
        </Card>
    );
}

export default ShopCard;

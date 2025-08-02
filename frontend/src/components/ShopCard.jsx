// In frontend/src/components/ShopCard.jsx (REPLACE ENTIRE FILE)

import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ShopCard({ shop }) {
    const assetUrl = import.meta.env.VITE_BACKEND_URL;
    const localPlaceholder = '/images/placeholder.png';

    const imageUrl = shop.images && shop.images.length > 0
        ? `${assetUrl}/storage/${shop.images[0].image_path}`
        : localPlaceholder;

    return (
        <Card className="h-100">
            {/* THIS IS THE CHANGE: The image is now wrapped in a Link */}
            <Link to={`/shops/${shop.id}`}>
                <Card.Img
                    variant="top"
                    src={imageUrl}
                    style={{ height: '200px', objectFit: 'cover' }}
                    alt={shop.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = localPlaceholder; }}
                />
            </Link>
            <Card.Body>
                <Card.Title>{shop.name}</Card.Title>
                <Card.Text>
                    {shop.description ? shop.description.substring(0, 100) + '...' : 'No description.'}
                </Card.Text>
                {/* The button remains as a separate link */}
                <Button as={Link} to={`/shops/${shop.id}`} variant="primary">Visit Shop</Button>
            </Card.Body>
        </Card>
    );
}

export default ShopCard;

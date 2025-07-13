// // frontend/src/components/ShopCard.jsx

// import { Card, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// function ShopCard({ shop }) {
//     // A placeholder image if no logo is provided
//     const logoUrl = shop.logo_path ? `http://localhost:8000/storage/${shop.logo_path}` : 'https://via.placeholder.com/150';

//     return (
//         <Card className="h-100">
//             <Card.Img variant="top" src={logoUrl} style={{ height: '200px', objectFit: 'cover' }} />
//             <Card.Body>
//                 <Card.Title>{shop.name}</Card.Title>
//                 <Card.Text>
//                     {shop.description.substring(0, 100)}...
//                 </Card.Text>
//                 <Button as={Link} to={`/shops/${shop.id}`} variant="primary">Visit Shop</Button>
//             </Card.Body>
//         </Card>
//     );
// }

// export default ShopCard;


// frontend/src/components/ShopCard.jsx

// import { Card, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// function ShopCard({ shop }) {
//     const assetUrl = import.meta.env.VITE_BACKEND_URL;

//     // --- CORRECTED LOGIC: Use the first uploaded image, or a placeholder if none exist ---
//     const imageUrl = shop.images && shop.images.length > 0
//         ? `${assetUrl}/storage/${shop.images[0].image_path}`
//         : 'https://via.placeholder.com/300x200?text=No+Image';

//     return (
//         <Card className="h-100">
//             <Card.Img
//                 variant="top"
//                 src={imageUrl}
//                 style={{ height: '200px', objectFit: 'cover' }}
//                 alt={shop.name}
//             />
//             <Card.Body>
//                 <Card.Title>{shop.name}</Card.Title>
//                 <Card.Text>
//                     {shop.description ? shop.description.substring(0, 100) + '...' : 'No description.'}
//                 </Card.Text>
//                 <Button as={Link} to={`/shops/${shop.id}`} variant="primary">Visit Shop</Button>
//             </Card.Body>
//         </Card>
//     );
// }

// export default ShopCard;


// frontend/src/components/ShopCard.jsx

import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ShopCard({ shop }) {
    const assetUrl = import.meta.env.VITE_BACKEND_URL;

    // --- CORRECTED LOGIC ---
    // Use the first uploaded image as the card's main image.
    // If no images exist, use the placeholder.
    const imageUrl = shop.images && shop.images.length > 0
        ? `${assetUrl}/storage/${shop.images[0].image_path}`
        : 'https://via.placeholder.com/300x200?text=No+Image';

    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imageUrl}
                style={{ height: '200px', objectFit: 'cover' }}
                alt={shop.name}
                // Add an error handler for broken images
                onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/300x200?text=Image+Error' }}
            />
            <Card.Body>
                <Card.Title>{shop.name}</Card.Title>
                <Card.Text>
                    {shop.description ? shop.description.substring(0, 100) + '...' : 'No description.'}
                </Card.Text>
                <Button as={Link} to={`/shops/${shop.id}`} variant="primary">Visit Shop</Button>
            </Card.Body>
        </Card>
    );
}

export default ShopCard;

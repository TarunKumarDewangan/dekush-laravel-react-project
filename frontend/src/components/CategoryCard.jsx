// In frontend/src/components/CategoryCard.jsx (NEW FILE)

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CategoryCard({ category }) {
  return (
    // The Link component makes the entire card clickable
    <Link to={`/category/${category.slug}`} className="text-decoration-none">
      <Card className="h-100 text-center category-card">
        <Card.Body>
          {/* We will add an icon here later if you have one */}
          {/* <i className={`${category.icon} fa-2x mb-2`}></i> */}
          <Card.Title className="stretched-link">{category.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CategoryCard;

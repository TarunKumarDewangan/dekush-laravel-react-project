// In frontend/src/components/CategoryNav.jsx (NEW FILE)

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import './CategoryNav.css'; // We will create this CSS file next

function CategoryNav() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        // Fetch the nested categories from the API
        apiClient.get('/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Failed to load categories:", error);
            });
    }, []);

    // Handlers for mouse hover events
    const handleMouseEnter = (category) => {
        setActiveCategory(category);
    };

    const handleMouseLeave = () => {
        setActiveCategory(null);
    };

    return (
        <nav className="category-nav-container" onMouseLeave={handleMouseLeave}>
            <div className="category-nav-items">
                {categories.map(category => (
                    <div
                        key={category.id}
                        className="category-nav-item"
                        onMouseEnter={() => handleMouseEnter(category)}
                    >
                        {/* We can add icons here in the future */}
                        <span>{category.name}</span>
                    </div>
                ))}
            </div>

            {/* The Mega Menu Dropdown */}
            {activeCategory && activeCategory.children.length > 0 && (
                <div className="mega-menu">
                    <div className="mega-menu-content">
                        <h4 className="mega-menu-title">{activeCategory.name}</h4>
                        <ul className="mega-menu-links">
                            {activeCategory.children.map(subCategory => (
                                <li key={subCategory.id}>
                                    <Link to={`/category/${subCategory.slug}`}>
                                        {subCategory.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default CategoryNav;

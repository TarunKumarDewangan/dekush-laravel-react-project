// In frontend/src/components/Navigation.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Form, Button, ListGroup } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../services/api';

function Navigation() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (query.trim() === '') {
            setSuggestions([]);
            return;
        }
        const debounceTimer = setTimeout(() => {
            apiClient.get(`/suggestions?q=${query}`)
                .then(response => {
                    setSuggestions(response.data);
                })
                .catch(error => {
                    console.error("Failed to fetch suggestions:", error);
                    setSuggestions([]);
                });
        }, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query}`);
            setSuggestions([]);
            setQuery('');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]);
        navigate(`/search?q=${suggestion}`);
        setQuery('');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">dekush</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="mx-auto" style={{ position: 'relative', width: '50%' }}>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search for shops, products, hospitals..."
                                className="me-2"
                                aria-label="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoComplete="off"
                            />
                            <Button type="submit" variant="outline-success">Search</Button>
                        </Form>
                        {suggestions.length > 0 && (
                            <ListGroup style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1050, width: 'calc(100% - 78px)' }}>
                                {suggestions.map((suggestion, index) => (
                                    <ListGroup.Item key={index} action onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </div>
                    <Nav className="ms-auto">
                        {isAuthenticated && user ? (
                            <NavDropdown title={`Welcome, ${user.name}`} id="basic-nav-dropdown">
                                {user.role === 'shopowner' && (
                                    <NavDropdown.Item as={Link} to="/dashboard">My Shops</NavDropdown.Item>
                                )}
                                {user.role === 'admin' && (
                                    <NavDropdown.Item as={Link} to="/admin/dashboard">Admin Panel</NavDropdown.Item>
                                )}

                                {/* --- THIS IS THE MISSING LINK --- */}
                                <NavDropdown.Item as={Link} to="/profile">
                                    Account Settings
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : isAuthenticated ? (
                            <Nav.Link disabled>Loading...</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;

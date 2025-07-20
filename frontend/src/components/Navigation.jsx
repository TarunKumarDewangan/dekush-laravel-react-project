// // frontend/src/components/Navigation.jsx

// import { Link, useNavigate } from 'react-router-dom';
// import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
// import { useAuth } from '../contexts/AuthContext';

// function Navigation() {
//     const { isAuthenticated, user, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         await logout();
//         navigate('/login');
//     };

//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Container>
//                 <Navbar.Brand as={Link} to="/">ShopHub</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ms-auto">
//                         {isAuthenticated && user ? (
//                             // If user is authenticated AND the user object exists
//                             <NavDropdown title={`Welcome, ${user.name}`} id="basic-nav-dropdown">
//                                 <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
//                                 <NavDropdown.Divider />
//                                 <NavDropdown.Item onClick={handleLogout}>
//                                     Logout
//                                 </NavDropdown.Item>
//                             </NavDropdown>
//                         ) : isAuthenticated ? (
//                             // If user is authenticated but the user object is still loading
//                             <Nav.Link disabled>Loading...</Nav.Link>
//                         ) : (
//                             // If user is not authenticated at all
//                             <>
//                                 <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                                 <Nav.Link as={Link} to="/register">Register</Nav.Link>
//                             </>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default Navigation;


// frontend/src/components/Navigation.jsx


// version

// import { useState } from 'react'; // <-- Import useState
// import { Link, useNavigate } from 'react-router-dom';
// import { Navbar, Container, Nav, NavDropdown, Form, Button } from 'react-bootstrap'; // <-- Import Form, Button
// import { useAuth } from '../contexts/AuthContext';

// function Navigation() {
//     const { isAuthenticated, user, logout } = useAuth();
//     const navigate = useNavigate();
//     const [query, setQuery] = useState(''); // <-- State for the search input

//     const handleLogout = async () => {
//         await logout();
//         navigate('/login');
//     };

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         if (query.trim()) { // Only search if the query isn't empty
//             navigate(`/search?q=${query}`);
//             setQuery(''); // Optional: clear the search bar after searching
//         }
//     };
//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Container>
//                 <Navbar.Brand as={Link} to="/">dekush</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     {/* --- START OF NEW SEARCH BAR --- */}
//                     <Form className="d-flex mx-auto" onSubmit={handleSearchSubmit}>
//                         <Form.Control
//                             type="search"
//                             placeholder="Search for shops, products..."
//                             className="me-2"
//                             aria-label="Search"
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}
//                         />
//                         <Button type="submit" variant="outline-success">Search</Button>
//                     </Form>
//                     {/* --- END OF NEW SEARCH BAR --- */}
//                     <Nav className="ms-auto">
//                         {isAuthenticated && user ? (
//                             // If user is authenticated AND the user object exists
//                             <NavDropdown title={`Welcome, ${user.name}`} id="basic-nav-dropdown">
//                                 {/* --- MODIFICATION START --- */}

//                                 {/* Show link to Shop Owner Dashboard */}
//                                 {user.role === 'shopowner' && (
//                                     <NavDropdown.Item as={Link} to="/dashboard">My Shop</NavDropdown.Item>
//                                 )}

//                                 {/* Show link to Admin Dashboard */}
//                                 {user.role === 'admin' && (
//                                     <NavDropdown.Item as={Link} to="/admin/dashboard">Admin Panel</NavDropdown.Item>
//                                 )}

//                                 {/* --- MODIFICATION END --- */}

//                                 <NavDropdown.Divider />
//                                 <NavDropdown.Item onClick={handleLogout}>
//                                     Logout
//                                 </NavDropdown.Item>
//                             </NavDropdown>
//                         ) : isAuthenticated ? (
//                             // If user is authenticated but the user object is still loading
//                             <Nav.Link disabled>Loading...</Nav.Link>
//                         ) : (
//                             // If user is not authenticated at all
//                             <>
//                                 <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                                 <Nav.Link as={Link} to="/register">Register</Nav.Link>
//                             </>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default Navigation;


// In frontend/src/components/Navigation.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Form, Button, ListGroup } from 'react-bootstrap'; // <-- Import ListGroup
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../services/api'; // <-- Import apiClient

function Navigation() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    // --- State for Search ---
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // --- useEffect for fetching suggestions with debouncing ---
    // This runs whenever the user stops typing for 300ms.
    useEffect(() => {
        // If the search bar is empty, clear suggestions and do nothing.
        if (query.trim() === '') {
            setSuggestions([]);
            return;
        }

        // Set a timer to wait for the user to stop typing.
        const debounceTimer = setTimeout(() => {
            apiClient.get(`/suggestions?q=${query}`)
                .then(response => {
                    setSuggestions(response.data);
                })
                .catch(error => {
                    console.error("Failed to fetch suggestions:", error);
                    setSuggestions([]); // Clear suggestions on error
                });
        }, 300); // 300ms delay

        // This is a cleanup function. It clears the timer if the user types again.
        return () => clearTimeout(debounceTimer);

    }, [query]); // This effect depends on the 'query' state.

    // --- Handlers ---
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query}`);
            setSuggestions([]); // Hide suggestions after submitting
            setQuery('');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion); // Set the search bar to the suggestion
        setSuggestions([]); // Hide the suggestions list
        navigate(`/search?q=${suggestion}`); // Immediately perform the search
        setQuery('');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">dekush</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {/* --- Search Form Wrapper for positioning --- */}
                    <div className="mx-auto" style={{ position: 'relative', width: '50%' }}>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search for shops, products, hospitals..."
                                className="me-2"
                                aria-label="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoComplete="off" // Turn off browser's default autocomplete
                            />
                            <Button type="submit" variant="outline-success">Search</Button>
                        </Form>

                        {/* --- Suggestions Dropdown --- */}
                        {suggestions.length > 0 && (
                            <ListGroup style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                zIndex: 1050, // High z-index to appear over other content
                                width: 'calc(100% - 78px)' // Adjust width to align with input
                            }}>
                                {suggestions.map((suggestion, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        action // Makes it look clickable
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </div>

                    <Nav className="ms-auto">
                        {/* ... (The rest of the user dropdown logic is the same) ... */}
                        {isAuthenticated && user ? (
                            <NavDropdown title={`Welcome, ${user.name}`} id="basic-nav-dropdown">
                                {user.role === 'shopowner' && (
                                    <NavDropdown.Item as={Link} to="/dashboard">My Shop</NavDropdown.Item>
                                )}
                                {user.role === 'admin' && (
                                    <NavDropdown.Item as={Link} to="/admin/dashboard">Admin Panel</NavDropdown.Item>
                                )}
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

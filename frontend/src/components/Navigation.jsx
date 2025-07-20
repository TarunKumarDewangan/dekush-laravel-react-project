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

import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">dekush</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated && user ? (
                            // If user is authenticated AND the user object exists
                            <NavDropdown title={`Welcome, ${user.name}`} id="basic-nav-dropdown">
                                {/* --- MODIFICATION START --- */}

                                {/* Show link to Shop Owner Dashboard */}
                                {user.role === 'shopowner' && (
                                    <NavDropdown.Item as={Link} to="/dashboard">My Shop</NavDropdown.Item>
                                )}

                                {/* Show link to Admin Dashboard */}
                                {user.role === 'admin' && (
                                    <NavDropdown.Item as={Link} to="/admin/dashboard">Admin Panel</NavDropdown.Item>
                                )}

                                {/* --- MODIFICATION END --- */}

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : isAuthenticated ? (
                            // If user is authenticated but the user object is still loading
                            <Nav.Link disabled>Loading...</Nav.Link>
                        ) : (
                            // If user is not authenticated at all
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

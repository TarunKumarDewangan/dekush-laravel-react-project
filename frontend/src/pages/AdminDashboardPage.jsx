// // // frontend/src/pages/AdminDashboardPage.jsx

// // import { useState, useEffect } from 'react';
// // import { Container, Table, Spinner, Alert, Button } from 'react-bootstrap';
// // import apiClient from '../services/api';

// // function AdminDashboardPage() {
// //     const [users, setUsers] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');

// //     const fetchUsers = () => {
// //         setLoading(true);
// //         apiClient.get('/admin/users')
// //             .then(response => {
// //                 setUsers(response.data);
// //             })
// //             .catch(err => {
// //                 console.error("Failed to fetch users", err);
// //                 setError('Could not load user data. You may not have permission.');
// //             })
// //             .finally(() => {
// //                 setLoading(false);
// //             });
// //     };

// //     useEffect(() => {
// //         fetchUsers();
// //     }, []);

// //     const handleDelete = async (userId) => {
// //         if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
// //             try {
// //                 await apiClient.delete(`/admin/users/${userId}`);
// //                 // Refresh the user list after deletion
// //                 fetchUsers();
// //             } catch (err) {
// //                 console.error('Failed to delete user', err);
// //                 setError(err.response?.data?.message || 'Could not delete the user.');
// //             }
// //         }
// //     };

// //     if (loading) return <div className="text-center"><Spinner animation="border" /></div>;

// //     return (
// //         <Container className="my-4">
// //             <h1>Admin Dashboard: User Management</h1>
// //             {error && <Alert variant="danger">{error}</Alert>}
// //             <Table striped bordered hover responsive>
// //                 <thead>
// //                     <tr>
// //                         <th>ID</th>
// //                         <th>Name</th>
// //                         <th>Email</th>
// //                         <th>Role</th>
// //                         <th>Is Shop Owner?</th>
// //                         <th>Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {users.map(user => (
// //                         <tr key={user.id}>
// //                             <td>{user.id}</td>
// //                             <td>{user.name}</td>
// //                             <td>{user.email}</td>
// //                             <td><span className={`badge bg-${user.role === 'admin' ? 'success' : 'secondary'}`}>{user.role}</span></td>
// //                             <td>{user.shop ? `Yes (Shop ID: ${user.shop.id})` : 'No'}</td>
// //                             <td>
// //                                 <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
// //                                     Delete
// //                                 </Button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </Table>
// //         </Container>
// //     );
// // }

// // export default AdminDashboardPage;

// // In your Admin Dashboard component file

// // In your Admin Dashboard component file (e.g., src/pages/AdminDashboard.jsx)

// import React, { useState, useEffect } from 'react';
// // Import Badge and Alert for better UI feedback
// import { Table, Button, Spinner, Badge, Alert } from 'react-bootstrap';
// import api from '../services/api'; // Your axios instance
// import EditUserModal from '../components/EditUserModal'; // The modal we created

// // A small helper function to give roles a nice color
// const getRoleBadge = (role) => {
//     const roleColors = {
//         admin: 'success',
//         shopowner: 'primary',
//         user: 'secondary'
//     };
//     return <Badge bg={roleColors[role] || 'light'} text={roleColors[role] ? 'light' : 'dark'}>{role}</Badge>;
// };

// function AdminDashboard() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(''); // Re-introducing the error state

//     // State for the Edit modal
//     const [showModal, setShowModal] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);

//     // Function to fetch all users (reusable)
//     const fetchUsers = () => {
//         setLoading(true);
//         setError(''); // Clear previous errors on re-fetch
//         api.get('/admin/users')
//             .then(response => {
//                 setUsers(response.data.users); // We're keeping the { users: [...] } format
//             })
//             .catch(err => {
//                 console.error("Error fetching users:", err);
//                 setError(err.response?.data?.message || 'Could not load user data.');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     // Fetch users on initial component mount
//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     // --- Edit Functionality ---
//     const handleEditClick = (user) => {
//         setSelectedUser(user);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedUser(null);
//     };

//     // After a successful edit, we can just update the list locally for speed
//     // Or we could call fetchUsers() again to get the absolute latest state from the server
//     const handleUpdateSuccess = (updatedUser) => {
//         setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
//         handleCloseModal();
//     };

//     // --- Delete Functionality (Your original, working code) ---
//     const handleDelete = async (userId) => {
//         if (window.confirm('Are you sure you want to delete this user? This action is permanent.')) {
//             try {
//                 await api.delete(`/admin/users/${userId}`);
//                 // Instead of a full re-fetch, we can filter the user out of the list for a faster UI update
//                 setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
//             } catch (err) {
//                 console.error('Failed to delete user', err);
//                 setError(err.response?.data?.message || 'Could not delete the user.');
//             }
//         }
//     };

//     if (loading) {
//         return <div className="text-center"><Spinner animation="border" /></div>;
//     }

//     return (
//         <>
//             <h1 className="mb-4">Admin Dashboard: User Management</h1>
//             {/* Display any errors that occur */}
//             {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

//             <Table striped bordered hover responsive>
//                 <thead className="table-dark">
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Is Shop Owner?</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{getRoleBadge(user.role)}</td>
//                             <td>{user.shop ? `Yes (Shop ID: ${user.shop.id})` : 'No'}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     className="me-2"
//                                     onClick={() => handleEditClick(user)}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button
//                                     variant="danger"
//                                     size="sm"
//                                     onClick={() => handleDelete(user.id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* Render the Edit modal only when a user is selected */}
//             {selectedUser && (
//                 <EditUserModal
//                     show={showModal}
//                     handleClose={handleCloseModal}
//                     user={selectedUser}
//                     onUpdateSuccess={handleUpdateSuccess}
//                 />
//             )}
//         </>
//     );
// }

// export default AdminDashboard;


//version

// In frontend/src/pages/AdminDashboardPage.jsx

// In frontend/src/pages/AdminDashboardPage.jsx (REPLACE ENTIRE FILE)

// import React, { useState, useEffect } from 'react';
// import { Table, Button, Spinner, Badge, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import api from '../services/api';
// import EditUserModal from '../components/EditUserModal';

// const getRoleBadge = (role) => {
//     const roleColors = {
//         admin: 'success',
//         shopowner: 'primary',
//         user: 'secondary'
//     };
//     return <Badge bg={roleColors[role] || 'light'} text={roleColors[role] ? 'light' : 'dark'}>{role}</Badge>;
// };

// function AdminDashboardPage() { // Corrected component name
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true); // <-- THIS LINE WAS MISSING
//     const [error, setError] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);

//     const fetchUsers = () => {
//         setLoading(true);
//         setError('');
//         api.get('/admin/users')
//             .then(response => {
//                 setUsers(response.data.users);
//             })
//             .catch(err => {
//                 console.error("Error fetching users:", err);
//                 setError(err.response?.data?.message || 'Could not load user data.');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const handleEditClick = (user) => {
//         setSelectedUser(user);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedUser(null);
//     };

//     const handleUpdateSuccess = (updatedUser) => {
//         setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
//         handleCloseModal();
//     };

//     const handleDelete = async (userId) => {
//         if (window.confirm('Are you sure you want to delete this user? This action is permanent.')) {
//             try {
//                 await api.delete(`/admin/users/${userId}`);
//                 setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
//             } catch (err) {
//                 console.error('Failed to delete user', err);
//                 setError(err.response?.data?.message || 'Could not delete the user.');
//             }
//         }
//     };

//     if (loading) {
//         return <div className="text-center"><Spinner animation="border" /></div>;
//     }

//     return (
//         <>
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h1>Admin Dashboard</h1>
//                 <Button as={Link} to="/admin/categories" variant="success">
//                     Manage Categories
//                 </Button>
//             </div>

//             <h2 className="mb-3">User Management</h2>
//             {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

//             <Table striped bordered hover responsive>
//                 <thead className="table-dark">
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Is Shop Owner?</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{getRoleBadge(user.role)}</td>
//                             <td>{user.shops.length > 0 ? `Yes (${user.shops[0].name})` : 'No'}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     className="me-2"
//                                     onClick={() => handleEditClick(user)}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button
//                                     variant="danger"
//                                     size="sm"
//                                     onClick={() => handleDelete(user.id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {selectedUser && (
//                 <EditUserModal
//                     show={showModal}
//                     handleClose={handleCloseModal}
//                     user={selectedUser}
//                     onUpdateSuccess={handleUpdateSuccess}
//                 />
//             )}
//         </>
//     );
// }

// export default AdminDashboardPage; // Corrected export name



//version

// In frontend/src/pages/AdminDashboardPage.jsx (REPLACE ENTIRE FILE)

import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Badge, Alert } from 'react-bootstrap';
import api from '../services/api';
import EditUserModal from '../components/EditUserModal';

// This helper function remains the same
const getRoleBadge = (role) => {
    const roleColors = {
        admin: 'success',
        shopowner: 'primary',
        user: 'secondary'
    };
    return <Badge bg={roleColors[role] || 'light'} text={roleColors[role] ? 'light' : 'dark'}>{role}</Badge>;
};

function AdminDashboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // All the data fetching and handler functions remain the same
    const fetchUsers = () => {
        setLoading(true);
        setError('');
        api.get('/admin/users')
            .then(response => {
                setUsers(response.data.users);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setError(err.response?.data?.message || 'Could not load user data.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleUpdateSuccess = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        handleCloseModal();
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action is permanent.')) {
            try {
                await api.delete(`/admin/users/${userId}`);
                setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
            } catch (err) {
                console.error('Failed to delete user', err);
                setError(err.response?.data?.message || 'Could not delete the user.');
            }
        }
    };

    if (loading) {
        return <div className="text-center"><Spinner animation="border" /></div>;
    }

    return (
        // The JSX is now cleaner, as the main header and navigation are in AdminLayout.jsx
        <>
            <h1 className="mb-4">User Management</h1>
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

            <Table striped bordered hover responsive variant="dark">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Is Shop Owner?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{getRoleBadge(user.role)}</td>
                            <td>{user.shops.length > 0 ? `Yes (${user.shops[0].name})` : 'No'}</td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEditClick(user)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {selectedUser && (
                <EditUserModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    user={selectedUser}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </>
    );
}

export default AdminDashboardPage;

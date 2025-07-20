// // In frontend/src/pages/AdminCategoryPage.jsx (REPLACE ENTIRE FILE)

// import { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
// import apiClient from '../services/api';

// function AdminCategoryPage() {
//     const [mainCategories, setMainCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     // Form state
//     const [newCategoryName, setNewCategoryName] = useState('');
//     const [formError, setFormError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Fetch main categories
//     const fetchMainCategories = () => {
//         setLoading(true);
//         apiClient.get('/categories')
//             .then(response => {
//                 setMainCategories(response.data);
//             })
//             .catch(err => setError('Could not load categories.'))
//             .finally(() => setLoading(false));
//     };

//     useEffect(() => {
//         fetchMainCategories();
//     }, []);

//     // Handle form submission
//     const handleCreateCategory = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setFormError('');
//         try {
//             // parent_id is always null here
//             await apiClient.post('/admin/categories', { name: newCategoryName, parent_id: null });
//             setNewCategoryName('');
//             fetchMainCategories(); // Re-fetch to show the new category
//         } catch (err) {
//             setFormError(err.response?.data?.message || 'An error occurred.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <Container fluid>
//             <h1 className="my-4">Manage Main Categories</h1>
//             <Row>
//                 {/* Create Form Column */}
//                 <Col md={5}>
//                     <Card className="bg-dark text-white">
//                         <Card.Header as="h5">Create New Main Category</Card.Header>
//                         <Card.Body>
//                             <Form onSubmit={handleCreateCategory}>
//                                 {formError && <Alert variant="danger">{formError}</Alert>}
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Main Category Name</Form.Label>
//                                     <Form.Control type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required />
//                                 </Form.Group>
//                                 <Button type="submit" variant="primary" disabled={isSubmitting}>
//                                     {isSubmitting ? <Spinner as="span" size="sm" /> : 'Create Category'}
//                                 </Button>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>

//                 {/* List Column */}
//                 <Col md={7}>
//                     <Card className="bg-dark text-white">
//                         <Card.Header as="h5">Existing Main Categories</Card.Header>
//                         <Card.Body>
//                             {loading && <div className="text-center"><Spinner /></div>}
//                             {error && <Alert variant="danger">{error}</Alert>}
//                             {!loading && !error && (
//                                 <ListGroup variant="flush">
//                                     {mainCategories.map(cat => (
//                                         <ListGroup.Item key={cat.id} className="bg-transparent text-white">{cat.name}</ListGroup.Item>
//                                     ))}
//                                 </ListGroup>
//                             )}
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default AdminCategoryPage;


//version

// In frontend/src/pages/AdminCategoryPage.jsx (REPLACE ENTIRE FILE)

// In frontend/src/pages/AdminCategoryPage.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
import apiClient from '../services/api';

function AdminCategoryPage() {
    const [mainCategories, setMainCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [newCategoryName, setNewCategoryName] = useState('');
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchMainCategories = () => {
        setLoading(true);
        apiClient.get('/admin/categories/all')
            .then(response => {
                setMainCategories(response.data);
            })
            .catch(err => setError('Could not load categories.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchMainCategories();
    }, []);

    // --- THIS IS THE COMPLETE FUNCTION ---
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError('');
        try {
            await apiClient.post('/admin/categories', { name: newCategoryName, parent_id: null });
            setNewCategoryName('');
            fetchMainCategories();
        } catch (err) {
            setFormError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm('Are you sure? Deleting a main category will also delete all its sub-categories.')) {
            try {
                await apiClient.delete(`/admin/categories/${categoryId}`);
                fetchMainCategories();
            } catch (err) {
                setError('Failed to delete category.');
            }
        }
    };

    return (
        <Container fluid>
            <h1 className="my-4">Manage Main Categories</h1>
            <Row>
                <Col md={5}>
                    <Card className="bg-dark text-white">
                        <Card.Header as="h5">Create New Main Category</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleCreateCategory}>
                                {formError && <Alert variant="danger">{formError}</Alert>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Main Category Name</Form.Label>
                                    <Form.Control type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required />
                                </Form.Group>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? <Spinner as="span" size="sm" /> : 'Create Category'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Card className="bg-dark text-white">
                        <Card.Header as="h5">Existing Main Categories</Card.Header>
                        <Card.Body>
                            {loading && <div className="text-center"><Spinner /></div>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            {!loading && !error && (
                                <ListGroup variant="flush">
                                    {mainCategories.map(cat => (
                                        <ListGroup.Item key={cat.id} className="d-flex justify-content-between align-items-center bg-transparent text-white">
                                            {cat.name}
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(cat.id)}>
                                                Delete
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminCategoryPage;

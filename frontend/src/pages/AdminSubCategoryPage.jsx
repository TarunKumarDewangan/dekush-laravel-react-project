// // In frontend/src/pages/AdminSubCategoryPage.jsx (NEW FILE)

// import { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
// import apiClient from '../services/api';

// function AdminSubCategoryPage() {
//     const [mainCategories, setMainCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     // Form state
//     const [newSubCategoryName, setNewSubCategoryName] = useState('');
//     const [parentId, setParentId] = useState('');
//     const [formError, setFormError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Fetch main categories (which contain their sub-categories)
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
//     const handleCreateSubCategory = async (e) => {
//         e.preventDefault();
//         if (!parentId) {
//             setFormError('You must select a main category.');
//             return;
//         }
//         setIsSubmitting(true);
//         setFormError('');

//         try {
//             await apiClient.post('/admin/categories', {
//                 name: newSubCategoryName,
//                 parent_id: parentId,
//             });
//             setNewSubCategoryName('');
//             setParentId('');
//             fetchMainCategories(); // Re-fetch to show the new sub-category
//         } catch (err) {
//             setFormError(err.response?.data?.message || 'An error occurred.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <Container fluid>
//             <h1 className="my-4">Manage Sub-Categories</h1>
//             <Row>
//                 {/* Create Form Column */}
//                 <Col md={5}>
//                     <Card className="bg-dark text-white">
//                         <Card.Header as="h5">Create New Sub-Category</Card.Header>
//                         <Card.Body>
//                             <Form onSubmit={handleCreateSubCategory}>
//                                 {formError && <Alert variant="danger">{formError}</Alert>}
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Parent Main Category</Form.Label>
//                                     <Form.Select value={parentId} onChange={(e) => setParentId(e.target.value)} required>
//                                         <option value="">-- Select a Main Category --</option>
//                                         {mainCategories.map(cat => (
//                                             <option key={cat.id} value={cat.id}>{cat.name}</option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Sub-Category Name</Form.Label>
//                                     <Form.Control type="text" value={newSubCategoryName} onChange={(e) => setNewSubCategoryName(e.target.value)} required />
//                                 </Form.Group>
//                                 <Button type="submit" variant="primary" disabled={isSubmitting}>
//                                     {isSubmitting ? <Spinner as="span" size="sm" /> : 'Create Sub-Category'}
//                                 </Button>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>

//                 {/* List Column */}
//                 <Col md={7}>
//                     <Card className="bg-dark text-white">
//                         <Card.Header as="h5">Existing Sub-Categories</Card.Header>
//                         <Card.Body>
//                             {loading && <div className="text-center"><Spinner /></div>}
//                             {error && <Alert variant="danger">{error}</Alert>}
//                             {!loading && !error && (
//                                 <ListGroup variant="flush">
//                                     {mainCategories.map(mainCat => (
//                                         mainCat.children.length > 0 && (
//                                             <div key={mainCat.id}>
//                                                 <ListGroup.Item className="bg-transparent text-white fw-bold">{mainCat.name}</ListGroup.Item>
//                                                 <ListGroup variant="flush" className="ms-4">
//                                                     {mainCat.children.map(subCat => (
//                                                         <ListGroup.Item key={subCat.id} className="bg-transparent text-white">- {subCat.name}</ListGroup.Item>
//                                                     ))}
//                                                 </ListGroup>
//                                             </div>
//                                         )
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

// export default AdminSubCategoryPage;


//version

// In frontend/src/pages/AdminSubCategoryPage.jsx (REPLACE ENTIRE FILE)

// In frontend/src/pages/AdminSubCategoryPage.jsx (REPLACE ENTIRE FILE)

// In frontend/src/pages/AdminSubCategoryPage.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';
import apiClient from '../services/api';

function AdminSubCategoryPage() {
    const [mainCategories, setMainCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [newSubCategoryName, setNewSubCategoryName] = useState('');
    const [parentId, setParentId] = useState('');
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [activeKey, setActiveKey] = useState(null);

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

    const handleCreateSubCategory = async (e) => {
        e.preventDefault();
        if (!parentId) {
            setFormError('You must select a main category.');
            return;
        }
        setIsSubmitting(true);
        setFormError('');

        try {
            await apiClient.post('/admin/categories', {
                name: newSubCategoryName,
                parent_id: parentId,
            });
            setNewSubCategoryName('');
            setParentId('');
            fetchMainCategories();
        } catch (err) {
            setFormError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this sub-category?')) {
            try {
                await apiClient.delete(`/admin/categories/${categoryId}`);
                fetchMainCategories();
            } catch (err) {
                setError('Failed to delete category.');
            }
        }
    };

    const handleToggle = (categoryId) => {
        setActiveKey(activeKey === categoryId ? null : categoryId);
    };

    return (
        <Container fluid>
            <h1 className="my-4">Manage Sub-Categories</h1>
            <Row>
                {/* --- THIS IS THE MISSING FORM COLUMN --- */}
                <Col md={5}>
                    <Card className="bg-dark text-white">
                        <Card.Header as="h5">Create New Sub-Category</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleCreateSubCategory}>
                                {formError && <Alert variant="danger">{formError}</Alert>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Parent Main Category</Form.Label>
                                    <Form.Select value={parentId} onChange={(e) => setParentId(e.target.value)} required>
                                        <option value="">-- Select a Main Category --</option>
                                        {mainCategories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Sub-Category Name</Form.Label>
                                    <Form.Control type="text" placeholder="e.g., MobileShop" value={newSubCategoryName} onChange={(e) => setNewSubCategoryName(e.target.value)} required />
                                </Form.Group>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? <Spinner as="span" size="sm" /> : 'Create Sub-Category'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* --- This is the Existing Categories List --- */}
                <Col md={7}>
                    <Card className="bg-dark text-white">
                        <Card.Header as="h5">Existing Sub-Categories</Card.Header>
                        <Card.Body>
                            {loading && <div className="text-center"><Spinner /></div>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            {!loading && !error && (
                                <ListGroup variant="flush">
                                    {mainCategories.map(mainCat => (
                                        mainCat.children && mainCat.children.length > 0 && (
                                            <div key={mainCat.id}>
                                                <ListGroup.Item
                                                    action
                                                    onClick={() => handleToggle(mainCat.id)}
                                                    className="d-flex justify-content-between align-items-center bg-transparent text-white fw-bold"
                                                >
                                                    {mainCat.name}
                                                    <span>{activeKey === mainCat.id ? '▼' : '▶'}</span>
                                                </ListGroup.Item>
                                                {activeKey === mainCat.id && (
                                                    <ListGroup variant="flush" className="ms-4">
                                                        {mainCat.children.map(subCat => (
                                                            <ListGroup.Item key={subCat.id} className="d-flex justify-content-between align-items-center bg-transparent text-white">
                                                                - {subCat.name}
                                                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(subCat.id)}>
                                                                    Delete
                                                                </Button>
                                                            </ListGroup.Item>
                                                        ))}
                                                    </ListGroup>
                                                )}
                                            </div>
                                        )
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

export default AdminSubCategoryPage;

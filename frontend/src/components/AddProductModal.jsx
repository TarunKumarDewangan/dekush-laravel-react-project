// // frontend/src/components/AddProductModal.jsx

// import { useState } from 'react';
// import { Modal, Button, Form, Alert } from 'react-bootstrap';
// import apiClient from '../services/api';

// function AddProductModal({ show, handleClose, onProductAdded }) {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             const response = await apiClient.post('/products', {
//                 name,
//                 description,
//                 price,
//             });
//             onProductAdded(response.data); // Pass the new product back to the dashboard
//             handleClose(); // Close the modal on success
//             // Reset form fields
//             setName('');
//             setDescription('');
//             setPrice('');
//         } catch (err) {
//             setError('Failed to add product. Please check your input.');
//             console.error(err);
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Add New Product</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 {error && <Alert variant="danger">{error}</Alert>}
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Product Name</Form.Label>
//                         <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Price</Form.Label>
//                         <Form.Control type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
//                     </Form.Group>
//                     <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//                     <Button variant="primary" type="submit" className="ms-2">Add Product</Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// }

// export default AddProductModal;


// frontend/src/components/AddProductModal.jsx

//version
// import { useState } from 'react';
// import { Modal, Button, Form, Alert } from 'react-bootstrap';
// import apiClient from '../services/api';

// function AddProductModal({ show, handleClose, onProductAdded, shopId }) { // <-- Receive shopId
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setIsSubmitting(true);
//         try {
//             const response = await apiClient.post('/products', {
//                 name,
//                 description,
//                 price,
//                 shop_id: shopId, // <-- SEND shop_id
//             });
//             onProductAdded(response.data);
//             handleClose();
//         } catch (err) {
//             if (err.response?.data?.errors) {
//                 setError(Object.values(err.response.data.errors).flat().join(' '));
//             } else {
//                 setError('Failed to add product.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleExited = () => {
//         setName(''); setDescription(''); setPrice(''); setError('');
//     };

//     return (
//         <Modal show={show} onHide={handleClose} onExited={handleExited}>
//             <Modal.Header closeButton><Modal.Title>Add New Product</Modal.Title></Modal.Header>
//             <Form onSubmit={handleSubmit}>
//                 <Modal.Body>
//                     {error && <Alert variant="danger">{error}</Alert>}
//                     <Form.Group className="mb-3">
//                         <Form.Label>Product Name</Form.Label>
//                         <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
//                     </Form.Group>
//                     {/* <Form.Group className="mb-3">
//                         <Form.Label>Price</Form.Label>
//                         <Form.Control type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
//                     </Form.Group> */}


//                     <Form.Group className="mb-3">
//                         <Form.Label>Price</Form.Label>
//                         <Form.Control
//                             type="number"
//                             step="0.01"
//                             value={price}
//                             onChange={(e) => setPrice(e.target.value)}
//                             required
//                             max="9999999999999.99" // Sets a reasonable upper limit
//                         />
//                     </Form.Group>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//                     <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Add Product'}</Button>
//                 </Modal.Footer>
//             </Form>
//         </Modal>
//     );
// }
// export default AddProductModal;


// In frontend/src/components/AddProductModal.jsx (REPLACE ENTIRE FILE)

import { useState } from 'react';
import { Modal, Button, Form, Alert, Image } from 'react-bootstrap'; // <-- Import Image
import apiClient from '../services/api';

function AddProductModal({ show, handleClose, onProductAdded, shopId }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    // --- NEW: State for the image file and its preview URL ---
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- NEW: Handler for when a user selects a file ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // --- UPDATED: handleSubmit to use FormData for the file upload ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // We MUST use FormData to send files
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('shop_id', shopId);
        if (image) {
            formData.append('image', image);
        }

        try {
            // The API call now sends formData
            const response = await apiClient.post('/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onProductAdded(response.data);
            handleClose(); // This will trigger handleExited
        } catch (err) {
            if (err.response?.data?.errors) {
                setError(Object.values(err.response.data.errors).flat().join(' '));
            } else {
                setError('Failed to add product.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- UPDATED: handleExited to reset the image state ---
    const handleExited = () => {
        setName('');
        setDescription('');
        setPrice('');
        setError('');
        setImage(null);
        setPreview(null);
    };

    return (
        <Modal show={show} onHide={handleClose} onExited={handleExited}>
            <Modal.Header closeButton><Modal.Title>Add New Product</Modal.Title></Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required max="9999999999999.99" />
                    </Form.Group>

                    {/* --- NEW: Image Upload Field --- */}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Image (Optional)</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                    </Form.Group>

                    {/* --- NEW: Image Preview --- */}
                    {preview && (
                        <div className="mb-3 text-center">
                            <p>Image Preview:</p>
                            <Image src={preview} thumbnail style={{ maxHeight: '150px' }} />
                        </div>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Add Product'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
export default AddProductModal;

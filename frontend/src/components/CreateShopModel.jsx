// // frontend/src/components/CreateShopModal.jsx

// import React, { useState } from 'react';
// import { Modal, Button, Form, Alert } from 'react-bootstrap';
// import apiClient from '../services/api';

// function CreateShopModal({ show, handleClose, onShopCreated }) {
//     // Add state for the new fields
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [address, setAddress] = useState('');
//     const [shopInchargePhone, setShopInchargePhone] = useState('');

//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setIsSubmitting(true);
//         try {
//             // Include new fields in the API call
//             const response = await apiClient.post('/owner/shops', {
//                 name,
//                 description,
//                 address,
//                 shop_incharge_phone: shopInchargePhone,
//             });
//             onShopCreated(response.data);
//             handleClose();
//         } catch (err) {
//             if (err.response?.data?.errors) {
//                 const messages = Object.values(err.response.data.errors).flat();
//                 setError(messages.join(' '));
//             } else {
//                 setError('An unexpected error occurred. Please try again.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Reset all form fields when the modal is fully closed
//     const handleExited = () => {
//         setName('');
//         setDescription('');
//         setAddress('');
//         setShopInchargePhone('');
//         setError('');
//     };

//     return (
//         <Modal show={show} onHide={handleClose} onExited={handleExited} backdrop="static" centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Create a New Shop</Modal.Title>
//             </Modal.Header>
//             <Form onSubmit={handleSubmit}>
//                 <Modal.Body>
//                     {error && <Alert variant="danger">{error}</Alert>}

//                     <Form.Group className="mb-3" controlId="createShopName">
//                         <Form.Label>Shop Name</Form.Label>
//                         <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//                     </Form.Group>

//                     {/* --- NEW FIELD: SHOP ADDRESS --- */}
//                     <Form.Group className="mb-3" controlId="createShopAddress">
//                         <Form.Label>Shop Address</Form.Label>
//                         <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
//                     </Form.Group>

//                     {/* --- NEW FIELD: SHOP INCHARGE PHONE --- */}
//                     <Form.Group className="mb-3" controlId="createShopInchargePhone">
//                         <Form.Label>Shop In-Charge Mobile No.</Form.Label>
//                         <Form.Control
//                             type="tel"
//                             value={shopInchargePhone}
//                             onChange={(e) => setShopInchargePhone(e.target.value)}
//                             required
//                             maxLength="10"
//                             placeholder="10-digit mobile number"
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="createShopDescription">
//                         <Form.Label>Shop Description</Form.Label>
//                         <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
//                     </Form.Group>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Cancel
//                     </Button>
//                     <Button variant="primary" type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? 'Creating...' : 'Create Shop'}
//                     </Button>
//                 </Modal.Footer>
//             </Form>
//         </Modal>
//     );
// }

// export default CreateShopModal;


// frontend/src/components/CreateShopModal.jsx

import React, { useState } from 'react';
// STEP 1: Add Image, Row, and Col to your imports
import { Modal, Button, Form, Alert, Image, Row, Col } from 'react-bootstrap';
import apiClient from '../services/api';

const MAX_IMAGES = 4; // Define a constant for the image limit

function CreateShopModal({ show, handleClose, onShopCreated }) {
    // These are your existing state variables
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [shopInchargePhone, setShopInchargePhone] = useState('');

    // STEP 2: Add new state for the image files and their previews
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    // Your existing UI state variables
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // STEP 3: Add this new function to handle file selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + images.length > MAX_IMAGES) {
            setError(`You can only upload a maximum of ${MAX_IMAGES} images.`);
            return;
        }

        setImages(prevImages => [...prevImages, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        setError(''); // Clear error on successful selection
    };

    // STEP 4: Replace your entire handleSubmit function with this one
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // FormData is REQUIRED for sending files
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('address', address);
        formData.append('shop_incharge_phone', shopInchargePhone);

        // Append each image file to the form data
        images.forEach(image => {
            // The 'images[]' name is critical for Laravel to see it as an array
            formData.append('images[]', image);
        });

        try {
            // The API call now sends formData instead of a plain object
            const response = await apiClient.post('/owner/shops', formData);
            onShopCreated(response.data);
            handleClose();
        } catch (err) {
            if (err.response?.data?.errors) {
                const messages = Object.values(err.response.data.errors).flat();
                setError(messages.join(' '));
            } else { setError('An unexpected error occurred.'); }
        } finally {
            setIsSubmitting(false);
        }
    };

    // STEP 5: Replace your handleExited function to reset the new image states too
    const handleExited = () => {
        setName('');
        setDescription('');
        setAddress('');
        setShopInchargePhone('');
        setImages([]); // Reset images
        setPreviews([]); // Reset previews
        setError('');
    };

    return (
        // Added size="lg" to the Modal to give more room
        <Modal show={show} onHide={handleClose} onExited={handleExited} backdrop="static" centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create a New Shop</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* ALL YOUR EXISTING FORM FIELDS ARE HERE (NO CHANGES NEEDED) */}
                    <Form.Group className="mb-3" controlId="createShopName">
                        <Form.Label>Shop Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="createShopAddress">
                        <Form.Label>Shop Address</Form.Label>
                        <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="createShopInchargePhone">
                        <Form.Label>Shop In-Charge Mobile No.</Form.Label>
                        <Form.Control type="tel" value={shopInchargePhone} onChange={(e) => setShopInchargePhone(e.target.value)} required maxLength="10" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="createShopDescription">
                        <Form.Label>Shop Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    {/* STEP 6: Add this new Form Group for the file input */}
                    <Form.Group className="mb-3" controlId="shopImages">
                        <Form.Label>Shop Images (up to {MAX_IMAGES}, optional)</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            multiple // This attribute allows selecting multiple files
                            onChange={handleImageChange}
                            disabled={images.length >= MAX_IMAGES} // Disables the button when 4 images are selected
                        />
                    </Form.Group>

                    {/* STEP 7: Add this new section to display image previews */}
                    {previews.length > 0 && (
                        <div className="mb-3">
                            <p>Image Previews:</p>
                            <Row>
                                {previews.map((preview, index) => (
                                    <Col xs={6} md={3} key={index} className="mb-3">
                                        <Image src={preview} thumbnail />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Shop'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateShopModal;

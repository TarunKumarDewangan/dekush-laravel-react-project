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

//version

//

//version

// In frontend/src/components/CreateShopModal.jsx (REPLACE ENTIRE FILE)

// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Alert, Image, Row, Col } from 'react-bootstrap';
// import apiClient from '../services/api';

// const MAX_IMAGES = 4;

// function CreateShopModal({ show, handleClose, onShopCreated }) {
//     // --- Form State ---
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [address, setAddress] = useState('');
//     const [shopInchargePhone, setShopInchargePhone] = useState('');
//     const [images, setImages] = useState([]);
//     const [previews, setPreviews] = useState([]);

//     // --- NEW: State for Categories ---
//     const [mainCategories, setMainCategories] = useState([]);
//     const [selectedMainCategory, setSelectedMainCategory] = useState('');
//     const [subCategories, setSubCategories] = useState([]);
//     const [selectedSubCategory, setSelectedSubCategory] = useState('');

//     // --- UI State ---
//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // --- Effect to fetch main categories when the modal is shown ---
//     useEffect(() => {
//         if (show) {
//             apiClient.get('/categories')
//                 .then(response => {
//                     setMainCategories(response.data);
//                 })
//                 .catch(err => {
//                     setError('Could not load categories.');
//                 });
//         }
//     }, [show]); // Re-run when the modal is opened

//     // --- Handler for when a main category is selected ---
//     const handleMainCategoryChange = (e) => {
//         const mainCatId = e.target.value;
//         setSelectedMainCategory(mainCatId);

//         // Reset sub-category when main category changes
//         setSelectedSubCategory('');
//         setSubCategories([]);

//         if (mainCatId) {
//             const selectedCat = mainCategories.find(cat => cat.id === parseInt(mainCatId));
//             if (selectedCat && selectedCat.children) {
//                 setSubCategories(selectedCat.children);
//             }
//         }
//     };

//     const handleImageChange = (e) => {
//         // ... (this function remains the same)
//     };

//     // --- UPDATED: handleSubmit to include category_id ---
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!selectedSubCategory) {
//             setError('You must select a sub-category.');
//             return;
//         }
//         setError('');
//         setIsSubmitting(true);

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('description', description);
//         formData.append('address', address);
//         formData.append('shop_incharge_phone', shopInchargePhone);
//         formData.append('category_id', selectedSubCategory); // <-- SEND THE SUB-CATEGORY ID
//         images.forEach(image => {
//             formData.append('images[]', image);
//         });

//         try {
//             const response = await apiClient.post('/owner/shops', formData);
//             onShopCreated(response.data);
//             handleClose(); // This will trigger handleExited
//         } catch (err) {
//             if (err.response?.data?.errors) {
//                 const messages = Object.values(err.response.data.errors).flat();
//                 setError(messages.join(' '));
//             } else { setError('An unexpected error occurred.'); }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // --- UPDATED: handleExited to reset new state variables ---
//     const handleExited = () => {
//         setName('');
//         setDescription('');
//         setAddress('');
//         setShopInchargePhone('');
//         setImages([]);
//         setPreviews([]);
//         setError('');
//         // Reset category state
//         setSelectedMainCategory('');
//         setSelectedSubCategory('');
//         setSubCategories([]);
//     };

//     return (
//         <Modal show={show} onHide={handleClose} onExited={handleExited} backdrop="static" centered size="lg">
//             <Modal.Header closeButton>
//                 <Modal.Title>Create a New Shop</Modal.Title>
//             </Modal.Header>
//             <Form onSubmit={handleSubmit}>
//                 <Modal.Body>
//                     {error && <Alert variant="danger">{error}</Alert>}

//                     {/* --- NEW: Category Selectors --- */}
//                     <Row>
//                         <Col md={6}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Main Category</Form.Label>
//                                 <Form.Select value={selectedMainCategory} onChange={handleMainCategoryChange} required>
//                                     <option value="">-- Select --</option>
//                                     {mainCategories.map(cat => (
//                                         <option key={cat.id} value={cat.id}>{cat.name}</option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         </Col>
//                         <Col md={6}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Sub-Category</Form.Label>
//                                 <Form.Select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)} required disabled={!selectedMainCategory}>
//                                     <option value="">-- Select --</option>
//                                     {subCategories.map(subCat => (
//                                         <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         </Col>
//                     </Row>

//                     {/* ... (The rest of the form fields for name, address, etc. remain the same) ... */}
//                     <Form.Group className="mb-3">
//                         <Form.Label>Shop Name</Form.Label>
//                         <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Shop Address</Form.Label>
//                         <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Shop In-Charge Mobile No.</Form.Label>
//                         <Form.Control type="tel" value={shopInchargePhone} onChange={(e) => setShopInchargePhone(e.target.value)} required maxLength="10" />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Shop Description</Form.Label>
//                         <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         {/* ... (Image upload JSX remains the same) ... */}
//                     </Form.Group>
//                     {previews.length > 0 && (
//                         <div className="mb-3">
//                             {/* ... (Image preview JSX remains the same) ... */}
//                         </div>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//                     <Button variant="primary" type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? 'Creating...' : 'Create Shop'}
//                     </Button>
//                 </Modal.Footer>
//             </Form>
//         </Modal>
//     );
// }

// export default CreateShopModal;


//version

// In frontend/src/components/CreateShopModal.jsx (REPLACE ENTIRE FILE)

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Image, Row, Col } from 'react-bootstrap';
import apiClient from '../services/api';

const MAX_IMAGES = 4;

function CreateShopModal({ show, handleClose, onShopCreated }) {
    // Form State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [shopInchargePhone, setShopInchargePhone] = useState('');
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    // Category State
    const [mainCategories, setMainCategories] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    // UI State
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Effect to fetch main categories
    useEffect(() => {
        if (show) {
            apiClient.get('/categories')
                .then(response => {
                    setMainCategories(response.data);
                })
                .catch(err => {
                    setError('Could not load categories.');
                });
        }
    }, [show]);

    // Handler for main category change
    const handleMainCategoryChange = (e) => {
        const mainCatId = e.target.value;
        setSelectedMainCategory(mainCatId);

        setSelectedSubCategory('');
        setSubCategories([]);

        if (mainCatId) {
            const selectedCat = mainCategories.find(cat => cat.id === parseInt(mainCatId));
            if (selectedCat && selectedCat.children) {
                setSubCategories(selectedCat.children);
            }
        }
    };

    // --- THIS IS THE IMAGE CHANGE HANDLER ---
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + images.length > MAX_IMAGES) {
            setError(`You can only upload a maximum of ${MAX_IMAGES} images.`);
            return;
        }

        setImages(prevImages => [...prevImages, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        setError('');
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSubCategory) {
            setError('You must select a sub-category.');
            return;
        }
        setError('');
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('address', address);
        formData.append('shop_incharge_phone', shopInchargePhone);
        formData.append('category_id', selectedSubCategory);
        images.forEach(image => {
            formData.append('images[]', image);
        });

        try {
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

    // Reset all state when the modal closes
    const handleExited = () => {
        setName('');
        setDescription('');
        setAddress('');
        setShopInchargePhone('');
        setImages([]);
        setPreviews([]);
        setError('');
        setSelectedMainCategory('');
        setSelectedSubCategory('');
        setSubCategories([]);
    };

    return (
        <Modal show={show} onHide={handleClose} onExited={handleExited} backdrop="static" centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create a New Shop</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Row>
                        <Col md={6}><Form.Group className="mb-3">
                            <Form.Label>Main Category</Form.Label>
                            <Form.Select value={selectedMainCategory} onChange={handleMainCategoryChange} required>
                                <option value="">-- Select --</option>
                                {mainCategories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group></Col>
                        <Col md={6}><Form.Group className="mb-3">
                            <Form.Label>Sub-Category</Form.Label>
                            <Form.Select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)} required disabled={!selectedMainCategory}>
                                <option value="">-- Select --</option>
                                {subCategories.map(subCat => (
                                    <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group></Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Shop Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Shop Address</Form.Label>
                        <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Shop In-Charge Mobile No.</Form.Label>
                        <Form.Control type="tel" value={shopInchargePhone} onChange={(e) => setShopInchargePhone(e.target.value)} required maxLength="10" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Shop Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    {/* --- THIS IS THE MISSING JSX FOR IMAGE UPLOADING --- */}
                    <Form.Group className="mb-3" controlId="shopImages">
                        <Form.Label>Shop Images (up to {MAX_IMAGES}, optional)</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            disabled={images.length >= MAX_IMAGES}
                        />
                    </Form.Group>
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

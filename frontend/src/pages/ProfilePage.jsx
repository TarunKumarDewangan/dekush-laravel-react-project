// In frontend/src/pages/ProfilePage.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, ListGroup, Modal } from 'react-bootstrap';
import apiClient from '../services/api';

function ProfilePage() {
    // --- 1. GET THE NEW updateUserContext FUNCTION ---
    const { user, updateUserContext } = useAuth();

    // State for modals
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // State for forms
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [passwordData, setPasswordData] = useState({ password: '', password_confirmation: '' });

    // State for UI feedback
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- FUNCTIONS TO OPEN MODALS AND PRE-FILL DATA ---
    const handleOpenProfileModal = () => {
        setName(user.name); // Pre-fill with current data
        setError('');
        setShowProfileModal(true);
    };
    const handleOpenPhoneModal = () => {
        setPhoneNumber(user.phone_number); // Pre-fill with current data
        setError('');
        setShowPhoneModal(true);
    };
     const handleOpenPasswordModal = () => {
        setPasswordData({ password: '', password_confirmation: '' }); // Always start fresh
        setError('');
        setShowPasswordModal(true);
    };

    // --- HANDLER FUNCTIONS FOR SUBMITTING EACH MODAL ---

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');
        try {
            const response = await apiClient.put('/user/profile', { name });
            updateUserContext(response.data); // <-- 2. UPDATE THE GLOBAL STATE
            setSuccess('Name updated successfully!');
            setShowProfileModal(false);
        } catch (err) {
            setError('Failed to update name.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');
        try {
            const response = await apiClient.put('/user/phone-number', { phone_number: phoneNumber });
            updateUserContext(response.data); // <-- 2. UPDATE THE GLOBAL STATE
            setSuccess('Mobile number updated successfully!');
            setShowPhoneModal(false);
        } catch (err) {
            setError(err.response?.data?.errors?.phone_number?.[0] || 'Failed to update mobile number.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');
        try {
            const response = await apiClient.put('/user/password', passwordData);
            setSuccess(response.data.message);
            setShowPasswordModal(false);
        } catch (err) {
            setError(err.response?.data?.errors?.password?.[0] || 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* --- MAIN PAGE VIEW (This will now update automatically) --- */}
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h1 className="mb-4">Account Settings</h1>
                        {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

                        <Card className="mb-4">
                            <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                                Profile Information
                                <Button variant="outline-secondary" size="sm" onClick={handleOpenProfileModal}>Edit</Button>
                            </Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item><strong>Name:</strong> {user.name}</ListGroup.Item>
                                <ListGroup.Item><strong>Email:</strong> {user.email || 'Not set'}</ListGroup.Item>
                            </ListGroup>
                        </Card>

                        <Card className="mb-4">
                            <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                                Mobile Number
                                <Button variant="outline-secondary" size="sm" onClick={handleOpenPhoneModal}>Edit</Button>
                            </Card.Header>
                             <ListGroup variant="flush">
                                <ListGroup.Item><strong>Current Number:</strong> {user.phone_number}</ListGroup.Item>
                            </ListGroup>
                        </Card>

                        <Card>
                            <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                                Password
                                <Button variant="outline-secondary" size="sm" onClick={handleOpenPasswordModal}>Change</Button>
                            </Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Click "Change" to set a new password.</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* --- MODALS FOR EDITING --- */}
            <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
                <Modal.Header closeButton><Modal.Title>Edit Profile Information</Modal.Title></Modal.Header>
                <Form onSubmit={handleProfileSubmit}>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowProfileModal(false)}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Name'}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showPhoneModal} onHide={() => setShowPhoneModal(false)} centered>
                <Modal.Header closeButton><Modal.Title>Change Mobile Number</Modal.Title></Modal.Header>
                <Form onSubmit={handlePhoneSubmit}>
                    <Modal.Body>
                         <Alert variant="warning">Changing your mobile number will change your login credential.</Alert>
                         {error && <Alert variant="danger">{error}</Alert>}
                         <Form.Group className="mb-3">
                            <Form.Label>New Mobile Number</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required maxLength="10"/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPhoneModal(false)}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Mobile Number'}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

             <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
                <Modal.Header closeButton><Modal.Title>Change Password</Modal.Title></Modal.Header>
                <Form onSubmit={handlePasswordSubmit}>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group className="mb-3"><Form.Label>New Password</Form.Label><Form.Control type="password" name="password" onChange={(e) => setPasswordData({...passwordData, password: e.target.value})} required placeholder="Minimum 8 characters"/></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Confirm New Password</Form.Label><Form.Control type="password" name="password_confirmation" onChange={(e) => setPasswordData({...passwordData, password_confirmation: e.target.value})} required /></Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update Password'}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default ProfilePage;

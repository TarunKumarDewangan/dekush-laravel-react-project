// src/pages/LanguageEntryPage.jsx

import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import apiClient from '../services/api';

function LanguageEntryPage() {
    const [formData, setFormData] = useState({
        source_language: 'English',
        source_phrase: '',
        target_language: 'Hindi',
        target_phrase: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await apiClient.post('/language-entries', formData);
            setSuccess(response.data.message);
            // Clear the form phrases
            setFormData(prev => ({ ...prev, source_phrase: '', target_phrase: '' }));
        } catch (err) {
            setError('Submission failed. Please check your input.');
        }
    };

    return (
        <Container className="my-5">
            <Card className="mx-auto" style={{ maxWidth: '600px' }}>
                <Card.Header as="h2" className="text-center">Language Entry</Card.Header>
                <Card.Body>
                    <Card.Text>Submit a word or phrase and its translation. Your entry will be reviewed before appearing publicly.</Card.Text>
                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Source Language</Form.Label>
                            <Form.Control type="text" name="source_language" value={formData.source_language} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Source Word/Phrase</Form.Label>
                            <Form.Control as="textarea" name="source_phrase" value={formData.source_phrase} onChange={handleChange} required />
                        </Form.Group>
                        <hr/>
                        <Form.Group className="mb-3">
                            <Form.Label>Target Language</Form.Label>
                            <Form.Control type="text" name="target_language" value={formData.target_language} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Target Word/Phrase</Form.Label>
                            <Form.Control as="textarea" name="target_phrase" value={formData.target_phrase} onChange={handleChange} required />
                        </Form.Group>
                        <div className="d-grid">
                            <Button type="submit" variant="primary">Submit for Verification</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LanguageEntryPage;

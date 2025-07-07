// src/pages/AmbulancePage.jsx

import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Table, Button } from 'react-bootstrap';
import apiClient from '../services/api';

function AmbulancePage() {
    const [ambulances, setAmbulances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copiedId, setCopiedId] = useState(null); // State for copy feedback

    useEffect(() => {
        apiClient.get('/ambulances')
            .then(response => {
                setAmbulances(response.data);
            })
            .catch(error => {
                console.error('Error fetching ambulance data:', error);
                setError('Failed to load ambulance contacts.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleCopy = (ambulance) => {
        navigator.clipboard.writeText(ambulance.phone_number);
        setCopiedId(ambulance.id);
        setTimeout(() => {
            setCopiedId(null);
        }, 2000);
    };

    if (loading) {
        return <div className="text-center my-5"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container className="my-4">
            <h1 className="mb-4">All Ambulance Services</h1>
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Service Name</th>
                        <th>City</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {ambulances.map(ambulance => (
                        <tr key={ambulance.id}>
                            <td>{ambulance.service_name}</td>
                            <td>{ambulance.city}</td>
                            <td>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>{ambulance.phone_number}</span>
                                    <Button
                                        size="sm"
                                        variant={copiedId === ambulance.id ? 'success' : 'secondary'}
                                        onClick={() => handleCopy(ambulance)}
                                    >
                                        {copiedId === ambulance.id ? 'Copied!' : 'Copy'}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default AmbulancePage;

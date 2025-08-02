// In frontend/src/pages/LoginPage.jsx (REPLACE ENTIRE FILE)

import { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    /**
     * This function handles the input change.
     * It prevents typing more than 10 digits if the input is a number.
     */
    const handleIdentifierChange = (e) => {
        const value = e.target.value;

        // Regular expression to check if the string contains only digits.
        const isNumeric = /^\d*$/.test(value);

        // If the value is numeric AND is already 10 digits long,
        // we prevent any more characters from being added.
        if (isNumeric && value.length > 10) {
            return;
        }

        // Otherwise, update the state normally.
        setLoginIdentifier(value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(loginIdentifier, password);
            navigate('/');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <Row className="justify-content-md-center">
            <Col md={6}>
                <h2 className="mt-4">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formLoginIdentifier">
                        <Form.Label>Email or Mobile Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your email or mobile number"
                            value={loginIdentifier}
                            onChange={handleIdentifierChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            // THIS IS THE FIX: Changed 'e.targe' to 'e.target'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

export default LoginPage;

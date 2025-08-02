// // frontend/src/pages/RegisterPage.jsx

// import { useState } from 'react';
// import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import apiClient from '../services/api';

// function RegisterPage() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordConfirmation, setPasswordConfirmation] = useState('');
//     const [role, setRole] = useState('user'); // Default role
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess('');

//         try {
//             const response = await apiClient.post('/register', {
//                 name,
//                 email,
//                 password,
//                 password_confirmation: passwordConfirmation,
//                 role,
//             });

//             setSuccess('Registration successful! You can now log in.');

//             // Optionally, redirect to login page after a short delay
//             setTimeout(() => {
//                 navigate('/login');
//             }, 2000);

//         } catch (error) {
//             // Handle validation errors from Laravel
//             if (error.response && error.response.status === 422) {
//                 const messages = Object.values(error.response.data.errors).flat();
//                 setError(messages.join(' '));
//             } else {
//                 setError('An unexpected error occurred. Please try again.');
//             }
//             console.error('Registration failed:', error);
//         }
//     };

//    return (
//         <Container>
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     <h2 className="mt-4">Register a New Account</h2>
//                     {error && <Alert variant="danger">{error}</Alert>}
//                     {success && <Alert variant="success">{success}</Alert>}
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3" controlId="formBasicName">
//                             <Form.Label>Full Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Email address</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
//                             <Form.Label>Confirm Password</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 placeholder="Confirm Password"
//                                 value={passwordConfirmation}
//                                 onChange={(e) => setPasswordConfirmation(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicRole">
//                             <Form.Label>I want to:</Form.Label>
//                             <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
//                                 <option value="user">Browse Shops</option>
//                                 <option value="shopowner">Open my own Shop</option>
//                             </Form.Select>
//                         </Form.Group>

//                         <Button variant="primary" type="submit">
//                             Register
//                         </Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default RegisterPage;


// frontend/src/pages/RegisterPage.jsx

// frontend/src/pages/RegisterPage.jsx


//version
// import { useState } from 'react';
// // --- ADD THIS: Import InputGroup ---
// import { Form, Button, Container, Row, Col, Alert, InputGroup } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import apiClient from '../services/api';
// // --- ADD THIS: Import icons (after running 'npm install react-bootstrap-icons') ---
// import { Eye, EyeSlash } from 'react-bootstrap-icons';

// function RegisterPage() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordConfirmation, setPasswordConfirmation] = useState('');
//     const [role, setRole] = useState('user');
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState('');
//     const navigate = useNavigate();

//     // --- ADD THIS: State for password visibility ---
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess('');

//         try {
//             await apiClient.post('/register', {
//                 name,
//                 email,
//                 // --- FIX: Ensure this key matches your Laravel validation rule ('phone_number') ---
//                 phone_number: phoneNumber,
//                 password,
//                 password_confirmation: passwordConfirmation,
//                 role,
//             });

//             setSuccess('Registration successful! You can now log in.');

//             setTimeout(() => {
//                 navigate('/login');
//             }, 2000);

//         } catch (error) {
//             if (error.response && error.response.status === 422) {
//                 const messages = Object.values(error.response.data.errors).flat();
//                 setError(messages.join(' '));
//             } else {
//                 setError('An unexpected error occurred. Please try again.');
//             }
//             console.error('Registration failed:', error);
//         }
//     };

//    return (
//         <Container>
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     <h2 className="mt-4">Register a New Account</h2>
//                     {error && <Alert variant="danger">{error}</Alert>}
//                     {success && <Alert variant="success">{success}</Alert>}
//                     <Form onSubmit={handleSubmit}>
//                         {/* Name, Email, and Phone number fields remain the same */}
//                         <Form.Group className="mb-3" controlId="formBasicName">
//                             <Form.Label>Full Name</Form.Label>
//                             <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Email address</Form.Label>
//                             <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="formBasicPhone">
//                             <Form.Label>Mobile Number</Form.Label>
//                             <Form.Control
//                                 type="tel"
//                                 placeholder="Enter 10-digit mobile number"
//                                 value={phoneNumber}
//                                 onChange={(e) => setPhoneNumber(e.target.value)}
//                                 required
//                                 maxLength="10"
//                             />
//                         </Form.Group>

//                         {/* --- MODIFIED PASSWORD FIELD --- */}
//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             <Form.Label>Password</Form.Label>
//                             <InputGroup>
//                                 <Form.Control
//                                     type={showPassword ? 'text' : 'password'}
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                 />
//                                 <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
//                                     {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
//                                 </Button>
//                             </InputGroup>
//                         </Form.Group>

//                         {/* --- MODIFIED CONFIRM PASSWORD FIELD --- */}
//                         <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
//                             <Form.Label>Confirm Password</Form.Label>
//                             <InputGroup>
//                                 <Form.Control
//                                     type={showConfirmPassword ? 'text' : 'password'}
//                                     placeholder="Confirm Password"
//                                     value={passwordConfirmation}
//                                     onChange={(e) => setPasswordConfirmation(e.target.value)}
//                                     required
//                                 />
//                                 <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                                     {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
//                                 </Button>
//                             </InputGroup>
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicRole">
//                             <Form.Label>I want to:</Form.Label>
//                             <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
//                                 <option value="user">Browse Shops</option>
//                                 <option value="shopowner">Open my own Shop</option>
//                             </Form.Select>
//                         </Form.Group>

//                         <Button variant="primary" type="submit">
//                             Register
//                         </Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default RegisterPage;


// In frontend/src/pages/RegisterPage.jsx (REPLACE ENTIRE FILE)
//version
// import { useState } from 'react';
// import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import apiClient from '../services/api';

// function RegisterPage() {
//     // Form State
//     const [name, setName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordConfirmation, setPasswordConfirmation] = useState('');
//     const [role, setRole] = useState('user');

//     // UI/OTP State
//     const [otp, setOtp] = useState('');
//     const [showOtpInput, setShowOtpInput] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState('');
//     const navigate = useNavigate();

//     const handleRequestOtp = async (e) => {
//         e.preventDefault();
//         setError('');
//         setIsSubmitting(true);
//         try {
//             await apiClient.post('/send-otp', { phone_number: phoneNumber });
//             setShowOtpInput(true);
//             setSuccess('OTP sent successfully!');
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to send OTP.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleVerifyAndRegister = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setIsSubmitting(true);
//         try {
//             await apiClient.post('/verify-and-register', {
//                 name,
//                 phone_number: phoneNumber,
//                 password,
//                 password_confirmation: passwordConfirmation,
//                 role,
//                 otp,
//             });
//             setSuccess('Registration successful! Redirecting to login...');
//             setTimeout(() => navigate('/login'), 2000);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Registration failed.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//    return (
//         <Container>
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     <h2 className="mt-4">Register a New Account</h2>
//                     {error && <Alert variant="danger">{error}</Alert>}
//                     {success && <Alert variant="success">{success}</Alert>}

//                     {!showOtpInput ? (
//                         <Form onSubmit={handleRequestOtp}>
//                             <Form.Group className="mb-3"><Form.Label>Full Name</Form.Label><Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
//                             <Form.Group className="mb-3"><Form.Label>Mobile Number</Form.Label><Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required maxLength="10" /></Form.Group>
//                             <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></Form.Group>
//                             <Form.Group className="mb-3"><Form.Label>Confirm Password</Form.Label><Form.Control type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required /></Form.Group>
//                             <Form.Group className="mb-3"><Form.Label>I want to:</Form.Label><Form.Select value={role} onChange={(e) => setRole(e.target.value)}><option value="user">Browse Shops</option><option value="shopowner">Open my own Shop</option></Form.Select></Form.Group>
//                             <Button variant="primary" type="submit" disabled={isSubmitting}>
//                                 {isSubmitting ? 'Sending...' : 'Send Verification OTP'}
//                             </Button>
//                         </Form>
//                     ) : (
//                         <Form onSubmit={handleVerifyAndRegister}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Enter OTP</Form.Label>
//                                 <Form.Control type="text" placeholder="6-digit code" value={otp} onChange={(e) => setOtp(e.target.value)} required />
//                             </Form.Group>
//                             <Button variant="primary" type="submit" disabled={isSubmitting}>
//                                 {isSubmitting ? 'Verifying...' : 'Verify & Register'}
//                             </Button>
//                         </Form>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// }
// export default RegisterPage;


// In frontend/src/pages/RegisterPage.jsx (SIMPLE VERSION)

import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

function RegisterPage() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess('');
        try {
            await apiClient.post('/register', {
                name,
                phone_number: phoneNumber,
                password,
                password_confirmation: passwordConfirmation,
                role,
            });
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            if (err.response?.data?.errors) {
                setError(Object.values(err.response.data.errors).flat().join(' '));
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

   return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mt-4">Register a New Account</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3"><Form.Label>Full Name</Form.Label><Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Mobile Number</Form.Label><Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required maxLength="10" /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Confirm Password</Form.Label><Form.Control type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>I want to:</Form.Label><Form.Select value={role} onChange={(e) => setRole(e.target.value)}><option value="user">Browse Shops</option><option value="shopowner">Open my own Shop</option></Form.Select></Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
export default RegisterPage;

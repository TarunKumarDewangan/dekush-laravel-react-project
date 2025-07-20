// // import { useState, useEffect } from 'react';
// // import { Row, Col, Spinner, Alert, Button, Table,Card } from 'react-bootstrap';
// // import { Link } from 'react-router-dom';
// // import apiClient from '../services/api';
// // import ShopCard from '../components/ShopCard';

// // function HomePage() {
// //     // State for all data types
// //     const [shops, setShops] = useState([]);
// //     const [hospitals, setHospitals] = useState([]);
// //     const [ambulances, setAmbulances] = useState([]);

// //     // State to track which number was copied for user feedback
// //     const [copiedId, setCopiedId] = useState(null);

// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 // Fetch all data sources concurrently for better performance
// //                 const [shopsResponse, hospitalsResponse, ambulancesResponse] = await Promise.all([
// //                     apiClient.get('/shops'),
// //                     apiClient.get('/hospitals'),
// //                     apiClient.get('/ambulances')
// //                 ]);
// //                 setShops(shopsResponse.data);
// //                 setHospitals(hospitalsResponse.data);
// //                 setAmbulances(ambulancesResponse.data);
// //             } catch (error) {
// //                 console.error('Error fetching homepage data:', error);
// //                 setError('Failed to load page content. Please try again later.');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchData();
// //     }, []);

// //     // Function to handle the copy-to-clipboard action
// //     const handleCopy = (ambulance) => {
// //         navigator.clipboard.writeText(ambulance.phone_number);
// //         setCopiedId(ambulance.id);
// //         // Reset the "Copied!" text after 2 seconds
// //         setTimeout(() => {
// //             setCopiedId(null);
// //         }, 2000);
// //     };

// //     if (loading) {
// //         return <div className="text-center my-5"><Spinner animation="border" /></div>;
// //     }

// //     if (error) {
// //         return <Alert variant="danger">{error}</Alert>;
// //     }

// //     return (
// //         <>
// //             {/* Section 1: Featured Shops */}
// //             <div className="d-flex justify-content-between align-items-center my-4">
// //                 <h2>Featured Shops</h2>
// //                 <Button as={Link} to="/shops" variant="outline-primary">View All</Button>
// //             </div>
// //             <Row xs={1} md={2} lg={3} className="g-4">
// //                 {/* Show only the first 3 shops as a preview */}
// //                 {shops.slice(0, 3).map(shop => (
// //                     <Col key={shop.id}>
// //                         <ShopCard shop={shop} />
// //                     </Col>
// //                 ))}
// //             </Row>

// //             <hr className="my-5" />

// //             {/* Section 2: Featured Hospitals */}
// //             <div className="d-flex justify-content-between align-items-center my-4">
// //                 <h2>Nearby Hospitals</h2>
// //                 <Button as={Link} to="/hospitals" variant="outline-primary">View All</Button>
// //             </div>
// //             <p>(Hospital cards will be displayed here soon)</p>
// //             {/* We will build the HospitalCard component and display hospitals here in the next step */}

// //             <hr className="my-5" />

// //             {/* Section 3: AMBULANCE SERVICES */}
// //             <div className="d-flex justify-content-between align-items-center my-4">
// //                 <h2>Ambulance Contacts</h2>
// //                 <Button as={Link} to="/ambulances" variant="outline-danger">View All Contacts</Button>
// //             </div>
// //             <Row>
// //                 <Col>
// //                     <Table striped bordered hover responsive>
// //                         <thead className="table-dark">
// //                             <tr>
// //                                 <th>Service Name</th>
// //                                 <th>City</th>
// //                                 <th>Phone Number</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {ambulances.slice(0, 5).map(ambulance => (
// //                                 <tr key={ambulance.id}>
// //                                     <td>{ambulance.service_name}</td>
// //                                     <td>{ambulance.city}</td>
// //                                     <td>
// //                                         <div className="d-flex justify-content-between align-items-center">
// //                                             <span>{ambulance.phone_number}</span>
// //                                             <Button
// //                                                 size="sm"
// //                                                 variant={copiedId === ambulance.id ? 'success' : 'secondary'}
// //                                                 onClick={() => handleCopy(ambulance)}
// //                                             >
// //                                                 {copiedId === ambulance.id ? 'Copied!' : 'Copy'}
// //                                             </Button>
// //                                         </div>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </Table>
// //                 </Col>
// //             </Row>
// //             <div className="d-flex justify-content-between align-items-center my-4">
// //              <h2>Learn a Language</h2>
// //                 </div>
// //                 <Row>
// //                     <Col>
// //                         <Card className="text-center">
// //                             <Card.Body>
// //                                 <Card.Title>Contribute to Our Dictionary</Card.Title>
// //                                 <Card.Text>
// //                                     Help us build a community-driven dictionary. Submit a word or phrase and its translation for others to learn.
// //                                 </Card.Text>
// //                                 <Button as={Link} to="/language-entry" variant="success">Add an Entry</Button>
// //                             </Card.Body>
// //                         </Card>
// //                     </Col>
// //                 </Row>
// //         </>
// //     );
// // }

// // export default HomePage;


// // frontend/src/pages/HomePage.jsx

// // frontend/src/pages/HomePage.jsx

// //version

// // import { useState, useEffect } from 'react';
// // import { Row, Col, Spinner, Alert, Button, Table, Card } from 'react-bootstrap';
// // import { Link } from 'react-router-dom';
// // import apiClient from '../services/api';
// // import ShopCard from '../components/ShopCard';

// // function HomePage() {
// //     // State for all data types
// //     const [shops, setShops] = useState([]);
// //     const [hospitals, setHospitals] = useState([]);
// //     const [ambulances, setAmbulances] = useState([]);

// //     // State to track which number was copied for user feedback
// //     const [copiedId, setCopiedId] = useState(null);

// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 // Fetch all data sources concurrently for better performance
// //                 const [shopsResponse, hospitalsResponse, ambulancesResponse] = await Promise.all([
// //                     apiClient.get('/shops'),
// //                     apiClient.get('/hospitals'),
// //                     apiClient.get('/ambulances')
// //                 ]);
// //                 setShops(shopsResponse.data);
// //                 setHospitals(hospitalsResponse.data);
// //                 setAmbulances(ambulancesResponse.data);
// //             } catch (error) {
// //                 console.error('Error fetching homepage data:', error);
// //                 setError('Failed to load page content. Please try again later.');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchData();
// //     }, []);

// //     // Function to handle the copy-to-clipboard action
// //     const handleCopy = (ambulance) => {
// //         navigator.clipboard.writeText(ambulance.phone_number);
// //         setCopiedId(ambulance.id);
// //         // Reset the "Copied!" text after 2 seconds
// //         setTimeout(() => {
// //             setCopiedId(null);
// //         }, 2000);
// //     };

// //     if (loading) {
// //         return <div className="text-center my-5"><Spinner animation="border" /></div>;
// //     }

// //     if (error) {
// //         return <Alert variant="danger">{error}</Alert>;
// //     }

// //     return (
// //         <>
// //             {/* Section 1: Featured Shops */}
// //             <div className="d-flex justify-content-between align-items-center my-4">
// //                 <h2>Featured Shops</h2>
// //                 <Button as={Link} to="/shops" variant="outline-primary">View All</Button>
// //             </div>
// //             <Row xs={1} md={2} lg={3} className="g-4">
// //                 {/* Show only the first 3 shops as a preview */}
// //                 {shops.slice(0, 3).map(shop => (
// //                     <Col key={shop.id}>
// //                         <ShopCard shop={shop} />
// //                     </Col>
// //                 ))}
// //             </Row>

// //             <hr className="my-5" />

// //             {/* Section 2: Featured Hospitals */}
// //             <div className="d-flex justify-content-between align-items-center my-4">
// //                 <h2>Nearby Hospitals</h2>
// //                 <Button as={Link} to="/hospitals" variant="outline-primary">View All</Button>
// //             </div>
// //             <p>(Hospital cards will be displayed here soon)</p>
// //             {/* We will build the HospitalCard component and display hospitals here in the next step */}

// //             <hr className="my-5" />

// //             {/* Section 3: AMBULANCE SERVICES */}
// //             <div className="d-flex justify-content-between align-items-center my-4">
// //                 <h2>Ambulance Contacts</h2>
// //                 <Button as={Link} to="/ambulances" variant="outline-danger">View All Contacts</Button>
// //             </div>
// //             <Row>
// //                 <Col>
// //                     <Table striped bordered hover responsive>
// //                         <thead className="table-dark">
// //                             <tr>
// //                                 <th>Service Name</th>
// //                                 <th>City</th>
// //                                 <th>Phone Number</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {ambulances.slice(0, 5).map(ambulance => (
// //                                 <tr key={ambulance.id}>
// //                                     <td>{ambulance.service_name}</td>
// //                                     <td>{ambulance.city}</td>
// //                                     <td>
// //                                         <div className="d-flex justify-content-between align-items-center">
// //                                             <span>{ambulance.phone_number}</span>
// //                                             <Button
// //                                                 size="sm"
// //                                                 variant={copiedId === ambulance.id ? 'success' : 'secondary'}
// //                                                 onClick={() => handleCopy(ambulance)}
// //                                             >
// //                                                 {copiedId === ambulance.id ? 'Copied!' : 'Copy'}
// //                                             </Button>
// //                                         </div>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </Table>
// //                 </Col>
// //             </Row>
// //         </>
// //     );
// // }

// // export default HomePage;



// //version

// // In frontend/src/pages/HomePage.jsx (REPLACE ENTIRE FILE)

// import { useState, useEffect } from 'react';
// import { Row, Col, Spinner, Alert, Button, Table, Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import apiClient from '../services/api';
// import ShopCard from '../components/ShopCard';
// import CategoryCard from '../components/CategoryCard'; // <-- IMPORT THE NEW COMPONENT

// function HomePage() {
//     // State for all data types
//     const [categories, setCategories] = useState([]); // <-- NEW STATE FOR CATEGORIES
//     const [shops, setShops] = useState([]);
//     const [hospitals, setHospitals] = useState([]);
//     const [ambulances, setAmbulances] = useState([]);
//     const [copiedId, setCopiedId] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch all data sources concurrently, including the new categories
//                 const [categoriesResponse, shopsResponse, hospitalsResponse, ambulancesResponse] = await Promise.all([
//                     apiClient.get('/categories'), // <-- NEW API CALL
//                     apiClient.get('/shops'),
//                     apiClient.get('/hospitals'),
//                     apiClient.get('/ambulances')
//                 ]);
//                 setCategories(categoriesResponse.data); // <-- SET CATEGORY STATE
//                 setShops(shopsResponse.data.shops || []);
//                 setHospitals(hospitalsResponse.data.hospitals || []);
//                 setAmbulances(ambulancesResponse.data.ambulances || []);
//             } catch (error) {
//                 console.error('Error fetching homepage data:', error);
//                 setError('Failed to load page content. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleCopy = (ambulance) => {
//         navigator.clipboard.writeText(ambulance.phone_number);
//         setCopiedId(ambulance.id);
//         setTimeout(() => setCopiedId(null), 2000);
//     };

//     if (loading) {
//         return <div className="text-center my-5"><Spinner animation="border" /></div>;
//     }
//     if (error) {
//         return <Alert variant="danger">{error}</Alert>;
//     }

//     return (
//         <>
//             {/* --- NEW: Categories Section --- */}
//             {categories.length > 0 && (
//                 <section className="mb-5">
//                      <div className="p-4 rounded" style={{ backgroundColor: 'rgba(15, 15, 15, 0.5)' }}>
//                         <h2 className="mb-4 text-center">Browse by Category</h2>
//                         <Row xs={2} sm={3} md={4} lg={6} className="g-3">
//                             {categories.map(category => (
//                                 <Col key={category.id}>
//                                     <CategoryCard category={category} />
//                                 </Col>
//                             ))}
//                         </Row>
//                     </div>
//                 </section>
//             )}

//             {/* Section 1: Featured Shops */}
//             <div className="d-flex justify-content-between align-items-center my-4">
//                 <h2>Featured Shops</h2>
//                 <Button as={Link} to="/shops" variant="outline-primary">View All</Button>
//             </div>
//             <Row xs={1} md={2} lg={3} className="g-4">
//                 {shops.slice(0, 3).map(shop => (
//                     <Col key={shop.id}>
//                         <ShopCard shop={shop} />
//                     </Col>
//                 ))}
//             </Row>

//             <hr className="my-5" />

//             {/* ... (The rest of the file for Hospitals and Ambulances remains the same) ... */}
//             {/* Section 2: Featured Hospitals */}
//             <div className="d-flex justify-content-between align-items-center my-4">
//                 <h2>Nearby Hospitals</h2>
//                 <Button as={Link} to="/hospitals" variant="outline-primary">View All</Button>
//             </div>
//             <p>(Hospital cards will be displayed here soon)</p>
//             <hr className="my-5" />

//             {/* Section 3: AMBULANCE SERVICES */}
//             <div className="d-flex justify-content-between align-items-center my-4">
//                 <h2>Ambulance Contacts</h2>
//                 <Button as={Link} to="/ambulances" variant="outline-danger">View All Contacts</Button>
//             </div>
//             <Row>
//                 <Col>
//                     <Table striped bordered hover responsive variant="dark">
//                         <thead>
//                             <tr><th>Service Name</th><th>City</th><th>Phone Number</th></tr>
//                         </thead>
//                         <tbody>
//                             {ambulances.slice(0, 5).map(ambulance => (
//                                 <tr key={ambulance.id}>
//                                     <td>{ambulance.service_name}</td>
//                                     <td>{ambulance.city}</td>
//                                     <td>
//                                         <div className="d-flex justify-content-between align-items-center">
//                                             <span>{ambulance.phone_number}</span>
//                                             <Button size="sm" variant={copiedId === ambulance.id ? 'success' : 'secondary'} onClick={() => handleCopy(ambulance)}>
//                                                 {copiedId === ambulance.id ? 'Copied!' : 'Copy'}
//                                             </Button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
//         </>
//     );
// }

// export default HomePage;



//version

// In frontend/src/pages/HomePage.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Button, Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import ShopCard from '../components/ShopCard';
import CategoryNav from '../components/CategoryNav'; // <-- IMPORT THE NEW COMPONENT

function HomePage() {
    // We no longer need to fetch categories here, CategoryNav does it itself.
    const [shops, setShops] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [ambulances, setAmbulances] = useState([]);
    const [copiedId, setCopiedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all data sources EXCEPT categories
                const [shopsResponse, hospitalsResponse, ambulancesResponse] = await Promise.all([
                    apiClient.get('/shops'),
                    apiClient.get('/hospitals'),
                    apiClient.get('/ambulances')
                ]);
                //setShops(shopsResponse.data.shops || []);
                setShops(shopsResponse.data.shops || []);
                setHospitals(hospitalsResponse.data.hospitals || []);
                setAmbulances(ambulancesResponse.data.ambulances || []);
            } catch (error) {
                console.error('Error fetching homepage data:', error);
                setError('Failed to load page content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCopy = (ambulance) => {
        navigator.clipboard.writeText(ambulance.phone_number);
        setCopiedId(ambulance.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (loading) {
        return <div className="text-center my-5"><Spinner animation="border" /></div>;
    }
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        // Use a React Fragment <> because we no longer need the Container from DefaultLayout
        <>
            {/* --- THIS IS OUR NEW CATEGORY NAVIGATION BAR --- */}
            <CategoryNav />

            {/* The rest of the page content now needs its own Container */}
            <Container className="mt-4">
                {/* Section 1: Featured Shops */}
                <div className="d-flex justify-content-between align-items-center my-4">
                    <h2>Featured Shops</h2>
                    <Button as={Link} to="/shops" variant="outline-primary">View All</Button>
                </div>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {shops.slice(0, 3).map(shop => (
                        <Col key={shop.id}>
                            <ShopCard shop={shop} />
                        </Col>
                    ))}
                </Row>

                <hr className="my-5" />

                {/* ... (The rest of the file for Hospitals and Ambulances remains the same) ... */}
                <div className="d-flex justify-content-between align-items-center my-4">
                    <h2>Nearby Hospitals</h2>
                    <Button as={Link} to="/hospitals" variant="outline-primary">View All</Button>
                </div>
                <p>(Hospital cards will be displayed here soon)</p>
                <hr className="my-5" />
                <div className="d-flex justify-content-between align-items-center my-4">
                    <h2>Ambulance Contacts</h2>
                    <Button as={Link} to="/ambulances" variant="outline-danger">View All Contacts</Button>
                </div>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive variant="dark">
                            {/* ... table content ... */}
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomePage;

// // In frontend/src/pages/SearchPage.jsx (NEW FILE)

//const { version } = require("react");

// import { useState, useEffect } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import { Container, Row, Col, Spinner, Alert, Card, ListGroup } from 'react-bootstrap';
// import apiClient from '../services/api';
// import ShopCard from '../components/ShopCard'; // Reuse the existing ShopCard component

// function SearchPage() {
//     const [searchParams] = useSearchParams();
//     const query = searchParams.get('q');

//     const [results, setResults] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         if (!query) {
//             setLoading(false);
//             return;
//         }

//         setLoading(true);
//         setError('');

//         apiClient.get(`/search?q=${query}`)
//             .then(response => {
//                 setResults(response.data);
//             })
//             .catch(err => {
//                 console.error('Search failed:', err);
//                 setError('Failed to fetch search results.');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });

//     }, [query]); // Re-run the effect whenever the query in the URL changes

//     const renderResults = () => {
//         if (!results) return null;

//         const { shops, products, hospitals, ambulances } = results;
//         const totalResults = shops.length + products.length + hospitals.length + ambulances.length;

//         if (totalResults === 0) {
//             return <Alert variant="info">No results found for "{query}".</Alert>;
//         }

//         return (
//             <>
//                 {/* Shops Section */}
//                 {shops.length > 0 && (
//                     <section className="mb-5">
//                         <h2>Shops</h2>
//                         <Row xs={1} md={2} lg={3} className="g-4">
//                             {shops.map(shop => (
//                                 <Col key={`shop-${shop.id}`}>
//                                     <ShopCard shop={shop} />
//                                 </Col>
//                             ))}
//                         </Row>
//                     </section>
//                 )}

//                 {/* Products Section */}
//                 {products.length > 0 && (
//                      <section className="mb-5">
//                         <h2>Products</h2>
//                          <ListGroup variant="flush">
//                              {products.map(product => (
//                                  <ListGroup.Item key={`product-${product.id}`}>
//                                      <strong>{product.name}</strong> from <Link to={`/shops/${product.shop.id}`}>{product.shop.name}</Link>
//                                      <p className="text-muted mb-0">{product.description}</p>
//                                  </ListGroup.Item>
//                              ))}
//                          </ListGroup>
//                     </section>
//                 )}

//                 {/* Hospitals and Ambulances could be similarly rendered */}
//             </>
//         );
//     };

//     return (
//         <Container>
//             <h1 className="my-4">Search Results for "{query}"</h1>
//             {loading && <div className="text-center my-5"><Spinner animation="border" /></div>}
//             {error && <Alert variant="danger">{error}</Alert>}
//             {!loading && !error && renderResults()}
//         </Container>
//     );
// }

// export default SearchPage;


//version
// In frontend/src/pages/SearchPage.jsx (REPLACE ENTIRE FILE)

// In frontend/src/pages/SearchPage.jsx (REPLACE ENTIRE FILE)

import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, ListGroup, Table, Button } from 'react-bootstrap';
import apiClient from '../services/api';
import ShopCard from '../components/ShopCard';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        if (!query) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError('');
        apiClient.get(`/search?q=${query}`)
            .then(response => {
                setResults(response.data);
            })
            .catch(err => {
                console.error('Search failed:', err);
                setError('Failed to fetch search results.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query]);

    const handleCopy = (ambulance) => {
        navigator.clipboard.writeText(ambulance.phone_number);
        setCopiedId(ambulance.id);
        setTimeout(() => {
            setCopiedId(null);
        }, 2000);
    };

    const renderResults = () => {
        if (!results) return null;
        const { shops, products, hospitals, ambulances } = results;
        const totalResults = shops.length + products.length + hospitals.length + ambulances.length;

        if (totalResults === 0) {
            return <Alert variant="info">No results found for "{query}".</Alert>;
        }

        return (
            <>
                {/* --- THIS IS THE CORRECTED, COMPLETE CODE --- */}

                {/* Shops Section */}
                {shops.length > 0 && (
                    <section className="mb-5">
                        <h2>Shops</h2>
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {shops.map(shop => (
                                <Col key={`shop-${shop.id}`}>
                                    <ShopCard shop={shop} />
                                </Col>
                            ))}
                        </Row>
                        <hr className="my-5" />
                    </section>
                )}

                {/* Products Section */}
                {products.length > 0 && (
                     <section className="mb-5">
                        <h2>Products</h2>
                         <ListGroup variant="flush">
                             {products.map(product => (
                                 <ListGroup.Item key={`product-${product.id}`} className="bg-transparent text-white">
                                     <strong>{product.name}</strong> from <Link to={`/shops/${product.shop.id}`}>{product.shop.name}</Link>
                                     <p className="text-white-50 mb-0">{product.description}</p>
                                 </ListGroup.Item>
                             ))}
                         </ListGroup>
                         <hr className="my-5" />
                    </section>
                )}

                {/* Hospitals Section */}
                {hospitals.length > 0 && (
                    <section className="mb-5">
                        <h2>Hospitals</h2>
                        <ListGroup variant="flush">
                            {hospitals.map(hospital => (
                                <ListGroup.Item key={`hospital-${hospital.id}`} className="bg-transparent text-white">
                                    <strong>{hospital.name}</strong>
                                    <p className="text-white-50 mb-0">{hospital.address} - Ph: {hospital.phone_number}</p>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <hr className="my-5" />
                    </section>
                )}

                {/* Ambulances Section */}
                {ambulances.length > 0 && (
                    <section className="mb-5">
                        <h2>Ambulance Services</h2>
                        <Table striped bordered hover responsive variant="dark">
                            <thead>
                                <tr>
                                    <th>Service Name</th>
                                    <th>City</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ambulances.map(ambulance => (
                                    <tr key={`ambulance-${ambulance.id}`}>
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
                    </section>
                )}
            </>
        );
    };

    return (
        <Container>
            <h1 className="my-4">Search Results for "{query}"</h1>
            {loading && <div className="text-center my-5"><Spinner animation="border" /></div>}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && renderResults()}
        </Container>
    );
}

export default SearchPage;

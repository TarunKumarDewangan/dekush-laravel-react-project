// In frontend/src/components/layouts/AdminLayout.jsx (NEW FILE)

import { NavLink, Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './AdminLayout.css'; // We will create this CSS file next

function AdminLayout() {
  return (
    <Container fluid>
      <Row>
        {/* --- Sidebar --- */}
        <Col md={3} lg={2} className="admin-sidebar">
          <nav className="nav flex-column">
            <h2 className="admin-header">Admin Panel</h2>

            <NavLink to="/admin/dashboard" className="nav-link">
              User Management
            </NavLink>

            {/* --- NEW, UPDATED CATEGORY SECTION --- */}
            <h3 className="admin-subheader">Categories</h3>
            <NavLink to="/admin/main-categories" className="nav-link">
              Main Categories
            </NavLink>
            <NavLink to="/admin/sub-categories" className="nav-link">
              Sub-Categories
            </NavLink>
          </nav>
        </Col>

        {/* --- Main Content Area --- */}
        <Col md={9} lg={10} className="admin-content">
          {/* This is where the specific admin page (like Users or Categories) will be rendered */}
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLayout;

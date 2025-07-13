// The Complete and Correct App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Import all page and layout components
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AllShopsPage from './pages/AllShopsPage';
import ShopPage from './pages/ShopPage';
import AmbulancePage from './pages/AmbulancePage';
import LanguageEntryPage from './pages/LanguageEntryPage';
import DashboardPage from './pages/DashboardPage';
import ProductManagementPage from './pages/ProductManagementPage'; // <-- The new page
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Container className="mt-4">
        {/* All routes are defined here in a single, organized block */}
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shops" element={<AllShopsPage />} />
          <Route path="/shops/:shopId" element={<ShopPage />} />
          <Route path="/ambulances" element={<AmbulancePage />} />
          <Route path="/language-entry" element={<LanguageEntryPage />} />

          {/* --- Protected Shop Owner Routes --- */}
          {/* This is the main dashboard that lists all of the owner's shops */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="shopowner">
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* This is the page for managing products of a single, specific shop */}
          <Route
            path="/owner/shops/:shopId/manage"
            element={
              <ProtectedRoute role="shopowner">
                <ProductManagementPage />
              </ProtectedRoute>
            }
          />

          {/* --- Protected Admin Route --- */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

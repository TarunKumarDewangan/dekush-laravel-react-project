import { useState } from 'react'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Navigation from './components/Navigation'; // <-- Import new component
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import ProtectedRoute from './components/ProtectedRoute'; // <-- Import the guard
import DashboardPage from './pages/DashboardPage'; // <-- Import the new page
import AdminDashboardPage from './pages/AdminDashboardPage';
import AmbulancePage from './pages/AmbulancePage';



function App() {


  return (
     <BrowserRouter>
      <Navigation />

      <Container className="mt-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shops/:shopId" element={<ShopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Shop Owner Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="shopowner">
                <DashboardPage />
              </ProtectedRoute>
            }
          />
           <Route path="/ambulances" element={<AmbulancePage />} />

          {/* --- ADD THIS NEW PROTECTED ADMIN ROUTE --- */}
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

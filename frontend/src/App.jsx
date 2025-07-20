// In frontend/src/App.jsx (REPLACE ENTIRE FILE)

// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Layouts
// import Navigation from './components/Navigation';
// import DefaultLayout from './components/layouts/DefaultLayout';
// import AdminLayout from './components/layouts/AdminLayout';

// Import Helpers

//version
// import ProtectedRoute from './components/ProtectedRoute';

// // Import All Pages
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import SearchPage from './pages/SearchPage';
// import ShopsByCategoryPage from './pages/ShopsByCategoryPage';
// import AllShopsPage from './pages/AllShopsPage';
// import ShopPage from './pages/ShopPage';
// import AmbulancePage from './pages/AmbulancePage';
// import LanguageEntryPage from './pages/LanguageEntryPage';
// import DashboardPage from './pages/DashboardPage';
// import ProductManagementPage from './pages/ProductManagementPage';
// import AdminDashboardPage from './pages/AdminDashboardPage';
// import AdminCategoryPage from './pages/AdminCategoryPage';
// import AdminSubCategoryPage from './pages/AdminSubCategoryPage';


// function App() {
//   return (
//     <BrowserRouter>
//       <Navigation />

//       <Routes>
//         {/* --- Routes for the Default (Public) Layout --- */}
//         <Route element={<DefaultLayout />}>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/search" element={<SearchPage />} />
//           <Route path="/category/:slug" element={<ShopsByCategoryPage />} />
//           <Route path="/shops" element={<AllShopsPage />} />
//           <Route path="/shops/:shopId" element={<ShopPage />} />
//           <Route path="/ambulances" element={<AmbulancePage />} />
//           <Route path="/language-entry" element={<LanguageEntryPage />} />
//           <Route path="/dashboard" element={<ProtectedRoute role="shopowner"><DashboardPage /></ProtectedRoute>} />
//           <Route path="/owner/shops/:shopId/manage" element={<ProtectedRoute role="shopowner"><ProductManagementPage /></ProtectedRoute>} />
//         </Route>

//         {/* --- Routes for the Admin Layout --- */}
//         <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
//           <Route path="dashboard" element={<AdminDashboardPage />} />
//           <Route path="main-categories" element={<AdminCategoryPage />} />
//           <Route path="sub-categories" element={<AdminSubCategoryPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// In frontend/src/App.jsx (REPLACE ENTIRE FILE)

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Layouts
import Navigation from './components/Navigation';
import AdminLayout from './components/layouts/AdminLayout';
import ContainedLayout from './components/layouts/ContainedLayout'; // <-- IMPORT NEW LAYOUT

// Import Helpers
import ProtectedRoute from './components/ProtectedRoute';

// Import All Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import ShopsByCategoryPage from './pages/ShopsByCategoryPage';
import AllShopsPage from './pages/AllShopsPage';
import ShopPage from './pages/ShopPage';
import AmbulancePage from './pages/AmbulancePage';
import LanguageEntryPage from './pages/LanguageEntryPage';
import DashboardPage from './pages/DashboardPage';
import ProductManagementPage from './pages/ProductManagementPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminCategoryPage from './pages/AdminCategoryPage';
import AdminSubCategoryPage from './pages/AdminSubCategoryPage';


function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        {/* --- Homepage Route (Uses its own layout) --- */}
        <Route path="/" element={<HomePage />} />

        {/* --- Routes for the Default Contained Layout --- */}
        <Route element={<ContainedLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:slug" element={<ShopsByCategoryPage />} />
          <Route path="/shops" element={<AllShopsPage />} />
          <Route path="/shops/:shopId" element={<ShopPage />} />
          <Route path="/ambulances" element={<AmbulancePage />} />
          <Route path="/language-entry" element={<LanguageEntryPage />} />
          <Route path="/dashboard" element={<ProtectedRoute role="shopowner"><DashboardPage /></ProtectedRoute>} />
          <Route path="/owner/shops/:shopId/manage" element={<ProtectedRoute role="shopowner"><ProductManagementPage /></ProtectedRoute>} />
        </Route>

        {/* --- Routes for the Admin Layout --- */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="main-categories" element={<AdminCategoryPage />} />
          <Route path="sub-categories" element={<AdminSubCategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

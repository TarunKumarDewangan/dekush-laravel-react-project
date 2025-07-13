import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
 import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* <-- Wrap the App */}
    <App />
    </AuthProvider>
  </StrictMode>,
)

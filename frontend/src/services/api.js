// frontend/src/services/api.js

import axios from 'axios';

// Create an Axios instance with a base URL from our environment variables
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api', // e.g., http://localhost:8000/api
    withCredentials: true, // This is important for Sanctum to work
});

export default apiClient;

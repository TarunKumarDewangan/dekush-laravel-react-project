// frontend/src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api', // Creates http://127.0.0.1:8000/api
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
    }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;

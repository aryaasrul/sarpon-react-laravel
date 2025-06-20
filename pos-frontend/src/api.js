import axios from 'axios';

// Buat instance Axios baru
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Accept': 'application/json',
    }
});

// Tambahkan "Interceptor" untuk melampirkan token ke setiap permintaan
// Ini akan berjalan secara otomatis untuk semua panggilan API
api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        // Jika ada token, tambahkan ke header Authorization
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;

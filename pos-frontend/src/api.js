// src/api.js
import axios from 'axios';

// Atur URL dasar untuk semua permintaan API
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// PENTING: Atur agar Axios otomatis mengirim cookie dalam setiap permintaan
axios.defaults.withCredentials = true;

// Atur header yang dibutuhkan oleh Laravel
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;
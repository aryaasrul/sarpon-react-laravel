// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import axios from '../api'; // UBAH INI

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Dapatkan CSRF cookie
      await axios.get('/sanctum/csrf-cookie'); // UBAH INI
      
      // 2. Kirim permintaan login
      const response = await axios.post('/login', { // UBAH INI
        email: email,
        password: password,
      });

      console.log('Login berhasil!', response);
      onLoginSuccess();

    } catch (err) {
      console.error('Login gagal:', err);
      setError('Email atau password salah.');
    } finally {
      setLoading(false);
    }
  };

  // ... (sisa kode JSX tetap sama)
  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login Kasir</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

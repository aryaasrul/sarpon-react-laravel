import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api'; // Pastikan ini mengarah ke file api.js Anda

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cek apakah ada token di localStorage saat aplikasi dimuat
        const token = localStorage.getItem('authToken');
        if (token) {
            // Jika ada token, coba ambil data user
            api.get('/api/user')
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    // Jika token tidak valid, hapus dari localStorage
                    localStorage.removeItem('authToken');
                })
                .finally(() => setLoading(false));
        } else {
            // Jika tidak ada token, langsung selesai loading
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        // Panggil rute /api/login baru kita
        const response = await api.post('/api/login', { email, password });
        // Simpan token ke localStorage
        localStorage.setItem('authToken', response.data.token);
        // Simpan data user ke state
        setUser(response.data.user);
    };

    const logout = async () => {
        try {
            if (user) {
                await api.post('/api/logout');
            }
        } catch (error) {
            console.error("Gagal logout di server, tapi tetap logout di client.", error);
        } finally {
            // Selalu hapus token dan data user dari client
            localStorage.removeItem('authToken');
            setUser(null);
        }
    };

    const value = { user, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

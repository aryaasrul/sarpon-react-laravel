// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Impor komponen layout dan halaman
import MainLayout from './components/MainLayout';
import KasirPage from './pages/KasirPage';
import KatalogPage from './pages/KatalogPage';
import RiwayatPage from './pages/RiwayatPage';

// Impor CSS utama
import './index.css'; 
import './App.css';

// Mendefinisikan semua rute/halaman aplikasi
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Layout utama akan selalu tampil
    children: [
      {
        index: true, // Halaman default saat path adalah '/'
        element: <KasirPage />,
      },
      {
        path: 'katalog',
        element: <KatalogPage />,
      },
      {
        path: 'riwayat',
        element: <RiwayatPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

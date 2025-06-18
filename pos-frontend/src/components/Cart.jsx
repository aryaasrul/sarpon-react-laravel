// src/components/Cart.jsx

import React, { useState } from 'react';
import axios from '../api'; // Menggunakan instance axios yang sudah dikonfigurasi

// Menerima prop 'onOrderSuccess' untuk membersihkan keranjang dari parent component
function Cart({ cart, onOrderSuccess }) {
  const [loading, setLoading] = useState(false);
  
  // Menghitung total harga dari item di keranjang
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Fungsi yang dijalankan saat tombol "Proses Pesanan" diklik
  const handleProcessOrder = async () => {
    if (cart.length === 0) {
      alert('Keranjang kosong!');
      return;
    }
    setLoading(true);
    
    // Format data keranjang sesuai yang diharapkan oleh API Laravel
    const orderData = {
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        hpp: item.hpp
      }))
    };

    try {
      // Kirim data pesanan ke endpoint yang dilindungi
      // Axios akan otomatis menyertakan cookie yang dibutuhkan karena kita sudah login
      await axios.post('/api/orders', orderData);
      
      alert('Pesanan berhasil disimpan!');
      onOrderSuccess(); // Panggil fungsi untuk membersihkan keranjang di parent

    } catch (error) {
      console.error('Gagal memproses pesanan:', error);
      // Memberikan pesan error yang lebih spesifik jika memungkinkan
      if (error.response && error.response.status === 401) {
        alert('Sesi Anda telah berakhir. Harap login kembali.');
      } else {
        alert('Gagal memproses pesanan. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Bagian JSX untuk merender komponen
  return (
    <div className="cart-summary">
      <div className="cart-info">
        <p>Total ({cart.length} item)</p>
        <p>Rp {total.toLocaleString('id-ID')}</p>
      </div>
      <button 
        onClick={handleProcessOrder} 
        className="btn-process" 
        disabled={loading || cart.length === 0} // Tombol dinonaktifkan saat loading atau keranjang kosong
      >
        {loading ? 'Memproses...' : 'Proses Pesanan'}
      </button>
    </div>
  );
}

export default Cart;

// src/components/ProductFormModal.jsx

import React, { useState, useEffect } from 'react';

function ProductFormModal({ isOpen, onClose, onSave, product }) {
  // State untuk setiap input di form
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [hpp, setHpp] = useState('');
  const [kategori, setKategori] = useState('');

  // useEffect untuk mengisi form saat mode edit
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setHpp(product.hpp || '');
      // Ubah array kategori menjadi string yang dipisahkan koma
      setKategori(product.kategori?.join(', ') || '');
    } else {
      // Reset form saat mode tambah
      setName('');
      setPrice('');
      setHpp('');
      setKategori('');
    }
  }, [product, isOpen]); // Dijalankan saat produk atau status modal berubah

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      price: parseInt(price, 10),
      hpp: parseInt(hpp, 10),
      // Ubah string kategori kembali menjadi array
      kategori: kategori.split(',').map(item => item.trim()).filter(Boolean),
    };
    onSave(formData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
          
          <div className="form-group">
            <label htmlFor="name">Nama Produk</label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="price">Harga Jual</label>
            <input id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="hpp">Harga HPP</label>
            <input id="hpp" type="number" value={hpp} onChange={e => setHpp(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="kategori">Kategori (pisahkan dengan koma)</label>
            <input id="kategori" type="text" value={kategori} onChange={e => setKategori(e.target.value)} />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-save">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;

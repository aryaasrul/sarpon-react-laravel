// src/pages/KatalogPage.jsx

import React, { useState, useEffect } from 'react';
import axios from '../api';
import ProductFormModal from '../components/ProductFormModal';
import KatalogCard from '../components/KatalogCard';
import OptionModal from '../components/OptionModal';
import '../Katalog.css';

function KatalogPage() {
  // State untuk data & UI
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk interaktivitas
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['Semua Produk']);
  const [activeCategory, setActiveCategory] = useState('Semua Produk');

  // State untuk mengelola modal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- FUNGSI PENGAMBILAN DATA ---
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      // Membuat daftar kategori secara dinamis dari data produk
      const uniqueCategories = new Set(['Semua Produk']);
      response.data.forEach(p => p.kategori?.forEach(cat => uniqueCategories.add(cat)));
      setCategories(Array.from(uniqueCategories));
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- FUNGSI-FUNGSI HANDLER UNTUK AKSI PENGGUNA ---

  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenOptionsModal = (product) => {
    setSelectedProduct(product);
    setIsOptionModalOpen(true);
  };

  const handleOpenEditModal = () => {
    setIsOptionModalOpen(false);
    setIsFormModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsFormModalOpen(false);
    setIsOptionModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = async (formData) => {
    try {
      if (selectedProduct) {
        await axios.put(`/api/products/${selectedProduct.id}`, formData);
      } else {
        await axios.post('/api/products', formData);
      }
      handleCloseModals();
      await fetchProducts(); // Muat ulang data setelah menyimpan
    } catch (error) {
      console.error("Gagal menyimpan produk:", error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    if (window.confirm(`Yakin ingin menghapus "${selectedProduct.name}"?`)) {
      try {
        await axios.delete(`/api/products/${selectedProduct.id}`);
        handleCloseModals();
        await fetchProducts(); // Muat ulang data setelah menghapus
      } catch (error) {
        console.error("Gagal menghapus produk:", error);
      }
    }
  };

  // Logika untuk menyaring produk berdasarkan kategori dan pencarian
  const filteredProducts = products.filter(product => {
    const inCategory = activeCategory === 'Semua Produk' || product.kategori?.includes(activeCategory);
    const inSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return inCategory && inSearch;
  });

  if (loading) return <div>Memuat data katalog...</div>;

  return (
    <div className="katalog-page">
      <div className="katalog-header">
        <h1>Katalog</h1>
        <button onClick={handleOpenAddModal} className="btn-add-product">
          <img src="/icons/icon-plus-input-manual.svg" alt="Tambah" />
          <span>Tambah Produk</span>
        </button>
      </div>

      <div className="search-container">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Cari Produk" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-filter">
          <img src="/icons/Filter.svg" alt="Filter" />
        </button>
      </div>

      <div className="categories">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`category ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="katalog-grid">
        {filteredProducts.map(product => (
          <KatalogCard 
            key={product.id}
            product={product}
            onOptionsClick={handleOpenOptionsModal}
          />
        ))}
      </div>

      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />
      
      <OptionModal
        isOpen={isOptionModalOpen}
        onClose={handleCloseModals}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}

export default KatalogPage;

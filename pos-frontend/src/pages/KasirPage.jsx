// src/pages/KasirPage.jsx
import { useState, useEffect } from 'react';
import axios from '../api';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import './KasirPage.css';

function KasirPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState(['Semua Produk']);
  const [activeCategory, setActiveCategory] = useState('Semua Produk');
  const [searchTerm, setSearchTerm] = useState('');

  // Mengambil data produk saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        // Secara dinamis membuat daftar kategori dari data produk
        const uniqueCategories = new Set(['Semua Produk']);
        response.data.forEach(p => p.kategori?.forEach(cat => uniqueCategories.add(cat)));
        setCategories(Array.from(uniqueCategories));
      } catch (err) {
        setError('Gagal memuat data produk.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- LOGIKA KERANJANG BELANJA ---
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem?.quantity > 1) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== product.id);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Logika untuk menyaring produk berdasarkan kategori dan pencarian
  const filteredProducts = products.filter(product => {
    const inCategory = activeCategory === 'Semua Produk' || product.kategori?.includes(activeCategory);
    const inSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return inCategory && inSearch;
  });

  if (loading) return <div>Memuat produk...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;

  return (
    <div className="kasir-page">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Cari Produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="categories">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <ProductList
        products={filteredProducts}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
      <Cart cart={cart} onOrderSuccess={clearCart} />
    </div>
  );
}

export default KasirPage;

// src/pages/RiwayatPage.jsx

import React, { useState, useEffect } from 'react';
import axios from '../api';
import ExpenseFormModal from '../components/ExpenseFormModal'; // Impor modal
import '../Riwayat.css';

function RiwayatPage() {
  const [activeTab, setActiveTab] = useState('pemasukan');
  const [orders, setOrders] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, expensesRes] = await Promise.all([
        axios.get('/api/orders'),
        axios.get('/api/expenses')
      ]);
      setOrders(ordersRes.data);
      setExpenses(expensesRes.data);
    } catch (error) {
      console.error("Gagal mengambil data riwayat:", error);
      alert("Gagal mengambil data riwayat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveExpense = async (formData) => {
    try {
      await axios.post('/api/expenses', formData);
      alert('Pengeluaran berhasil disimpan.');
      setIsModalOpen(false); // Tutup modal
      fetchData(); // Muat ulang data untuk menampilkan data baru
    } catch (error) {
      console.error("Gagal menyimpan pengeluaran:", error);
      alert("Gagal menyimpan pengeluaran.");
    }
  };

  const groupDataByDate = (data) => {
    return data.reduce((acc, item) => {
      const date = new Date(item.created_at).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupedOrders = groupDataByDate(orders);
  const groupedExpenses = groupDataByDate(expenses);

  // ... (fungsi renderPemasukan dan renderPengeluaran tetap sama)

  const renderPemasukan = () => (
    Object.entries(groupedOrders).map(([date, items]) => (
      <div key={date} className="date-group">
        <h3>{date}</h3>
        {items.map(item => (
          <div key={item.id} className="transaction-item">
            <span>{item.quantity}x {item.name}</span>
            <span className="amount income">+ Rp {item.price.toLocaleString('id-ID')}</span>
          </div>
        ))}
      </div>
    ))
  );

  const renderPengeluaran = () => (
     Object.entries(groupedExpenses).map(([date, items]) => (
      <div key={date} className="date-group">
        <h3>{date}</h3>
        {items.map(item => (
          <div key={item.id} className="transaction-item">
            <span>{item.name}</span>
            <span className="amount expense">- Rp {item.amount.toLocaleString('id-ID')}</span>
          </div>
        ))}
      </div>
    ))
  );

  if (loading) return <div>Memuat data riwayat...</div>;

  return (
    <div className="riwayat-page">
      <div className="riwayat-header">
        <div className="tab-container">
          <button 
            className={`tab-btn ${activeTab === 'pemasukan' ? 'active' : ''}`}
            onClick={() => setActiveTab('pemasukan')}
          >
            Pemasukan
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pengeluaran' ? 'active' : ''}`}
            onClick={() => setActiveTab('pengeluaran')}
          >
            Pengeluaran
          </button>
        </div>
        <button className="btn-add-expense" onClick={() => setIsModalOpen(true)}>
          + Tambah Pengeluaran
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'pemasukan' ? renderPemasukan() : renderPengeluaran()}
      </div>

      <ExpenseFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExpense}
      />
    </div>
  );
}

export default RiwayatPage;

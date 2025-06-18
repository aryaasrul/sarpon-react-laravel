// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <img src="/logo/logo.png" alt="Logo Terang" className="header-logo" />
        <h1>Terang</h1>
      </div>
      <div className="header-actions">
        <button className="header-button">Printer</button>
        <button className="header-button">Input Manual</button>
      </div>
    </header>
  );
}

export default Header;
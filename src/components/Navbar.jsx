// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'movies', label: 'Phim' },
    { id: 'theaters', label: 'Rạp' },
    { id: 'members', label: 'Thành viên' },
    { id: 'rules', label: 'Luật' },
  ];

  return (
    <nav className="nav-menu">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
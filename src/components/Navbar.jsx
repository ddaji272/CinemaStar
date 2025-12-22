// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'phim', label: 'PHIM' },
    { id: 'rap', label: 'RẠP' },
    { id: 'member', label: 'THÀNH VIÊN' },
    { id: 'luat', label: 'LUẬT' },
  ];

  return (
    <ul className="nav-menu">
      {navItems.map((item) => (
        <li key={item.id}>
          {/* Sử dụng button thay vì thẻ a để tránh load lại trang */}
          <button
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
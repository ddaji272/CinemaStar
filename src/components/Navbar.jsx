import React from 'react';
import '../App.css'; // Đảm bảo import đúng file CSS

const Navbar = ({ activeTab, setActiveTab, setShowLogin }) => {
  // Danh sách các mục menu để render cho gọn
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

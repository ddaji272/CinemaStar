// src/components/Navbar.jsx
import React from 'react';

// Lưu ý: props nhận vào là onTabChange chứ không phải setActiveTab nữa
const Navbar = ({ activeTab, onTabChange, user, onLogout, onGoToAdmin }) => {
  return (
    <nav className="navbar">
      
      {/* MENU CHÍNH */}
      <div className="nav-links">
        <button 
          className={activeTab === 'movies' ? 'active' : ''} 
          onClick={() => onTabChange('movies')}
        >
          Lịch chiếu
        </button>
        <button 
          className={activeTab === 'theaters' ? 'active' : ''} 
          onClick={() => onTabChange('theaters')}
        >
          Hệ thống rạp
        </button>
        
        {/* Tab Thành viên: Bấm vào đây sẽ kích hoạt logic kiểm tra đăng nhập */}
        <button 
          className={activeTab === 'members' ? 'active' : ''} 
          onClick={() => onTabChange('members')}
        >
          Thành viên
        </button>
        
        <button 
          className={activeTab === 'rules' ? 'active' : ''} 
          onClick={() => onTabChange('rules')}
        >
          Quy định
        </button>
      </div>

      {/* MENU BÊN PHẢI: CHỈ HIỆN KHI ĐÃ ĐĂNG NHẬP */}
      <div className="auth-action">
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            
            {user.role === 'admin' && (
              <button 
                onClick={() => onGoToAdmin(true)}
                className="btn-admin"
              >
                ⚙️ Admin
              </button>
            )}

            <span style={{ color: '#e5e7eb' }}>Hi, <b style={{ color: '#fbbf24' }}>{user.username}</b></span>
            
            <button 
              onClick={onLogout}
              className="btn-logout"
            >
              Thoát
            </button>
          </div>
        )}
        {/* Đã XÓA hoàn toàn phần else (nút đăng nhập màu vàng) */}
      </div>
    </nav>
  );
};

export default Navbar;

// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ activeTab, setActiveTab, user, onOpenAuth, onLogout, onGoToAdmin }) => {
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #333' }}>
      
      {/* MENU BÊN TRÁI: Các tab điều hướng */}
      <div className="nav-links">
        <button 
          className={activeTab === 'movies' ? 'active' : ''} 
          onClick={() => setActiveTab('movies')}
        >
          Lịch chiếu
        </button>
        <button 
          className={activeTab === 'theaters' ? 'active' : ''} 
          onClick={() => setActiveTab('theaters')}
        >
          Hệ thống rạp
        </button>
        <button 
          className={activeTab === 'members' ? 'active' : ''} 
          onClick={() => setActiveTab('members')}
        >
          Thành viên
        </button>
        <button 
          className={activeTab === 'rules' ? 'active' : ''} 
          onClick={() => setActiveTab('rules')}
        >
          Quy định
        </button>
      </div>

      {/* MENU BÊN PHẢI: Xử lý Đăng nhập / User / Admin */}
      <div className="auth-action">
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            
            {/* Nút vào trang Admin (Chỉ hiện khi role là admin) */}
            {user.role === 'admin' && (
              <button 
                onClick={() => onGoToAdmin(true)}
                style={{ background: '#e50914', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ⚙️ TRANG ADMIN
              </button>
            )}

            <span style={{ color: 'white' }}>Xin chào, <b style={{ color: '#fbbf24' }}>{user.username}</b></span>
            
            <button 
              onClick={onLogout}
              style={{ background: 'transparent', border: '1px solid #718096', color: '#a0aec0', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <button 
            onClick={onOpenAuth}
            style={{ background: '#fbbf24', border: 'none', color: 'black', padding: '8px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Đăng nhập / Đăng ký
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

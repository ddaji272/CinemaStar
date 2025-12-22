// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

// Import các components
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';

// Import các trang
import BookingFlow from './pages/BookingFlow';
import Theaters from './pages/Theaters';
import Members from './pages/Members';
import Rules from './pages/Rules';
import AdminDashboard from './pages/AdminDashboard'; // Đảm bảo bạn đã có file này

function App() {
  // State quản lý tab nội dung
  const [activeTab, setActiveTab] = useState('movies');
  
  // State quản lý User & Auth
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false); // State chuyển đổi giao diện Admin

  // Tự động đăng nhập nếu có lưu trong localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUserSession');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Xử lý khi đăng nhập thành công
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUserSession', JSON.stringify(user));
    setIsAuthOpen(false);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
      setCurrentUser(null);
      setIsAdminView(false); // Thoát khỏi trang Admin
      localStorage.removeItem('currentUserSession');
      setActiveTab('movies'); // Quay về trang chủ
    }
  };

  // Hàm render nội dung chính
  const renderContent = () => {
    // 1. Nếu đang ở chế độ Admin (và user đúng là admin) thì hiện Dashboard
    if (isAdminView && currentUser?.role === 'admin') {
      return <AdminDashboard />;
    }

    // 2. Nếu không thì hiện các tab bình thường
    switch (activeTab) {
      case 'movies':
        return <BookingFlow />;
      case 'theaters':
        return <Theaters />;
      case 'members':
        return <Members />;
      case 'rules':
        return <Rules />;
      default:
        return <BookingFlow />;
    }
  };

  return (
    <div className="container">
      <header>
        <h1 
          style={{ cursor: 'pointer' }} 
          onClick={() => { setActiveTab('movies'); setIsAdminView(false); }}
        >
          CINEMA STAR
        </h1>
      </header>

      {/* Navbar nhận thêm các props mới để xử lý Auth và Admin */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setActiveTab(tab); setIsAdminView(false); }} 
        user={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onGoToAdmin={(shouldGo) => setIsAdminView(shouldGo)}
      />

      <div className="content-area">
        {renderContent()}
      </div>

      {/* Modal đăng nhập nằm đè lên tất cả */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;

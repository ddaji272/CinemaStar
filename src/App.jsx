// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import BookingFlow from './pages/BookingFlow';
import Theaters from './pages/Theaters';
import Members from './pages/Members';
import Rules from './pages/Rules';
import AdminDashboard from './pages/AdminDashboard'; 

function App() {
  const [activeTab, setActiveTab] = useState('movies');
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUserSession');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // --- LOGIC MỚI: XỬ LÝ CHUYỂN TAB ---
  const handleTabChange = (tabName) => {
    // Nếu bấm vào tab "members" mà chưa đăng nhập -> Mở Modal ngay
    if (tabName === 'members' && !currentUser) {
      setIsAuthOpen(true);
      return; 
    }
    
    // Các trường hợp khác thì chuyển tab bình thường
    setActiveTab(tabName);
    setIsAdminView(false); // Đảm bảo thoát khỏi admin view khi chuyển tab
  };
  // -----------------------------------

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUserSession', JSON.stringify(user));
    setIsAuthOpen(false);
    // Đăng nhập xong thì tự động chuyển vào tab Thành viên luôn cho tiện
    setActiveTab('members');
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
      setCurrentUser(null);
      setIsAdminView(false);
      localStorage.removeItem('currentUserSession');
      setActiveTab('movies'); 
    }
  };

  const renderContent = () => {
    if (isAdminView && currentUser?.role === 'admin') return <AdminDashboard />;
    switch (activeTab) {
      case 'movies': return <BookingFlow />;
      case 'theaters': return <Theaters />;
      case 'members': return <Members user={currentUser} />; // Truyền user vào trang Members nếu cần
      case 'rules': return <Rules />;
      default: return <BookingFlow />;
    }
  };

  return (
    <div className="container">
      <header>
        <h1 style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('movies'); setIsAdminView(false); }}>
          CINEMA STAR
        </h1>
      </header>

      {/* Truyền hàm handleTabChange xuống thay vì setActiveTab trực tiếp */}
      <Navbar 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        user={currentUser}
        onLogout={handleLogout}
        onGoToAdmin={(shouldGo) => setIsAdminView(shouldGo)}
      />

      <div className="content-area">
        {renderContent()}
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;

// src/App.jsx
import { useState, useEffect } from 'react'; // Nhớ import useEffect
import Navbar from './components/Navbar';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BookingFlow from './pages/BookingFlow'; 
import Theaters from './pages/Theaters';       
import Members from './pages/Members';         
import Rules from './pages/Rules';             

function App() {
  const [activeTab, setActiveTab] = useState('phim');

  // --- 1. STATE QUẢN LÝ NGƯỜI DÙNG (THÊM MỚI) ---
  const [currentUser, setCurrentUser] = useState(null);

  // --- 2. KIỂM TRA ĐĂNG NHẬP KHI MỞ WEB ---
  useEffect(() => {
    const savedUser = localStorage.getItem("user_info");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Hàm này sẽ được gọi từ bên trong trang Members khi user đăng nhập/đăng xuất
  const handleUserChange = (user) => {
    setCurrentUser(user);
    // Nếu đăng nhập thành công thì tự chuyển về tab đặt vé cho tiện
    if (user) {
        setActiveTab('phim'); 
    }
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right" autoClose={3000} hideProgressBar={false}
        newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss
        draggable pauseOnHover theme="dark"
      />

      <header>
        <h1 className="logo">CINEMA STAR</h1>
        {/* Truyền user vào Navbar nếu bạn muốn hiển thị tên trên thanh menu */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={currentUser} 
        />
      </header>

      <div className="container">
        {/* --- TRUYỀN PROPS XUỐNG CÁC TRANG CON --- */}

        {/* 1. Tab PHIM: Truyền user để check và hàm chuyển tab */}
        {activeTab === 'phim' && (
            <BookingFlow 
                currentUser={currentUser} 
                onSwitchTab={setActiveTab} 
            />
        )}

        {activeTab === 'rap' && <Theaters />}

        {/* 2. Tab THÀNH VIÊN: Truyền hàm cập nhật user để báo ngược lại cho App */}
        {activeTab === 'member' && (
            <Members onUserChange={handleUserChange} />
        )}

        {activeTab === 'luat' && <Rules />}
        
      </div>
    </div>
  );
}

export default App;

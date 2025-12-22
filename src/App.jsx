// src/App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';

// --- 1. IMPORT THƯ VIỆN TOASTIFY ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// -----------------------------------

// --- IMPORT CÁC TRANG (PAGES) ---
import BookingFlow from './pages/BookingFlow'; 
import Theaters from './pages/Theaters';       
import Members from './pages/Members';         
import Rules from './pages/Rules';             

function App() {
  // State quản lý tab nào đang được chọn (mặc định là 'phim')
  const [activeTab, setActiveTab] = useState('phim');

  return (
    <div className="App">
      {/* --- 2. CẤU HÌNH KHUNG HIỂN THỊ THÔNG BÁO --- */}
      {/* Khung này sẽ nằm ẩn, chỉ hiện khi bạn gọi lệnh toast() */}
      <ToastContainer
        position="top-right"
        autoClose={3000}       // Tự tắt sau 3 giây
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"           // Giao diện tối (Dark mode)
      />
      {/* ------------------------------------------- */}

      <header>
        <h1 className="logo">CINEMA STAR</h1>
        
        {/* Navbar nhận props để điều khiển việc chuyển tab */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </header>

      <div className="container">
        {/* --- KHU VỰC HIỂN THỊ NỘI DUNG THEO TAB --- */}

        {/* 1. Tab PHIM: Gọi BookingFlow */}
        {activeTab === 'phim' && <BookingFlow />}

        {/* 2. Tab RẠP: Hiển thị danh sách rạp */}
        {activeTab === 'rap' && <Theaters />}

        {/* 3. Tab THÀNH VIÊN: Hiển thị đăng nhập/đăng ký */}
        {activeTab === 'member' && <Members />}

        {/* 4. Tab LUẬT: Hiển thị nội quy */}
        {activeTab === 'luat' && <Rules />}
        
      </div>
    </div>
  );
}

export default App;
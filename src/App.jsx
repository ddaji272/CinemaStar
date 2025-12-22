// src/App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';

// --- IMPORT CÁC TRANG CỦA BẠN ---
import BookingFlow from './pages/BookingFlow'; // Trang Phim & Đặt vé
import Theaters from './pages/Theaters';       // Trang Rạp
import Members from './pages/Members';         // Trang Thành viên
import Rules from './pages/Rules';             // Trang Luật

function App() {
  // State quản lý tab nào đang được chọn (mặc định là 'phim')
  const [activeTab, setActiveTab] = useState('phim');

  return (
    <div className="App">
      <header>
        <h1 className="logo">CINEMA STAR</h1>
        
        {/* Truyền hàm setActiveTab xuống Navbar để đổi tab */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </header>

      <div className="container">
        {/* --- ĐIỀU HƯỚNG HIỂN THỊ (ROUTING) --- */}

        {/* 1. Tab PHIM: Gọi BookingFlow (Đã có sẵn tìm kiếm và list phim) */}
        {activeTab === 'phim' && <BookingFlow />}

        {/* 2. Tab RẠP */}
        {activeTab === 'rap' && <Theaters />}

        {/* 3. Tab THÀNH VIÊN */}
        {activeTab === 'member' && <Members />}

        {/* 4. Tab LUẬT */}
        {activeTab === 'luat' && <Rules />}
        
      </div>
    </div>
  );
}

export default App;

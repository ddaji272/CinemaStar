import { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';

// --- IMPORT CÁC TRANG (PAGES) ---
// Đảm bảo tên file trong thư mục 'pages' viết hoa chữ cái đầu đúng như thế này
import BookingFlow from './pages/BookingFlow'; 
import Theaters from './pages/Theaters';       
import Members from './pages/Members';         
import Rules from './pages/Rules';             

function App() {
  // State quản lý tab nào đang được chọn (mặc định là 'phim')
  const [activeTab, setActiveTab] = useState('phim');

  return (
    <div className="App">
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

        {/* 1. Tab PHIM: Gọi BookingFlow (Chứa logic Tìm kiếm, List phim, Mua vé, Chi tiết) */}
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

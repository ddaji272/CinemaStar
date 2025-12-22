import { useState } from 'react';
import Navbar from './components/Navbar'; // Nhớ sửa đường dẫn nếu file Navbar nằm chỗ khác
import './App.css';

function App() {
  // State quản lý tab nào đang được chọn (mặc định là 'phim')
  const [activeTab, setActiveTab] = useState('phim');
  
  // State quản lý modal đăng nhập (nếu liên quan đến AuthModal)
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="App">
      <header>
        <h1>CINEMA STAR</h1>
        
        {/* GỌI NAVBAR VÀ TRUYỀN PROPS VÀO */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setShowLogin={setShowLogin}
        />
      </header>

      {/* Phần nội dung thay đổi theo Tab */}
      <div className="container">
        {activeTab === 'phim' && (
           <div className="movie-section">
              {/* Code hiển thị danh sách phim hoặc Component MovieList của bạn */}
              <div className="search-container">
                  <input type="text" placeholder="Tìm tên phim..." className="search-input" />
              </div>
              <h2 style={{color: 'white'}}>DANH SÁCH PHIM ĐANG CHIẾU</h2>
              {/* ... */}
           </div>
        )}

        {activeTab === 'rap' && <h2 style={{color: 'white', textAlign: 'center'}}>HỆ THỐNG RẠP (Đang cập nhật)</h2>}
        
        {activeTab === 'member' && (
            <div className="member-container">
                {/* Gọi Component Member hoặc AuthModal của bạn ở đây */}
                <h2 style={{color: 'white'}}>KHU VỰC THÀNH VIÊN</h2>
            </div>
        )}
        
        {activeTab === 'luat' && <h2 style={{color: 'white', textAlign: 'center'}}>QUY ĐỊNH & ĐIỀU KHOẢN</h2>}
      </div>
    </div>
  );
}

export default App;

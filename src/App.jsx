// src/App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar'; 
import { MOVIES } from './data/movieData'; // Import dữ liệu phim
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('phim');
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State cho ô tìm kiếm

  // Lọc phim theo từ khóa tìm kiếm
  const filteredMovies = MOVIES.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header>
        {/* Logo */}
        <h1 className="logo">CINEMA STAR</h1>
        
        {/* Navbar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setShowLogin={setShowLogin}
        />
      </header>

      <div className="container">
        {/* --- TAB PHIM --- */}
        {activeTab === 'phim' && (
           <div className="movie-section">
              {/* Ô tìm kiếm */}
              <div className="search-container">
                  <input 
                    type="text" 
                    placeholder="Tìm tên phim..." 
                    className="search-input" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>

              <h2 style={{color: 'white', marginBottom: '20px'}}>DANH SÁCH PHIM ĐANG CHIẾU</h2>
              
              {/* LƯỚI PHIM (Hiển thị từ dữ liệu MOVIES) */}
              <div className="movie-list">
                {filteredMovies.map((movie) => (
                  <div key={movie.id} className="movie-card">
                    <div className="poster-wrapper">
                      <img src={movie.image} alt={movie.title} className="movie-poster" />
                      
                      {/* Lớp phủ khi rê chuột vào (Overlay) */}
                      <div className="overlay">
                        <button className="btn-overlay btn-buy">MUA VÉ</button>
                        <button className="btn-overlay btn-details">CHI TIẾT</button>
                      </div>
                    </div>
                    
                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <p style={{ color: '#a0aec0', margin: '5px 0' }}>
                        {movie.duration}
                      </p>
                      <p style={{ color: '#fbbf24', fontWeight: 'bold' }}>
                        {movie.price.toLocaleString()} đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        )}

        {/* --- CÁC TAB KHÁC --- */}
        {activeTab === 'rap' && <h2 style={{color: 'white', textAlign: 'center'}}>HỆ THỐNG RẠP (Đang cập nhật)</h2>}
        
        {activeTab === 'member' && (
            <div className="member-container">
                <h2 style={{color: 'white'}}>KHU VỰC THÀNH VIÊN</h2>
            </div>
        )}
        
        {activeTab === 'luat' && <h2 style={{color: 'white', textAlign: 'center'}}>QUY ĐỊNH & ĐIỀU KHOẢN</h2>}
      </div>
    </div>
  );
}

export default App;

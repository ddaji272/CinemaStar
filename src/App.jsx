import { useState } from 'react';
import Navbar from './components/Navbar';
import { MOVIES } from './data/movieData';
import './App.css';

// --- IMPORT CÁC TRANG TỪ THƯ MỤC PAGES CỦA BẠN ---
// (Dựa trên ảnh cây thư mục bạn gửi: Theaters.jsx, Members.jsx, Rules.jsx)
import Theaters from './pages/Theaters';
import Members from './pages/Members';
import Rules from './pages/Rules';

function App() {
  const [activeTab, setActiveTab] = useState('phim');
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm xử lý tìm kiếm phim
  const filteredMovies = MOVIES.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm xử lý khi bấm nút "Mua Vé" (Tạm thời hiện thông báo để test nút có chạy không)
  const handleBuyTicket = (movieName) => {
    alert(`Bạn đã bấm mua vé phim: ${movieName}\n(Chức năng đặt vé sẽ cập nhật sau)`);
  };

  return (
    <div className="App">
      <header>
        <h1 className="logo">CINEMA STAR</h1>
        
        {/* Navbar truyền props để chuyển Tab */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setShowLogin={setShowLogin}
        />
      </header>

      <div className="container">
        
        {/* --- TAB 1: PHIM --- */}
        {activeTab === 'phim' && (
           <div className="movie-section">
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
              
              <div className="movie-list">
                {filteredMovies.map((movie) => (
                  <div key={movie.id} className="movie-card">
                    <div className="poster-wrapper">
                      <img src={movie.image} alt={movie.title} className="movie-poster" />
                      
                      <div className="overlay">
                        {/* Gán sự kiện onClick để nút hoạt động */}
                        <button 
                            className="btn-overlay btn-buy"
                            onClick={() => handleBuyTicket(movie.title)}
                        >
                            MUA VÉ
                        </button>
                        <button className="btn-overlay btn-details">CHI TIẾT</button>
                      </div>
                    </div>
                    
                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <p style={{ color: '#a0aec0', margin: '5px 0' }}>{movie.duration}</p>
                      <p style={{ color: '#fbbf24', fontWeight: 'bold' }}>
                        {movie.price.toLocaleString()} đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        )}

        {/* --- TAB 2: RẠP (Gọi component Theaters từ thư mục pages) --- */}
        {activeTab === 'rap' && <Theaters />}
        
        {/* --- TAB 3: THÀNH VIÊN (Gọi component Members từ thư mục pages) --- */}
        {activeTab === 'member' && <Members />}
        
        {/* --- TAB 4: LUẬT (Gọi component Rules từ thư mục pages) --- */}
        {activeTab === 'luat' && <Rules />}
        
      </div>
    </div>
  );
}

export default App;

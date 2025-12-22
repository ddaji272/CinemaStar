// src/pages/BookingFlow.jsx
import React, { useState } from 'react';
import { MOVIES, TOTAL_SEATS } from '../data/movieData';

// Import các component con bạn vừa tạo
import TheaterSelection from '../components/Booking/TheaterSelection';
import SeatSelection from '../components/Booking/SeatSelection';
import PaymentInfo from '../components/Booking/PaymentInfo';

const BookingFlow = () => {
  // --- STATE QUẢN LÝ LUỒNG ĐẶT VÉ ---
  const [step, setStep] = useState(0); // 0: Home, 1: Rạp, 2: Ghế, 3: Thanh toán
  const [bookingData, setBookingData] = useState({
    movie: null,
    theater: null,
    showtime: null,
    seats: []
  });
  const [occupiedSeats, setOccupiedSeats] = useState([]); // Giả lập ghế đã đặt

  // --- STATE QUẢN LÝ UI (MODAL, SEARCH) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [playingTrailer, setPlayingTrailer] = useState(null); // Modal Trailer
  const [viewingDetails, setViewingDetails] = useState(null); // Modal Chi tiết

  // --- LOGIC ĐẶT VÉ (BOOKING ACTIONS) ---

  // B1: Từ trang chủ -> Nhấn "MUA VÉ" (hoặc từ Modal chi tiết)
  const handleStartBooking = (movie) => {
    setBookingData({ movie, theater: null, showtime: null, seats: [] });
    setViewingDetails(null); // Tắt modal chi tiết nếu đang mở
    setStep(1); // Chuyển sang bước chọn rạp
  };

  // B2: Chọn Rạp & Suất -> Sang bước chọn ghế
  const handleSelectSession = (theater, showtime) => {
    setBookingData(prev => ({ ...prev, theater, showtime }));
    // Giả lập random ghế đã có người ngồi
    setOccupiedSeats(TOTAL_SEATS.filter(() => Math.random() < 0.25));
    setStep(2);
  };

  // B3: Chọn ghế
  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    setBookingData(prev => {
      const isSelected = prev.seats.includes(seatId);
      const newSeats = isSelected 
        ? prev.seats.filter(id => id !== seatId) 
        : [...prev.seats, seatId];
      return { ...prev, seats: newSeats };
    });
  };

  // B4: Thanh toán thành công
  const handlePaymentSuccess = () => {
    alert(`Thanh toán thành công!\nPhim: ${bookingData.movie.title}\nTổng tiền: ${(bookingData.seats.length * bookingData.movie.price).toLocaleString()}đ`);
    // Reset về ban đầu
    setBookingData({ movie: null, theater: null, showtime: null, seats: [] });
    setStep(0);
  };

  // --- LOGIC RENDER MODAL (GIỮ NGUYÊN CODE CŨ CỦA BẠN) ---

  const renderTrailerModal = () => {
    if (!playingTrailer) return null;
    return (
      <div className="modal-backdrop" onClick={() => setPlayingTrailer(null)}>
        <div className="modal-content" style={{ background: 'transparent', boxShadow: 'none', maxWidth: '900px' }}>
          <button className="btn-close-modal" style={{ color: 'white', top: '-30px', right: 0 }} onClick={() => setPlayingTrailer(null)}>×</button>
          <div className="trailer-container">
            <iframe src={`${playingTrailer}?autoplay=1`} title="Trailer" allowFullScreen allow="autoplay"></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderDetailsModal = () => {
    if (!viewingDetails) return null;
    return (
      <div className="modal-backdrop" onClick={() => setViewingDetails(null)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="btn-close-modal" onClick={() => setViewingDetails(null)}>×</button>
          <div className="details-flex">
            <img src={viewingDetails.image} alt={viewingDetails.title} className="details-poster" />
            <div className="details-info">
              <h2>{viewingDetails.title}</h2>
              <p style={{ color: '#a0aec0', fontSize: '1.1rem' }}>
                Thời lượng: {viewingDetails.duration} <span style={{ margin: '0 10px' }}>|</span>
                Giá vé: <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{viewingDetails.price.toLocaleString()} đ</span>
              </p>
              <div className="details-desc">
                <h4 style={{ margin: '0 0 10px 0', color: 'white' }}>Nội dung phim:</h4>
                {viewingDetails.desc}
              </div>
              <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                {/* Nút Đặt vé trong Modal cũng gọi hàm handleStartBooking */}
                <button className="btn-checkout" onClick={() => handleStartBooking(viewingDetails)}>ĐẶT VÉ NGAY</button>
                <button className="btn-back" style={{ marginBottom: 0 }} onClick={() => { setPlayingTrailer(viewingDetails.trailer); setViewingDetails(null); }}>XEM TRAILER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- MAIN RENDER (ĐIỀU HƯỚNG CÁC BƯỚC) ---

  // STEP 1: CHỌN RẠP
  if (step === 1) {
    return (
      <TheaterSelection 
        movie={bookingData.movie} 
        onBack={() => setStep(0)}
        onSelectSession={handleSelectSession}
      />
    );
  }

  // STEP 2: CHỌN GHẾ
  if (step === 2) {
    return (
      <SeatSelection 
        movie={bookingData.movie}
        theater={bookingData.theater}
        showtime={bookingData.showtime}
        selectedSeats={bookingData.seats}
        occupiedSeats={occupiedSeats}
        onSeatClick={handleSeatClick}
        onBack={() => setStep(1)}
        onNext={() => setStep(3)}
      />
    );
  }

  // STEP 3: THANH TOÁN
  if (step === 3) {
    return (
      <PaymentInfo 
        bookingData={bookingData}
        onBack={() => setStep(2)}
        onConfirm={handlePaymentSuccess}
      />
    );
  }

  // STEP 0: TRANG CHỦ (LIST PHIM)
  const filteredMovies = MOVIES.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Tìm tên phim..." 
          className="search-input" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      
      {filteredMovies.length > 0 ? (
        <div className="movie-list">
          {filteredMovies.map(movie => (
            <div key={movie.id} className="movie-card">
              <div className="poster-wrapper">
                {/* Click vào poster xem trailer */}
                <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="movie-poster" 
                  onClick={() => setPlayingTrailer(movie.trailer)} 
                  style={{ cursor: 'pointer' }} 
                />
                <div className="overlay">
                  {/* Đã khôi phục nút CHI TIẾT */}
                  <button 
                    className="btn-overlay btn-details" 
                    onClick={(e) => { e.stopPropagation(); setViewingDetails(movie); }}
                  >
                    CHI TIẾT
                  </button>
                  <button 
                    className="btn-overlay btn-buy" 
                    onClick={(e) => { e.stopPropagation(); handleStartBooking(movie); }}
                  >
                    MUA VÉ
                  </button>
                </div>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#a0aec0' }}>
                  <span>{movie.duration}</span>
                  <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{movie.price.toLocaleString()} đ</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#a0aec0', marginTop: '50px' }}>
          <p style={{ fontSize: '4rem', margin: '0' }}>🎬</p>
          <p>Không tìm thấy phim nào.</p>
        </div>
      )}
      
      {/* Gọi lại Modal ở đây */}
      {renderTrailerModal()}
      {renderDetailsModal()}
    </>
  );
};

export default BookingFlow;

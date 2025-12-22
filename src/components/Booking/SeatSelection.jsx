// src/components/Booking/SeatSelection.jsx
import React from 'react';
import { TOTAL_SEATS } from '../../data/movieData';

const SeatSelection = ({ movie, theater, showtime, selectedSeats, occupiedSeats, onSeatClick, onBack, onNext }) => {
  const totalPrice = selectedSeats.length * movie.price;

  return (
    <div className="booking-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button className="btn-back" style={{ marginBottom: 0 }} onClick={onBack}>← Chọn lại xuất</button>
        <div style={{ textAlign: 'right' }}>
          <h3 style={{ margin: 0, color: '#fbbf24' }}>{theater.name}</h3>
          <p style={{ margin: 0, color: '#a0aec0' }}>Suất: {showtime}</p>
        </div>
      </div>

      <div className="screen">MÀN HÌNH</div>
      
      <div className="seats-grid">
        {TOTAL_SEATS.map(seatId => (
          <div key={seatId}
            className={`seat ${occupiedSeats.includes(seatId) ? 'occupied' : ''} ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
            onClick={() => onSeatClick(seatId)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="legend" style={{marginTop: '20px', display: 'flex', gap: '20px', justifyContent:'center'}}>
         <span style={{color:'white'}}>Trống</span> <span style={{color:'#fbbf24'}}>Đang chọn</span> <span style={{color:'#e50914'}}>Đã bán</span>
      </div>

      <div className="summary" style={{marginTop: '30px', padding: '20px', background: '#1f2937', borderRadius: '8px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
           <div style={{color:'#a0aec0'}}>Ghế: {selectedSeats.length > 0 ? selectedSeats.map(s=>s+1).join(', ') : '...'}</div>
           <div style={{fontSize:'1.5rem', fontWeight:'bold', color: '#fbbf24'}}>{totalPrice.toLocaleString()} đ</div>
        </div>
        <button 
          className="btn-checkout" 
          disabled={selectedSeats.length === 0}
          onClick={onNext} // Chuyển sang bước thanh toán
        >
          TIẾP TỤC
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;

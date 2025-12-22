// src/components/Booking/FormatSelection.jsx
import React from 'react';
import { THEATERS } from '../../data/movieData';

const FormatSelection = ({ movie, onBack, onSelectFormat }) => {
  
  // Logic: Quét qua tất cả rạp, gom tất cả các định dạng đang có lại
  const availableFormats = new Set();
  THEATERS.forEach(theater => {
    Object.keys(theater.showtimes).forEach(format => {
      availableFormats.add(format);
    });
  });
  
  // Chuyển Set thành Array để hiển thị
  const formatsList = Array.from(availableFormats);

  return (
    <div className="booking-section">
      <button className="btn-back" onClick={onBack}>← Chọn lại phim</button>
      <h2 style={{ color: '#fbbf24', textAlign: 'center', marginBottom: '10px' }}>
        {movie.title}
      </h2>
      <p style={{ textAlign: 'center', color: '#a0aec0', marginBottom: '30px' }}>
        Vui lòng chọn định dạng chiếu
      </p>

      <div className="format-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {formatsList.map((format, index) => (
          <div 
            key={index} 
            className="format-card"
            style={{ 
              background: '#1f2937', 
              padding: '20px', 
              borderRadius: '12px', 
              cursor: 'pointer',
              border: '2px solid transparent',
              textAlign: 'center',
              transition: '0.3s'
            }}
            onClick={() => onSelectFormat(format)}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#fbbf24'; e.currentTarget.style.background = '#374151'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = '#1f2937'; }}
          >
            {/* Tạo icon giả lập cho đẹp */}
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
              {format.includes('IMAX') ? '🟦' : format.includes('4DX') ? '🌪️' : format.includes('3D') ? '👓' : '🎬'}
            </div>
            <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>{format}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormatSelection;
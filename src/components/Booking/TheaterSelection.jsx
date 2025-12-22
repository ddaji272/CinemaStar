import React, { useState } from 'react';
import { THEATERS } from '../../data/movieData';

const TheaterSelection = ({ movie, onBack, onSelectSession }) => {
  const [activeTheater, setActiveTheater] = useState(null);

  return (
    <div className="booking-section">
      <button className="btn-back" onClick={onBack}>← Quay lại</button>
      <h2 style={{ color: '#fbbf24', textAlign: 'center', marginBottom: '20px' }}>
        Lịch chiếu: {movie.title}
      </h2>
      
      <div className="theater-list">
        {THEATERS.map((theater) => (
          <div key={theater.id} className="theater-item" style={{ marginBottom: '15px', background: '#1f2937', padding: '15px', borderRadius: '8px' }}>
            <div 
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              onClick={() => setActiveTheater(activeTheater === theater.id ? null : theater.id)}
            >
              <div>
                <h3 style={{ margin: 0 }}>{theater.name}</h3>
                <p style={{ margin: '5px 0 0', color: '#a0aec0', fontSize: '0.9rem' }}>{theater.address}</p>
              </div>
              <div style={{ color: '#fbbf24' }}>{activeTheater === theater.id ? '▲' : '▼'}</div>
            </div>

            {/* Chỉ hiện giờ chiếu khi click vào rạp */}
            {activeTheater === theater.id && (
              <div style={{ marginTop: '15px', borderTop: '1px solid #374151', paddingTop: '15px' }}>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Chọn suất chiếu:</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {theater.showtimes.map((time, idx) => (
                    <button 
                      key={idx} 
                      className="btn-time"
                      style={{ 
                        padding: '8px 16px', borderRadius: '4px', border: '1px solid #fbbf24', 
                        background: 'transparent', color: '#fbbf24', cursor: 'pointer' 
                      }}
                      onClick={() => onSelectSession(theater, time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterSelection;
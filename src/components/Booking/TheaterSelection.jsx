<<<<<<< HEAD
// src/components/Booking/TheaterSelection.jsx
import React, { useState } from 'react';
import { THEATERS } from '../../data/movieData';

const TheaterSelection = ({ movie, selectedFormat, onBack, onSelectSession }) => {
  const [activeTheater, setActiveTheater] = useState(null);

  // Lọc: Chỉ lấy những rạp CÓ suất chiếu của định dạng đã chọn
  const availableTheaters = THEATERS.filter(t => t.showtimes[selectedFormat]);

  return (
    <div className="booking-section">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <button className="btn-back" style={{marginBottom:0}} onClick={onBack}>← Đổi định dạng</button>
        <div style={{color:'#fbbf24', fontWeight:'bold', border:'1px solid #fbbf24', padding:'5px 15px', borderRadius:'20px'}}>
          {selectedFormat}
        </div>
      </div>
      
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
        Chọn Rạp & Suất Chiếu
      </h2>
      
      {availableTheaters.length > 0 ? (
        <div className="theater-list">
          {availableTheaters.map((theater) => (
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

              {activeTheater === theater.id && (
                <div style={{ marginTop: '15px', borderTop: '1px solid #374151', paddingTop: '15px' }}>
                  <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Giờ chiếu ({selectedFormat}):</p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {/* Chỉ lấy giờ của đúng định dạng đã chọn */}
                    {theater.showtimes[selectedFormat].map((time, idx) => (
                      <button 
                        key={idx} 
                        className="btn-time"
                        style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #fbbf24', background: 'transparent', color: '#fbbf24', cursor: 'pointer' }}
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
      ) : (
        <div style={{textAlign:'center', color:'#a0aec0', marginTop:'50px'}}>
          Rất tiếc, chưa có rạp nào chiếu định dạng này.
        </div>
      )}
    </div>
  );
};

export default TheaterSelection;
=======
// src/components/Booking/TheaterSelection.jsx
import React, { useState } from 'react';
import { THEATERS } from '../../data/movieData';

const TheaterSelection = ({ movie, selectedFormat, onBack, onSelectSession }) => {
  const [activeTheater, setActiveTheater] = useState(null);

  // Lọc: Chỉ lấy những rạp CÓ suất chiếu của định dạng đã chọn
  const availableTheaters = THEATERS.filter(t => t.showtimes[selectedFormat]);

  return (
    <div className="booking-section">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <button className="btn-back" style={{marginBottom:0}} onClick={onBack}>← Đổi định dạng</button>
        <div style={{color:'#fbbf24', fontWeight:'bold', border:'1px solid #fbbf24', padding:'5px 15px', borderRadius:'20px'}}>
          {selectedFormat}
        </div>
      </div>
      
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
        Chọn Rạp & Suất Chiếu
      </h2>
      
      {availableTheaters.length > 0 ? (
        <div className="theater-list">
          {availableTheaters.map((theater) => (
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

              {activeTheater === theater.id && (
                <div style={{ marginTop: '15px', borderTop: '1px solid #374151', paddingTop: '15px' }}>
                  <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Giờ chiếu ({selectedFormat}):</p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {/* Chỉ lấy giờ của đúng định dạng đã chọn */}
                    {theater.showtimes[selectedFormat].map((time, idx) => (
                      <button 
                        key={idx} 
                        className="btn-time"
                        style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #fbbf24', background: 'transparent', color: '#fbbf24', cursor: 'pointer' }}
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
      ) : (
        <div style={{textAlign:'center', color:'#a0aec0', marginTop:'50px'}}>
          Rất tiếc, chưa có rạp nào chiếu định dạng này.
        </div>
      )}
    </div>
  );
};

export default TheaterSelection;
>>>>>>> ccb36e5aa957c8efc92856762531f5c8a55b2b2d

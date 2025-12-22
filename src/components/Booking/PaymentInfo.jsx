<<<<<<< HEAD
import React from 'react';

const PaymentInfo = ({ bookingData, onBack, onConfirm }) => {
  const { movie, theater, showtime, seats } = bookingData;
  const total = seats.length * movie.price;

  return (
    <div className="booking-section" style={{ maxWidth: '600px', margin: '0 auto', color: 'white' }}>
      <button className="btn-back" onClick={onBack}>← Chọn lại ghế</button>
      
      <div style={{ background: '#1f2937', padding: '30px', borderRadius: '12px', marginTop: '20px' }}>
        <h2 style={{ color: '#fbbf24', textAlign: 'center', borderBottom: '1px solid #374151', paddingBottom: '15px' }}>
          XÁC NHẬN THANH TOÁN
        </h2>
        
        <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
          <p><strong>Phim:</strong> {movie.title}</p>
          <p><strong>Rạp:</strong> {theater.name}</p>
          <p><strong>Suất chiếu:</strong> <span style={{ background: '#374151', padding: '2px 8px', borderRadius: '4px' }}>{showtime}</span></p>
          <p><strong>Ghế:</strong> {seats.map(s => s + 1).join(', ')}</p>
          <hr style={{ borderColor: '#374151', margin: '20px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Tổng tiền:</span>
            <span style={{ color: '#fbbf24' }}>{total.toLocaleString()} đ</span>
          </div>
        </div>

        <button 
          className="btn-checkout" 
          style={{ width: '100%', marginTop: '30px', fontSize: '1.1rem' }}
          onClick={onConfirm}
        >
          THANH TOÁN NGAY
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
=======
import React from 'react';

const PaymentInfo = ({ bookingData, onBack, onConfirm }) => {
  const { movie, theater, showtime, seats } = bookingData;
  const total = seats.length * movie.price;

  return (
    <div className="booking-section" style={{ maxWidth: '600px', margin: '0 auto', color: 'white' }}>
      <button className="btn-back" onClick={onBack}>← Chọn lại ghế</button>
      
      <div style={{ background: '#1f2937', padding: '30px', borderRadius: '12px', marginTop: '20px' }}>
        <h2 style={{ color: '#fbbf24', textAlign: 'center', borderBottom: '1px solid #374151', paddingBottom: '15px' }}>
          XÁC NHẬN THANH TOÁN
        </h2>
        
        <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
          <p><strong>Phim:</strong> {movie.title}</p>
          <p><strong>Rạp:</strong> {theater.name}</p>
          <p><strong>Suất chiếu:</strong> <span style={{ background: '#374151', padding: '2px 8px', borderRadius: '4px' }}>{showtime}</span></p>
          <p><strong>Ghế:</strong> {seats.map(s => s + 1).join(', ')}</p>
          <hr style={{ borderColor: '#374151', margin: '20px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Tổng tiền:</span>
            <span style={{ color: '#fbbf24' }}>{total.toLocaleString()} đ</span>
          </div>
        </div>

        <button 
          className="btn-checkout" 
          style={{ width: '100%', marginTop: '30px', fontSize: '1.1rem' }}
          onClick={onConfirm}
        >
          THANH TOÁN NGAY
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
>>>>>>> ccb36e5aa957c8efc92856762531f5c8a55b2b2d

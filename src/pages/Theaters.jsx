// src/pages/Theaters.jsx
import React from 'react';
import { THEATERS } from '../data/movieData';

const Theaters = () => {
  return (
    <div className="theater-grid">
      {THEATERS.map((t, i) => (
        <div key={i} className="theater-card">
          <h3>{t.name}</h3>
          <p style={{ color: '#a0aec0' }}>{t.address}</p>
          <button className="btn-back" style={{marginTop: '15px'}}>Xem bản đồ</button>
        </div>
      ))}
    </div>
  );
};

export default Theaters;

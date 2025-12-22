// src/components/AuthModal.jsx
import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false); // Toggle giữa Đăng nhập/Đăng ký
  const [formData, setFormData] = useState({ username: '', password: '', confirmPass: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Xóa lỗi khi người dùng gõ lại
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- LOGIC ĐĂNG KÝ ---
    if (isRegister) {
      if (!formData.username || !formData.password) {
        setError('Vui lòng điền đầy đủ thông tin');
        return;
      }
      if (formData.password !== formData.confirmPass) {
        setError('Mật khẩu nhập lại không khớp');
        return;
      }
      // Lưu user vào LocalStorage (Giả lập Database)
      const user = { username: formData.username, password: formData.password };
      localStorage.setItem('mockUser', JSON.stringify(user));
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      setIsRegister(false); // Chuyển về tab đăng nhập
      setFormData({ username: '', password: '', confirmPass: '' });
    } 
    
    // --- LOGIC ĐĂNG NHẬP ---
    else {
      const storedUser = JSON.parse(localStorage.getItem('mockUser'));
      
      if (!storedUser) {
        setError('Tài khoản chưa tồn tại. Vui lòng đăng ký trước.');
        return;
      }
      
      if (formData.username === storedUser.username && formData.password === storedUser.password) {
        // Đăng nhập thành công
        onLoginSuccess(storedUser);
        onClose();
      } else {
        setError('Sai tên đăng nhập hoặc mật khẩu!');
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
        <button className="btn-close-modal" onClick={onClose}>×</button>
        
        <h2 style={{ color: '#fbbf24', textAlign: 'center', marginBottom: '20px' }}>
          {isRegister ? 'ĐĂNG KÝ TÀI KHOẢN' : 'ĐĂNG NHẬP'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            name="username" 
            placeholder="Tên đăng nhập" 
            className="search-input" // Tận dụng class input cũ
            style={{ width: '100%' }}
            value={formData.username}
            onChange={handleChange}
          />
          
          <input 
            type="password" 
            name="password" 
            placeholder="Mật khẩu" 
            className="search-input"
            style={{ width: '100%' }}
            value={formData.password}
            onChange={handleChange}
          />

          {isRegister && (
            <input 
              type="password" 
              name="confirmPass" 
              placeholder="Nhập lại mật khẩu" 
              className="search-input"
              style={{ width: '100%' }}
              value={formData.confirmPass}
              onChange={handleChange}
            />
          )}

          {error && <p style={{ color: '#e50914', fontSize: '0.9rem', margin: 0 }}>{error}</p>}

          <button className="btn-checkout" style={{ width: '100%', marginTop: '10px' }}>
            {isRegister ? 'ĐĂNG KÝ NGAY' : 'ĐĂNG NHẬP'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#a0aec0', fontSize: '0.9rem' }}>
          {isRegister ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
          <span 
            style={{ color: '#fbbf24', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
          >
            {isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
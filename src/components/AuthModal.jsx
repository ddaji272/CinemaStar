// src/components/AuthModal.jsx
import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', confirmPass: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ⚠️ KIỂM TRA KỸ LINK NÀY (Không được có dấu gạch chéo / ở cuối)
  const API_URL = "https://LINK-RENDER-CUA-BAN.onrender.com/api/auth";

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // --- 1. VALIDATION (Kiểm tra dữ liệu đầu vào) ---
    // Kiểm tra tên đăng nhập
    if (!formData.username.trim()) {
      setError('❌ Vui lòng nhập Tên đăng nhập!');
      return;
    }
    // Kiểm tra mật khẩu
    if (!formData.password.trim()) {
      setError('❌ Vui lòng nhập Mật khẩu!');
      return;
    }
    // Kiểm tra độ dài mật khẩu (Ví dụ: tối thiểu 3 ký tự)
    if (formData.password.length < 3) {
      setError('❌ Mật khẩu phải có ít nhất 3 ký tự!');
      return;
    }

    // Riêng đăng ký thì kiểm tra thêm nhập lại mật khẩu
    if (isRegister) {
      if (!formData.confirmPass.trim()) {
        setError('❌ Vui lòng nhập xác nhận mật khẩu!');
        return;
      }
      if (formData.password !== formData.confirmPass) {
        setError('❌ Mật khẩu xác nhận không khớp!');
        return;
      }
    }

    setIsLoading(true);

    try {
      const endpoint = isRegister ? `${API_URL}/register` : `${API_URL}/login`;
      console.log("Đang gọi API:", endpoint); // Log để debug

      const bodyData = { 
        username: formData.username.trim(), 
        password: formData.password 
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        // --- THÀNH CÔNG ---
        if (isRegister) {
          alert('✅ Đăng ký thành công! Bạn có thể đăng nhập ngay.');
          setIsRegister(false);
          setFormData({ username: '', password: '', confirmPass: '' });
        } else {
          alert(`✅ Đăng nhập thành công! Xin chào ${data.user.username}`);
          onLoginSuccess(data.user);
          onClose();
        }
      } else {
        // --- LỖI TỪ SERVER ---
        // Hiện thông báo lỗi chính xác từ Backend trả về
        setError(`⚠️ ${data.message || 'Có lỗi xảy ra'}`);
      }

    } catch (err) {
      console.error("Lỗi kết nối:", err);
      setError('❌ Không kết nối được Server. (Nếu dùng Render miễn phí, vui lòng chờ 1 phút để Server khởi động lại).');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError('');
    setFormData({ username: '', password: '', confirmPass: '' });
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
            type="text" name="username" placeholder="Tên đăng nhập" 
            className="search-input" style={{ width: '100%' }} 
            value={formData.username} onChange={handleChange} disabled={isLoading} 
          />
          
          <input 
            type="password" name="password" placeholder="Mật khẩu" 
            className="search-input" style={{ width: '100%' }} 
            value={formData.password} onChange={handleChange} disabled={isLoading} 
          />

          {isRegister && (
            <input 
              type="password" name="confirmPass" placeholder="Nhập lại mật khẩu" 
              className="search-input" style={{ width: '100%' }} 
              value={formData.confirmPass} onChange={handleChange} disabled={isLoading} 
            />
          )}

          {error && (
            <div style={{ color: '#e50914', background: '#fff0f0', padding: '10px', borderRadius: '5px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #e50914' }}>
              {error}
            </div>
          )}

          <button 
            className="btn-checkout" 
            style={{ width: '100%', marginTop: '10px', opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : (isRegister ? 'ĐĂNG KÝ NGAY' : 'ĐĂNG NHẬP')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#a0aec0', fontSize: '0.9rem' }}>
          {isRegister ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
          <span style={{ color: '#fbbf24', cursor: 'pointer', fontWeight: 'bold' }} onClick={toggleMode}>
            {isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;

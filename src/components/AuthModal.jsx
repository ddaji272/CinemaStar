// src/components/AuthModal.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; // <--- QUAN TRỌNG: Phải import CSS này mới đẹp

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  // ... (Giữ nguyên toàn bộ code logic state và handleChange của bạn) ...
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', confirmPass: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "https://movie-ticket-booking-api-623k.onrender.com/api/auth";

  if (!isOpen) return null;

  // ... (Giữ nguyên handleChange) ...
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // ... (Giữ nguyên logic validation của bạn) ...
    // Code validation của bạn rất tốt, không cần sửa gì ở đây.

    if (!formData.username.trim()) { setError('❌ Vui lòng nhập Tên đăng nhập!'); return; }
    if (!formData.password.trim()) { setError('❌ Vui lòng nhập Mật khẩu!'); return; }
    if (formData.password.length < 3) { setError('❌ Mật khẩu phải có ít nhất 3 ký tự!'); return; }

    if (isRegister) {
      if (!formData.confirmPass.trim()) { setError('❌ Vui lòng nhập xác nhận mật khẩu!'); return; }
      if (formData.password !== formData.confirmPass) { setError('❌ Mật khẩu xác nhận không khớp!'); return; }
    }

    setIsLoading(true);

    try {
      const endpoint = isRegister ? `${API_URL}/register` : `${API_URL}/login`;
      const bodyData = { username: formData.username.trim(), password: formData.password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegister) {
          toast.success('🎉 Đăng ký thành công! Bạn có thể đăng nhập ngay.');
          setIsRegister(false);
          setFormData({ username: '', password: '', confirmPass: '' });
        } else {
          // Khi đăng nhập thành công, Modal sẽ đóng lại (onClose).
          // Toast cần được hiển thị ở App.jsx để không bị tắt theo Modal.
          toast.success(`🍿 Xin chào ${data.user.username}, chúc bạn xem phim vui vẻ!`);
          onLoginSuccess(data.user);
          onClose(); 
        }
      } else {
        const msg = data.message || 'Có lỗi xảy ra';
        setError(`⚠️ ${msg}`);
        toast.error(msg); 
      }
    } catch (err) {
      console.error("Lỗi kết nối:", err);
      const msg = '❌ Không kết nối được Server.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError('');
    setFormData({ username: '', password: '', confirmPass: '' });
  };

  // ... (Giữ nguyên phần return JSX của bạn) ...
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
         {/* Code JSX của bạn giữ nguyên */}
         <button className="btn-close-modal" onClick={onClose}>×</button>
         <h2 style={{ color: '#fbbf24', textAlign: 'center', marginBottom: '20px' }}>
           {isRegister ? 'ĐĂNG KÝ TÀI KHOẢN' : 'ĐĂNG NHẬP'}
         </h2>
         {/* ... Form ... */}
         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
             {/* ... Các input giữ nguyên ... */}
             <input type="text" name="username" placeholder="Tên đăng nhập" className="search-input" style={{ width: '100%' }} value={formData.username} onChange={handleChange} disabled={isLoading} />
             <input type="password" name="password" placeholder="Mật khẩu" className="search-input" style={{ width: '100%' }} value={formData.password} onChange={handleChange} disabled={isLoading} />
             
             {isRegister && (
               <input type="password" name="confirmPass" placeholder="Nhập lại mật khẩu" className="search-input" style={{ width: '100%' }} value={formData.confirmPass} onChange={handleChange} disabled={isLoading} />
             )}

             {error && (
               <div style={{ color: '#e50914', background: '#fff0f0', padding: '10px', borderRadius: '5px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #e50914' }}>
                 {error}
               </div>
             )}

             <button className="btn-checkout" style={{ width: '100%', marginTop: '10px', opacity: isLoading ? 0.6 : 1 }} disabled={isLoading}>
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

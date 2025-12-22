// src/pages/Members.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const API_BASE = "https://cinestarbackend.onrender.com";

// --- NHẬN THÊM prop onSwitchTab ---
const Members = ({ onUserChange, onSwitchTab }) => {
  
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null);
  
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [editProfile, setEditProfile] = useState({ fullName: "", phoneNumber: "", address: "" });

  useEffect(() => {
    const savedUser = localStorage.getItem("user_info");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
      setEditProfile({
        fullName: parsedUser.name || "",
        phoneNumber: parsedUser.phoneNumber || "",
        address: parsedUser.address || ""
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleEditChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/update/${currentUser.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProfile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Lỗi cập nhật");

      toast.success("💾 Đã lưu thông tin mới!");
      setCurrentUser(data.user);
      localStorage.setItem("user_info", JSON.stringify(data.user));
      
      if (onUserChange) onUserChange(data.user);
      setIsEditing(false); 
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!formData.fullName || !formData.email || !formData.password) { setError("Thiếu thông tin"); return; }
    if (formData.password !== formData.confirmPassword) { setError("Mật khẩu không khớp"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: formData.fullName, email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      toast.success("🎉 Đăng ký thành công!");
      setIsRegister(false); setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (err) { toast.error(err.message); } finally { setLoading(false); }
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) { setError("Nhập email/pass"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      
      localStorage.setItem("user_info", JSON.stringify(data));
      setCurrentUser(data);
      setEditProfile({
        fullName: data.name || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || ""
      });
      toast.success(`🍿 Xin chào ${data.name}`);

      if (onUserChange) onUserChange(data);
    } catch (err) { toast.error(err.message); } finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_info");
    setCurrentUser(null);
    setIsEditing(false);
    if (onUserChange) onUserChange(null);
    toast.info("Đã đăng xuất");
  };

  return (
    <div className="member-container">
      <div className="login-box" style={{ position: "relative", zIndex: 10 }}>
        
        {currentUser ? (
          <div style={{ color: "white" }}>
            <h2 style={{ color: "#fbbf24", textAlign: "center", marginBottom: "10px" }}>
              HỒ SƠ THÀNH VIÊN
            </h2>
            
            <div style={{ textAlign: "center", fontSize: "4rem", marginBottom: "10px" }}>
              {isEditing ? "📝" : "🤴"}
            </div>

            {/* --- NÚT ADMIN: CHỈ HIỆN KHI LÀ ADMIN --- */}
            {currentUser.role === 'admin' && !isEditing && (
              <button 
                onClick={() => onSwitchTab('admin')} // Chuyển sang tab Admin
                style={{
                  width: "100%", padding: "12px", marginBottom: "20px",
                  background: "linear-gradient(45deg, #FFD700, #FF8C00)",
                  border: "none", borderRadius: "8px",
                  color: "#000", fontWeight: "bold", fontSize: "1rem", cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)"
                }}
              >
                🛡️ TRUY CẬP TRANG QUẢN TRỊ
              </button>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{color: "#a0aec0", fontSize: "0.85rem"}}>Họ và tên</label>
                {isEditing ? <input type="text" name="fullName" className="profile-input" value={editProfile.fullName} onChange={handleEditChange} /> 
                           : <div style={{fontSize: "1.1rem", fontWeight: "bold"}}>{currentUser.name}</div>}
              </div>
              <div>
                <label style={{color: "#a0aec0", fontSize: "0.85rem"}}>Số điện thoại</label>
                {isEditing ? <input type="text" name="phoneNumber" className="profile-input" placeholder="Chưa cập nhật..." value={editProfile.phoneNumber} onChange={handleEditChange} /> 
                           : <div style={{color: currentUser.phoneNumber ? "white" : "#718096"}}>{currentUser.phoneNumber || "(Chưa có số điện thoại)"}</div>}
              </div>
              <div>
                <label style={{color: "#a0aec0", fontSize: "0.85rem"}}>Địa chỉ</label>
                {isEditing ? <input type="text" name="address" className="profile-input" placeholder="Chưa cập nhật..." value={editProfile.address} onChange={handleEditChange} /> 
                           : <div style={{color: currentUser.address ? "white" : "#718096"}}>{currentUser.address || "(Chưa có địa chỉ)"}</div>}
              </div>
              <div>
                <label style={{color: "#a0aec0", fontSize: "0.85rem"}}>Email (Cố định)</label>
                <div style={{color: "#718096"}}>{currentUser.email}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
              {isEditing ? (
                <>
                  <button onClick={handleUpdateProfile} className="btn-save" disabled={loading}>{loading ? "Đang lưu..." : "Lưu thay đổi"}</button>
                  <button onClick={() => setIsEditing(false)} className="btn-cancel">Hủy</button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="btn-edit">Chỉnh sửa hồ sơ</button>
              )}
            </div>

            {!isEditing && <button className="btn-logout" onClick={handleLogout}>Đăng Xuất</button>}
          </div>
        ) : (
          <>
            <h2 style={{ color: isRegister ? "#fbbf24" : "#e50914", marginBottom: "20px" }}>{isRegister ? "Đăng Ký Thành Viên" : "Đăng Nhập"}</h2>
            {error && <p style={{ color: "#ff4d4f", border: "1px solid red", padding: "5px" }}>{error}</p>}
            
            {isRegister && <input type="text" name="fullName" placeholder="Họ tên..." className="search-input" style={{width: '100%', marginBottom: '10px'}} value={formData.fullName} onChange={handleInputChange} />}
            <input type="email" name="email" placeholder="Email..." className="search-input" style={{width: '100%', marginBottom: '10px'}} value={formData.email} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Mật khẩu..." className="search-input" style={{width: '100%', marginBottom: '10px'}} value={formData.password} onChange={handleInputChange} />
            {isRegister && <input type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu..." className="search-input" style={{width: '100%', marginBottom: '10px'}} value={formData.confirmPassword} onChange={handleInputChange} />}
            
            <button className="btn-checkout" style={{width: '100%', marginTop: '10px'}} onClick={isRegister ? handleRegister : handleLogin} disabled={loading}>{loading ? "Đang xử lý..." : (isRegister ? "Đăng Ký" : "Đăng Nhập")}</button>
            <p style={{marginTop: "15px", cursor: "pointer", color: "#fbbf24", textDecoration: "underline"}} onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký ngay"}</p>
          </>
        )}
      </div>

      <div className="benefits-box">
        <div className="vip-header"><h2 style={{ color: "#fbbf24", margin: 0 }}>QUYỀN LỢI VIP</h2><span className="badge-member">MEMBER</span></div>
        <div className="vip-grid">
          {[
            { icon: "🎁", title: "Quà tặng", desc: "Nhận quà sinh nhật & Lễ tết" },
            { icon: "🍿", title: "Free Bắp Nước", desc: "Miễn phí refill bắp nước thứ 3" },
            { icon: "💰", title: "Tích điểm", desc: "Hoàn tiền 10% mỗi giao dịch" },
            { icon: "🎟️", title: "Vé Ưu Đãi", desc: "Đồng giá 50k vào thứ 2" },
            { icon: "🚀", title: "Chiếu Sớm", desc: "Quyền mua vé Sneakshow" },
            { icon: "🛋️", title: "Phòng VIP", desc: "Sử dụng phòng chờ hạng sang" },
          ].map((item, idx) => (
            <div key={idx} className="benefit-item"><div className="benefit-icon">{item.icon}</div><div><h4 style={{ margin: "0 0 5px", color: "white" }}>{item.title}</h4><p style={{ margin: 0, fontSize: "0.8rem", color: "#a0aec0" }}>{item.desc}</p></div></div>
          ))}
        </div>
      </div>

      <style>{`
        .profile-input { width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #4a5568; background: #2d3748; color: white; outline: none; }
        .profile-input:focus { border-color: #fbbf24; }
        .btn-edit { background: #4a5568; color: white; width: 100%; padding: 10px; border: none; border-radius: 5px; cursor: pointer; }
        .btn-edit:hover { background: #718096; }
        .btn-save { background: #38a169; color: white; flex: 1; padding: 10px; border: none; border-radius: 5px; cursor: pointer; }
        .btn-save:hover { background: #2f855a; }
        .btn-cancel { background: #e53e3e; color: white; flex: 1; padding: 10px; border: none; border-radius: 5px; cursor: pointer; }
        .btn-cancel:hover { background: #c53030; }
        .btn-logout { width: 100%; margin-top: 15px; background: transparent; border: 1px solid #e50914; color: #e50914; padding: 8px; border-radius: 5px; cursor: pointer; }
        .btn-logout:hover { background: #e50914; color: white; }
        .badge-member { background: #fbbf24; color: black; padding: 5px 10px; border-radius: 4px; font-weight: bold; font-size: 0.8rem; }
      `}</style>
    </div>
  );
};

export default Members;

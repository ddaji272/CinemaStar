// src/pages/Members.jsx
import { useState, useEffect } from "react";

// Cấu hình đường dẫn API dựa trên server.js bạn gửi
const API_BASE = "https://cinestarbackend.onrender.com";

const Members = () => {
  // State giao diện
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // State dữ liệu người dùng
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // 1. Kiểm tra xem đã đăng nhập chưa khi vào trang
  useEffect(() => {
    const savedUser = localStorage.getItem("user_info");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Hàm nhập liệu form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Xóa lỗi khi gõ lại
  };

  // 2. Xử lý ĐĂNG KÝ
  const handleRegister = async () => {
    // Validate cơ bản
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    try {
      // Gọi API: /api/auth/register (theo file routes/auth.js)
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName, // Backend auth.js yêu cầu 'fullName'
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend auth.js trả về lỗi dạng { msg: "..." }
        throw new Error(data.msg || "Đăng ký thất bại");
      }

      alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
      setIsRegister(false); // Chuyển về form đăng nhập
      setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Xử lý ĐĂNG NHẬP
  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }

    setLoading(true);
    try {
      // Gọi API: /api/auth/login (theo file routes/auth.js)
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend trả về 400 nếu sai pass, msg nằm trong data.msg
        throw new Error(data.msg || "Đăng nhập thất bại");
      }

      // Backend auth.js trả về: { msg, role, userId, name }
      // Lưu thông tin này vào máy để nhớ đăng nhập
      localStorage.setItem("user_info", JSON.stringify(data));
      setCurrentUser(data);
      alert(`Đăng nhập thành công! Xin chào ${data.name}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Xử lý ĐĂNG XUẤT
  const handleLogout = () => {
    localStorage.removeItem("user_info");
    setCurrentUser(null);
    setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="member-container">
      <div className="login-box">
        
        {/* === LOGIC HIỂN THỊ: NẾU CÓ USER -> HIỆN THÔNG TIN, CHƯA CÓ -> HIỆN FORM === */}
        {currentUser ? (
          <div style={{ textAlign: "center", color: "white" }}>
            <h2 style={{ color: "#fbbf24", marginBottom: "20px" }}>
              XIN CHÀO, {currentUser.name ? currentUser.name.toUpperCase() : "BẠN"}
            </h2>
            <div style={{ fontSize: "5rem", marginBottom: "20px" }}>🤴</div>
            <p style={{ color: "#a0aec0", marginBottom: "5px" }}>Vai trò: <span style={{color: "white"}}>{currentUser.role}</span></p>
            <p style={{ color: "#a0aec0" }}>ID: <span style={{fontSize: "0.8rem"}}>{currentUser.userId}</span></p>
            
            <button
              className="btn-checkout"
              style={{ width: "100%", marginTop: "30px", backgroundColor: "#e50914" }}
              onClick={handleLogout}
            >
              Đăng Xuất
            </button>
          </div>
        ) : (
          <>
            {/* === FORM ĐĂNG NHẬP / ĐĂNG KÝ === */}
            <h2
              style={{
                color: isRegister ? "#fbbf24" : "#e50914",
                marginBottom: "20px",
              }}
            >
              {isRegister ? "Đăng Ký Thành Viên" : "Đăng Nhập"}
            </h2>

            {/* Hiển thị lỗi nếu có */}
            {error && (
              <p style={{ color: "#ff4d4f", background: "rgba(255,0,0,0.1)", padding: "8px", borderRadius: "4px", fontSize: "0.9rem" }}>
                ⚠️ {error}
              </p>
            )}

            {isRegister && (
              <div className="input-group">
                <label>Họ và Tên</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Nhập họ tên..." 
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="input-group">
              <label>Tài khoản / Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="Nhập email..." 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label>Mật khẩu</label>
              <input 
                type="password" 
                name="password"
                placeholder="Nhập mật khẩu..." 
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {isRegister && (
              <div className="input-group">
                <label>Nhập lại Mật khẩu</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu..." 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <button
              className="btn-checkout"
              style={{ width: "100%", marginTop: "10px", opacity: loading ? 0.7 : 1 }}
              onClick={isRegister ? handleRegister : handleLogin}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : (isRegister ? "Đăng Ký Ngay" : "Đăng Nhập")}
            </button>

            <div className="auth-toggle">
              {isRegister ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
              <span onClick={() => { setIsRegister(!isRegister); setError(""); }}>
                {isRegister ? "Đăng nhập ngay" : "Đăng ký ngay"}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="benefits-box">
        <div className="vip-header">
          <h2 style={{ color: "#fbbf24", margin: 0 }}>QUYỀN LỢI VIP</h2>
          <span
            style={{
              background: "#fbbf24",
              color: "black",
              padding: "5px 10px",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "0.8rem",
            }}
          >
            MEMBER
          </span>
        </div>
        <div className="vip-grid">
          {[
            {
              icon: "🎁",
              title: "Quà tặng",
              desc: "Nhận quà sinh nhật & Lễ tết",
            },
            {
              icon: "🍿",
              title: "Free Bắp Nước",
              desc: "Miễn phí refill bắp nước thứ 3",
            },
            {
              icon: "💰",
              title: "Tích điểm",
              desc: "Hoàn tiền 10% mỗi giao dịch",
            },
            { icon: "🎟️", title: "Vé Ưu Đãi", desc: "Đồng giá 50k vào thứ 2" },
            { icon: "🚀", title: "Chiếu Sớm", desc: "Quyền mua vé Sneakshow" },
            {
              icon: "🛋️",
              title: "Phòng VIP",
              desc: "Sử dụng phòng chờ hạng sang",
            },
          ].map((item, idx) => (
            <div key={idx} className="benefit-item">
              <div className="benefit-icon">{item.icon}</div>
              <div>
                <h4 style={{ margin: "0 0 5px", color: "white" }}>
                  {item.title}
                </h4>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#a0aec0" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;

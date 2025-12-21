// src/pages/Members.jsx
import { useState } from "react";

const Members = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="member-container">
      <div className="login-box">
        <h2
          style={{
            color: isRegister ? "#fbbf24" : "#e50914",
            marginBottom: "20px",
          }}
        >
          {isRegister ? "Đăng Ký Thành Viên" : "Đăng Nhập"}
        </h2>

        {isRegister && (
          <div className="input-group">
            <label>Họ và Tên</label>
            <input type="text" placeholder="Nhập họ tên..." />
          </div>
        )}

        <div className="input-group">
          <label>Tài khoản / Email</label>
          <input type="text" placeholder="Nhập email..." />
        </div>

        <div className="input-group">
          <label>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu..." />
        </div>

        {isRegister && (
          <div className="input-group">
            <label>Nhập lại Mật khẩu</label>
            <input type="password" placeholder="Xác nhận mật khẩu..." />
          </div>
        )}

        <button
          className="btn-checkout"
          style={{ width: "100%", marginTop: "10px" }}
        >
          {isRegister ? "Đăng Ký Ngay" : "Đăng Nhập"}
        </button>

        <div className="auth-toggle">
          {isRegister ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Đăng nhập ngay" : "Đăng ký ngay"}
          </span>
        </div>
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

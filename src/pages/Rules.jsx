// src/pages/Rules.jsx
const Rules = () => {
  return (
    <div
      className="rules-container"
      style={{ background: "transparent", padding: 0 }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#e50914",
          marginBottom: "40px",
          fontSize: "2rem",
        }}
      >
        NỘI QUY RẠP CHIẾU
      </h2>
      <div className="rules-grid">
        {[
          {
            icon: "📷",
            title: "Cấm Quay Phim",
            desc: "Hành vi quay lén sẽ bị xử lý theo pháp luật.",
          },
          {
            icon: "🍔",
            title: "Cấm Đồ Ăn Ngoài",
            desc: "Vui lòng không mang thức ăn bên ngoài vào rạp.",
          },
          {
            icon: "🤫",
            title: "Giữ Trật Tự",
            desc: "Không nói chuyện lớn tiếng ảnh hưởng người khác.",
          },
          {
            icon: "💺",
            title: "Ngồi Đúng Ghế",
            desc: "Vui lòng kiểm tra vé và ngồi đúng vị trí.",
          },
          {
            icon: "📵",
            title: "Tắt Chuông ĐT",
            desc: "Để điện thoại chế độ rung hoặc im lặng.",
          },
          {
            icon: "👶",
            title: "Trẻ Em",
            desc: "Phim C13, C16, C18 cần tuân thủ độ tuổi.",
          },
        ].map((rule, idx) => (
          <div key={idx} className="rule-card">
            <div className="rule-icon">{rule.icon}</div>
            <div className="rule-title">{rule.title}</div>
            <div className="rule-desc">{rule.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;

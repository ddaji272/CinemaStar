import { useState } from "react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("movies");

  // --- Theme Colors ---
  const colors = {
    bg: "#0f172a",
    card: "rgba(30, 41, 59, 0.7)",
    accent: "#fbbf24",
    danger: "#ef4444",
    success: "#22c55e",
    textMuted: "#94a3b8"
  };

  // --- Stats Data ---
  const stats = [
    { title: "Doanh thu", value: "12.5M", icon: "💰", color: "linear-gradient(135deg, #f59e0b, #d97706)" },
    { title: "Vé đã bán", value: "1,240", icon: "🎟️", color: "linear-gradient(135deg, #3b82f6, #2563eb)" },
    { title: "Phim", value: "24", icon: "🎬", color: "linear-gradient(135deg, #10b981, #059669)" },
    { title: "User", value: "156", icon: "👥", color: "linear-gradient(135deg, #8b5cf6, #7c3aed)" },
  ];

  // --- Table Actions UI ---
  const ActionButtons = ({ onEdit, onDelete }) => (
    <div className="d-flex gap-2">
      <button className="btn btn-sm btn-primary px-3" style={{borderRadius: '8px'}} onClick={onEdit}>Sửa</button>
      <button className="btn btn-sm btn-outline-danger px-3" style={{borderRadius: '8px'}} onClick={onDelete}>Xóa</button>
    </div>
  );

  // --- 1. Manage Movies ---
  const ManageMovies = () => (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white fw-bold mb-0">Quản lý phim</h3>
        <button className="btn btn-warning fw-bold px-4" style={{borderRadius: '10px'}}>+ Thêm phim mới</button>
      </div>
      <div className="card border-0 p-3" style={{ backgroundColor: colors.card, backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0">
            <thead className="text-muted small">
              <tr>
                <th>ID</th>
                <th>PHIM</th>
                <th>THỜI LƯỢNG</th>
                <th>NGÀY PHÁT HÀNH</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, title: "Avatar: The Way of Water", duration: "192 min", date: "2022-12-16" },
                { id: 2, title: "Oppenheimer", duration: "180 min", date: "2023-07-21" }
              ].map(movie => (
                <tr key={movie.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td className="py-3">#{movie.id}</td>
                  <td className="py-3 fw-bold text-warning">{movie.title}</td>
                  <td className="py-3">{movie.duration}</td>
                  <td className="py-3 text-muted">{movie.date}</td>
                  <td className="py-3"><ActionButtons /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- 2. Manage Users ---
  const ManageUsers = () => (
    <div className="animate__animated animate__fadeIn">
       <h3 className="text-white fw-bold mb-4">Danh sách thành viên</h3>
       <div className="card border-0 p-3" style={{ backgroundColor: colors.card, borderRadius: '15px' }}>
         <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
                <thead>
                    <tr className="text-muted small">
                        <th>USER</th>
                        <th>VAI TRÒ</th>
                        <th>TRẠNG THÁI</th>
                        <th>HÀNH ĐỘNG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center fw-bold me-3" style={{width: '40px', height: '40px'}}>AJ</div>
                                <div>
                                    <div className="fw-bold">Alice Johnson</div>
                                    <div className="small text-muted">alice@example.com</div>
                                </div>
                            </div>
                        </td>
                        <td><span className="badge bg-secondary">Customer</span></td>
                        <td><span className="badge bg-success">Online</span></td>
                        <td><button className="btn btn-sm btn-danger">Khóa</button></td>
                    </tr>
                </tbody>
            </table>
         </div>
       </div>
    </div>
  )

  // --- Main Layout ---
  return (
    <div className="container-fluid py-4" style={{ minHeight: "100vh", backgroundColor: colors.bg }}>
      <div className="row g-4">
        
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2">
          <div className="p-3 shadow-lg" style={{ backgroundColor: colors.card, borderRadius: '20px', minHeight: '80vh' }}>
            <div className="text-warning fw-bold text-center mb-4 fs-5" style={{letterSpacing: '2px'}}>CINEMA ADMIN</div>
            
            <div className="nav flex-column nav-pills gap-2">
              {[
                { id: "movies", label: "Phim", icon: "🎬" },
                { id: "showtimes", label: "Suất chiếu", icon: "⏰" },
                { id: "theaters", label: "Rạp", icon: "🏛️" },
                { id: "rooms", label: "Phòng", icon: "🛋️" },
                { id: "users", label: "Thành viên", icon: "👥" }
              ].map(item => (
                <button
                  key={item.id}
                  className={`nav-link text-start border-0 py-3 d-flex align-items-center gap-2 ${activeSection === item.id ? "active shadow" : "text-white opacity-75"}`}
                  style={{
                    backgroundColor: activeSection === item.id ? colors.accent : "transparent",
                    color: activeSection === item.id ? "black" : "white",
                    borderRadius: '12px',
                    transition: '0.3s'
                  }}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span>{item.icon}</span> {item.label}
                </button>
              ))}
            </div>
            
            <button className="btn btn-outline-danger w-100 mt-5 border-0 py-2" style={{borderRadius: '12px'}} onClick={() => toast.info("Đã đăng xuất")}>
                🏃 Đăng xuất
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-md-9 col-lg-10">
          
          {/* Header Stats */}
          <div className="row g-3 mb-5">
            {stats.map((s, i) => (
                <div key={i} className="col-6 col-lg-3">
                    <div className="p-3 shadow-sm d-flex align-items-center gap-3" style={{ background: s.color, borderRadius: '15px', color: 'white' }}>
                        <div className="fs-1">{s.icon}</div>
                        <div>
                            <div className="small opacity-75">{s.title}</div>
                            <div className="fw-bold fs-4">{s.value}</div>
                        </div>
                    </div>
                </div>
            ))}
          </div>

          {/* Dynamic Sections */}
          <div className="px-2">
            {activeSection === "movies" && <ManageMovies />}
            {activeSection === "users" && <ManageUsers />}
            {(activeSection !== "movies" && activeSection !== "users") && (
                <div className="text-center py-5">
                    <div className="fs-1">🚧</div>
                    <div className="text-muted mt-2">Chức năng {activeSection} đang được bảo trì...</div>
                </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .nav-link:hover {
            background-color: rgba(251, 191, 36, 0.1) !important;
            transform: translateX(5px);
        }
        .nav-link.active:hover {
            background-color: #fbbf24 !important;
            transform: none;
        }
        .table-dark {
            --bs-table-bg: transparent;
        }
        tr:hover {
            background-color: rgba(255,255,255,0.02) !important;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;

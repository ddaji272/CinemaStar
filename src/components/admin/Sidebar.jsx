const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const colors = {
    card: "rgba(30, 41, 59, 0.7)",
    accent: "#fbbf24",
  };

  // --- UPDATED MENU LIST (Added Theaters & Rooms) ---
  const menuItems = [
    { id: "movies", label: "Phim", icon: "🎬" },
    { id: "categories", label: "Thể loại", icon: "🏷️" },
    { id: "theaters", label: "Rạp", icon: "🏛️" }, // Added
    { id: "rooms", label: "Phòng", icon: "🛋️" }, // Added
    { id: "showtimes", label: "Suất chiếu", icon: "⏰" },
    { id: "users", label: "Thành viên", icon: "👥" },
  ];

  return (
    <div className="col-md-3 col-lg-2">
      <div
        className="p-3 shadow-lg"
        style={{
          backgroundColor: colors.card,
          borderRadius: "20px",
          minHeight: "80vh",
        }}
      >
        <div
          className="text-warning fw-bold text-center mb-4 fs-5"
          style={{ letterSpacing: "2px" }}
        >
          CINEMA ADMIN
        </div>

        <div className="nav flex-column nav-pills gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link text-start border-0 py-3 ${
                activeSection === item.id ? "active shadow" : "text-white" // CHANGED: Pure white text for inactive items
              }`}
              style={{
                backgroundColor:
                  activeSection === item.id ? colors.accent : "transparent",
                color: activeSection === item.id ? "black" : "white",
                borderRadius: "12px",
              }}
              onClick={() => setActiveSection(item.id)}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>

        <button
          className="btn btn-outline-danger w-100 mt-5 border-0 py-2"
          onClick={onLogout}
        >
          🏃 Thoát
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

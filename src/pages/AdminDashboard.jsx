import { useState } from "react";
import Sidebar from "../components/admin/Sidebar.jsx";
import ManageMovies from "../components/admin/ManageMovies";
import ManageCategories from "../components/admin/ManageCategories";
import ManageUsers from "../components/admin/ManageUsers";
import ManageTheaters from "../components/admin/ManageTheaters";
import ManageRooms from "../components/admin/ManageRooms";
import ManageShowtimes from "../components/admin/ManageShowtimes";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("movies");

  const colors = { bg: "#0f172a" };

  return (
    <div
      className="container-fluid py-4"
      style={{ minHeight: "100vh", backgroundColor: colors.bg }}
    >
      <div className="row g-4">
        {/* Sidebar Component */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={() => (window.location.href = "/")}
        />

        {/* Content Area */}
        <div className="col-md-9 col-lg-10">
          <div className="px-2">
            {activeSection === "movies" && <ManageMovies />}
            {activeSection === "categories" && <ManageCategories />}
            {activeSection === "users" && <ManageUsers />}
            {activeSection === "theaters" && <ManageTheaters />}
            {activeSection === "rooms" && <ManageRooms />}
            {activeSection === "showtimes" && <ManageShowtimes />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

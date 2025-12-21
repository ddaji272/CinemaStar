import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import BookingFlow from "./pages/BookingFlow";
import Theaters from "./pages/Theaters";
import Members from "./pages/Members";
import Rules from "./pages/Rules";
import AdminDashboard from "./pages/AdminDashBoard";

function App() {
  const [activeTab, setActiveTab] = useState("movies");

  const renderContent = () => {
    switch (activeTab) {
      case "movies":
        return <BookingFlow />;
      case "theaters":
        return <Theaters />;
      case "members":
        return <Members />;
      case "rules":
        return <Rules />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <BookingFlow />;
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("movies")}
        >
          CINEMA STAR
        </h1>
        {/* Hidden/Subtle Admin Toggle */}
        <button
          className="admin-toggle-btn"
          onClick={() => setActiveTab("admin")}
        >
          Admin
        </button>
      </header>

      {/* Hide Navbar when in Admin mode to keep the dashboard clean */}
      {activeTab !== "admin" && (
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <div className="content-area">{renderContent()}</div>
    </div>
  );
}

export default App;

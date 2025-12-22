// src/App.jsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // IMPORT ROUTER
import Navbar from "./components/Navbar";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import AdminDashboard from "./pages/AdminDashBoard"; // Admin Dashboard
import AdminLogin from "./pages/AdminLogin"; // The new page
import BookingFlow from "./pages/BookingFlow";
import Theaters from "./pages/Theaters";
import Members from "./pages/Members";
import Rules from "./pages/Rules";

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap everything in Router */}
      <div className="App">
        <ToastContainer theme="dark" position="top-right" autoClose={3000} />

        <Routes>
          {/* --- ADMIN ROUTES (SEPARATE) --- */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* --- PUBLIC ROUTES (MAIN WEBSITE) --- */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

// Create a sub-component for your existing "Tab" layout
// This ensures Navbar only shows up on the customer site, not the admin login
const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("phim");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user_info");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleUserChange = (user) => {
    setCurrentUser(user);
    // If regular user logs in, go to movies
    if (user) setActiveTab("phim");
  };

  return (
    <>
      <header>
        <h1 className="logo">CINEMA STAR</h1>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={currentUser}
        />
      </header>

      <div className="container">
        {activeTab === "phim" && (
          <BookingFlow currentUser={currentUser} onSwitchTab={setActiveTab} />
        )}
        {activeTab === "rap" && <Theaters />}
        {activeTab === "member" && (
          <Members onUserChange={handleUserChange} onSwitchTab={setActiveTab} />
        )}
        {activeTab === "luat" && <Rules />}
      </div>
    </>
  );
};

export default App;

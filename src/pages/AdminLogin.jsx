// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook for redirection
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the specific Admin Login API we created earlier
      const res = await axios.post(
        "http://localhost:5000/api/auth/admin/login",
        {
          email,
          password,
        }
      );

      if (res.data.role === "admin") {
        toast.success("Chào mừng Admin! 👋");
        // Save admin token/info if needed
        localStorage.setItem("admin_token", res.data.token);
        // Redirect to the Dashboard
        navigate("/admin/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Đăng nhập thất bại");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a",
        color: "white",
      }}
    >
      <div
        className="card p-5 border-0 shadow-lg"
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.8)",
          borderRadius: "15px",
          width: "400px",
        }}
      >
        <h2 className="text-center text-warning fw-bold mb-4">ADMIN ACCESS</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-warning w-100 fw-bold">ĐĂNG NHẬP</button>
        </form>
        <div className="text-center mt-3">
          <a href="/" className="text-muted text-decoration-none small">
            ← Quay lại trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

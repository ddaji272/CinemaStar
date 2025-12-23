import { useState, useEffect } from "react";
import { userService } from "../../services/userService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  
  // 1. Thêm state cho Search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userService.getAll();
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // 2. Logic lọc User (Search Logic)
  // Tìm theo Tên hoặc Email
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    const name = user.fullName ? user.fullName.toLowerCase() : "";
    const email = user.email ? user.email.toLowerCase() : "";
    
    return name.includes(term) || email.includes(term);
  });

  return (
    <div className="animate__animated animate__fadeIn">
      {/* 3. Header chứa Title và Search Input */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white fw-bold mb-0">Danh sách thành viên</h3>
        
        <input 
            type="text" 
            className="form-control"
            placeholder="🔍 Tìm tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
                width: "300px", 
                borderRadius: "10px",
                border: "none"
            }}
        />
      </div>

      <div
        className="card border-0 p-3"
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.7)",
          borderRadius: "15px",
        }}
      >
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr className="text-white-50 small">
                <th>USER</th>
                <th>VAI TRÒ</th>
              </tr>
            </thead>
            <tbody>
              {/* 4. Render danh sách đã lọc (filteredUsers) */}
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center fw-bold me-3"
                          style={{ width: "40px", height: "40px" }}
                        >
                          {user.fullName ? user.fullName.charAt(0) : "U"}
                        </div>
                        <div>
                          <div className="fw-bold">{user.fullName}</div>
                          <div className="small text-white-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-secondary">Customer</span>
                    </td>
                  </tr>
                ))
              ) : (
                /* 5. Thông báo khi không tìm thấy kết quả */
                <tr>
                  <td colSpan="2" className="text-center text-white-50 py-4">
                    {users.length === 0 
                        ? "Chưa có thành viên nào" 
                        : `Không tìm thấy thành viên nào khớp với "${searchTerm}"`
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

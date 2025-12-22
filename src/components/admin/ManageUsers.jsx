import { useState, useEffect } from "react";
import { userService } from "../../services/userService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="animate__animated animate__fadeIn">
      <h3 className="text-white fw-bold mb-4">Danh sách thành viên</h3>
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
              {users.map((user) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

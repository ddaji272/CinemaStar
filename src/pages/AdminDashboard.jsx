import { useState } from "react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("movies");

  // --- Common Styles to match App.css ---
  const cardStyle = {
    backgroundColor: "var(--card-bg)",
    color: "var(--text-primary)",
  };
  const inputStyle = {
    backgroundColor: "var(--bg-color)",
    color: "white",
    border: "1px solid #2d3748",
  };
  const headerStyle = { borderBottom: "1px solid #2d3748" };

  // --- 1. Manage Movies Component ---
  const ManageMovies = () => (
    <div className="card border-0 shadow-sm" style={cardStyle}>
      <div
        className="card-header d-flex justify-content-between align-items-center py-3"
        style={headerStyle}
      >
        <h4 className="mb-0 text-white">Manage Movies</h4>
        <button className="btn btn-success btn-sm">
          <i className="bi bi-plus-lg"></i> + Add Movie
        </button>
      </div>
      <div className="card-body">
        <div className="input-group mb-3" style={{ maxWidth: "400px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            style={inputStyle}
          />
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Duration</th>
                <th>Release Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <span className="fw-bold">Avatar: The Way of Water</span>
                </td>
                <td>192 min</td>
                <td>2022-12-16</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <span className="fw-bold">Oppenheimer</span>
                </td>
                <td>180 min</td>
                <td>2023-07-21</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- 2. Manage Showtimes Component ---
  const ManageShowtimes = () => (
    <div className="card border-0 shadow-sm" style={cardStyle}>
      <div
        className="card-header d-flex justify-content-between align-items-center py-3"
        style={headerStyle}
      >
        <h4 className="mb-0 text-white">Manage Showtimes</h4>
        <button className="btn btn-success btn-sm">+ Add Showtime</button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>Movie</th>
                <th>Theater / Room</th>
                <th>Date & Time</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Avatar 2</td>
                <td>
                  CGV Central <br />
                  <small className="text-muted">Room 1</small>
                </td>
                <td>
                  10:00 AM <br />
                  <small className="text-muted">25 Dec 2023</small>
                </td>
                <td>$10</td>
                <td>
                  <span className="badge bg-success">Active</span>
                </td>
                <td>
                  <button className="btn btn-warning btn-sm text-white">
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- 3. Manage Theaters Component ---
  const ManageTheaters = () => (
    <div className="card border-0 shadow-sm" style={cardStyle}>
      <div
        className="card-header d-flex justify-content-between align-items-center py-3"
        style={headerStyle}
      >
        <h4 className="mb-0 text-white">Manage Theaters</h4>
        <button className="btn btn-success btn-sm">+ Add Theater</button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Theater Name</th>
                <th>Location</th>
                <th>Total Rooms</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TH01</td>
                <td>
                  <span className="fw-bold">CGV Central</span>
                </td>
                <td>123 Main Street</td>
                <td>8 Rooms</td>
                <td>(028) 3999-9999</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- 4. Manage Screening Rooms ---
  const ManageScreeningRooms = () => (
    <div className="card border-0 shadow-sm" style={cardStyle}>
      <div
        className="card-header d-flex justify-content-between align-items-center py-3"
        style={headerStyle}
      >
        <h4 className="mb-0 text-white">Manage Screening Rooms</h4>
        <button className="btn btn-success btn-sm">+ Add Room</button>
      </div>
      <div className="card-body">
        {/* Filter Bar */}
        <div className="d-flex gap-2 mb-3">
          <select
            className="form-select"
            style={{ maxWidth: "200px", ...inputStyle }}
          >
            <option>All Theaters</option>
            <option>CGV Central</option>
            <option>Lotte Cinema</option>
          </select>
          <button className="btn btn-outline-secondary">Filter</button>
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Name</th>
                <th>Theater</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>RM001</td>
                <td>
                  <span className="fw-bold">Room 1 (IMAX)</span>
                </td>
                <td>CGV Central</td>
                <td>120 Seats</td>
                <td>
                  <span className="badge bg-success">Active</span>
                </td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-warning btn-sm text-white">
                    Maintenance
                  </button>
                </td>
              </tr>
              <tr>
                <td>RM002</td>
                <td>
                  <span className="fw-bold">Room 2</span>
                </td>
                <td>CGV Central</td>
                <td>80 Seats</td>
                <td>
                  <span className="badge bg-warning text-dark">Cleaning</span>
                </td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-success btn-sm">Activate</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- 5. Manage Users Component ---
  const ManageUsers = () => (
    <div className="card border-0 shadow-sm" style={cardStyle}>
      <div
        className="card-header d-flex justify-content-between align-items-center py-3"
        style={headerStyle}
      >
        <h4 className="mb-0 text-white">Manage Users</h4>
        <button className="btn btn-outline-primary btn-sm">Export CSV</button>
      </div>
      <div className="card-body">
        <div className="input-group mb-3" style={{ maxWidth: "400px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search user..."
            style={inputStyle}
          />
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Info</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#101</td>
                <td>
                  <div className="fw-bold">Alice Johnson</div>
                  <div className="text-muted small">alice@example.com</div>
                </td>
                <td>
                  <span className="badge bg-info text-dark">Customer</span>
                </td>
                <td>
                  <span className="badge bg-success">Active</span>
                </td>
                <td>
                  <button className="btn btn-secondary btn-sm me-2">
                    History
                  </button>
                  <button className="btn btn-danger btn-sm">Ban</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- Main Layout ---
  return (
    <div
      className="container-fluid py-4"
      style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)" }}
    >
      <div className="row g-4">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2">
          <div className="list-group shadow-sm">
            <div
              className="list-group-item text-white fw-bold py-3"
              style={{ backgroundColor: "#e50914", borderColor: "#e50914" }}
            >
              ADMIN PANEL
            </div>
            {/* Sidebar Buttons Function */}
            {["movies", "showtimes", "theaters", "rooms", "users"].map(
              (section) => (
                <button
                  key={section}
                  className={`list-group-item list-group-item-action text-white ${
                    activeSection === section ? "active" : ""
                  }`}
                  style={{
                    backgroundColor:
                      activeSection === section
                        ? "var(--highlight-color)"
                        : "var(--card-bg)",
                    color: activeSection === section ? "black" : "white",
                    borderColor: "#2d3748",
                  }}
                  onClick={() => setActiveSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="col-md-9 col-lg-10">
          {activeSection === "movies" && <ManageMovies />}
          {activeSection === "showtimes" && <ManageShowtimes />}
          {activeSection === "theaters" && <ManageTheaters />}
          {activeSection === "rooms" && <ManageScreeningRooms />}
          {activeSection === "users" && <ManageUsers />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

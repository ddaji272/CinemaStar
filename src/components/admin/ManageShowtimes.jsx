import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { showtimeService } from "../../services/showtimeService";
import { movieService } from "../../services/movieService";
import { roomService } from "../../services/roomService";
import ShowtimeModal from "./modals/ShowtimeModal";

const ManageShowtimes = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    movieID: "",
    roomID: "",
    startTime: "",
    status: "Available",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [stRes, mRes, rRes] = await Promise.all([
        showtimeService.getAll(),
        movieService.getAll(),
        roomService.getAll(),
      ]);
      setShowtimes(stRes.data);
      setMovies(mRes.data);
      setRooms(rRes.data);
    } catch (err) {
      toast.error("Lỗi tải dữ liệu");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await showtimeService.update(editingId, formData);
      else await showtimeService.create(formData);
      toast.success("Thành công!");
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error("Lỗi khi lưu!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa suất chiếu này?")) return;
    try {
      await showtimeService.delete(id);
      toast.success("Đã xóa!");
      fetchData();
    } catch (err) {
      toast.error("Lỗi xóa!");
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({
      movieID: "",
      roomID: "",
      startTime: "",
      status: "Available",
    });
    setShowModal(true);
  };

  const openEdit = (st) => {
    setEditingId(st._id);
    // Format date for datetime-local input
    const dateStr = new Date(st.startTime).toISOString().slice(0, 16);
    setFormData({
      movieID: st.movieID?._id || st.movieID,
      roomID: st.roomID?._id || st.roomID,
      startTime: dateStr,
      status: st.status,
    });
    setShowModal(true);
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white fw-bold mb-0">Quản lý Suất Chiếu</h3>
        <button
          className="btn btn-warning fw-bold px-4"
          style={{ borderRadius: "10px" }}
          onClick={openAdd}
        >
          + Thêm Suất Chiếu
        </button>
      </div>
      <div
        className="card border-0 p-3"
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.7)",
          borderRadius: "15px",
        }}
      >
        <table className="table table-dark table-hover mb-0 align-middle">
          <thead className="text-white-50 small">
            <tr>
              <th>PHIM</th>
              <th>RẠP / PHÒNG</th>
              <th>THỜI GIAN</th>
              <th>TRẠNG THÁI</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.map((st) => (
              <tr key={st._id}>
                <td className="fw-bold text-warning">
                  {st.movieID?.title || "Unknown"}
                </td>
                <td>
                  <div>{st.roomID?.theaterID?.theaterName}</div>
                  <small className="text-text-white-50">
                    {st.roomID?.name}
                  </small>
                </td>
                <td>{new Date(st.startTime).toLocaleString()}</td>
                <td>
                  <span className="badge bg-success">{st.status}</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEdit(st)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(st._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ShowtimeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        movies={movies}
        rooms={rooms}
        isEditing={!!editingId}
      />
    </div>
  );
};
export default ManageShowtimes;

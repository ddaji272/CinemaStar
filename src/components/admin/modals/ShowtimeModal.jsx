import React from "react";

const ShowtimeModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  movies,
  rooms,
  isEditing,
}) => {
  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content text-white"
          style={{ backgroundColor: "#1e293b" }}
        >
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-warning fw-bold">
              {isEditing ? "Sửa Suất Chiếu" : "Thêm Suất Chiếu Mới"}
            </h5>
            <button
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              {/* Select Movie */}
              <div className="mb-3">
                <label className="form-label text-white-50 small">Phim</label>
                <select
                  className="form-select bg-dark text-white border-secondary"
                  required
                  value={formData.movieID}
                  onChange={(e) =>
                    setFormData({ ...formData, movieID: e.target.value })
                  }
                >
                  <option value="" style={{ color: "gray" }}>
                    Chọn phim...
                  </option>
                  {movies.map((m) => (
                    <option
                      key={m._id}
                      value={m._id}
                      style={{ backgroundColor: "#1e293b" }}
                    >
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Room */}
              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Phòng Chiếu
                </label>
                <select
                  className="form-select bg-dark text-white border-secondary"
                  required
                  value={formData.roomID}
                  onChange={(e) =>
                    setFormData({ ...formData, roomID: e.target.value })
                  }
                >
                  <option value="" style={{ color: "gray" }}>
                    Chọn phòng...
                  </option>
                  {rooms.map((r) => (
                    <option
                      key={r._id}
                      value={r._id}
                      style={{ backgroundColor: "#1e293b" }}
                    >
                      {r.name} - {r.theaterID?.theaterName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Thời gian chiếu
                </label>
                <input
                  type="datetime-local"
                  className="form-control bg-dark text-white border-secondary"
                  required
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                />
              </div>

              {/* Status */}
              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Trạng thái
                </label>
                <select
                  className="form-select bg-dark text-white border-secondary"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option
                    value="Available"
                    style={{ backgroundColor: "#1e293b" }}
                  >
                    Sắp chiếu
                  </option>
                  <option value="Full" style={{ backgroundColor: "#1e293b" }}>
                    Hết vé
                  </option>
                  <option
                    value="Cancelled"
                    style={{ backgroundColor: "#1e293b" }}
                  >
                    Đã hủy
                  </option>
                </select>
              </div>
            </div>
            <div className="modal-footer border-secondary">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Đóng
              </button>
              <button type="submit" className="btn btn-warning fw-bold">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ShowtimeModal;

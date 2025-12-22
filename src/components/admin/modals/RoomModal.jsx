import React from "react";

const RoomModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  theaters,
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
              {isEditing ? "Sửa Phòng Chiếu" : "Thêm Phòng Mới"}
            </h5>
            <button
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Tên Phòng
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Thuộc Rạp (Theater)
                </label>
                <select
                  className="form-select bg-dark text-white border-secondary"
                  required
                  value={formData.theaterID}
                  onChange={(e) =>
                    setFormData({ ...formData, theaterID: e.target.value })
                  }
                >
                  <option value="" style={{ color: "gray" }}>
                    Chọn rạp...
                  </option>
                  {theaters.map((t) => (
                    <option
                      key={t._id}
                      value={t._id}
                      style={{ backgroundColor: "#1e293b" }}
                    >
                      {t.theaterName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label text-white-50 small">
                    Sức chứa (Ghế)
                  </label>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary"
                    required
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
                    }
                  />
                </div>
                <div className="col-6 mb-3">
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
                      value="Active"
                      style={{ backgroundColor: "#1e293b" }}
                    >
                      Hoạt động
                    </option>
                    <option
                      value="Maintenance"
                      style={{ backgroundColor: "#1e293b" }}
                    >
                      Bảo trì
                    </option>
                    <option
                      value="Closed"
                      style={{ backgroundColor: "#1e293b" }}
                    >
                      Đóng cửa
                    </option>
                  </select>
                </div>
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
export default RoomModal;

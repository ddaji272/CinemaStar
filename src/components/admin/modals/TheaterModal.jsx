import React from "react";

const TheaterModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
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
              {isEditing ? "Sửa Thông Tin Rạp" : "Thêm Rạp Mới"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              {/* Theater Name */}
              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Tên Rạp
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  required
                  value={formData.theaterName}
                  onChange={(e) =>
                    setFormData({ ...formData, theaterName: e.target.value })
                  }
                />
              </div>

              {/* Phone & Capacity */}
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label text-white-50 small">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label text-white-50 small">
                    Tổng Sức Chứa
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
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Địa chỉ
                </label>
                <textarea
                  className="form-control bg-dark text-white border-secondary"
                  rows="2"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                ></textarea>
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
                Lưu Thông Tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TheaterModal;

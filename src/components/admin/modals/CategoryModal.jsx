const CategoryModal = ({
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
              {isEditing ? "Sửa Thể Loại" : "Thêm Thể Loại Mới"}
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
                  Tên Thể Loại
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  required
                  value={formData.categoryName}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryName: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white-50 small">Mô tả</label>
                <textarea
                  className="form-control bg-dark text-white border-secondary"
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
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
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;

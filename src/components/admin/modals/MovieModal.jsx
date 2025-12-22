const MovieModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  categories,
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
            <h5 className="modal-title text-warning fw-bold">Thêm Phim Mới</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Tên Phim
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label text-white-50 small">
                    Thời lượng (phút)
                  </label>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary"
                    required
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label text-white-50 small">
                    Ngày phát hành
                  </label>
                  <input
                    type="date"
                    className="form-control bg-dark text-white border-secondary"
                    required
                    value={formData.releaseDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        releaseDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Thể Loại
                </label>
                <select
                  className="form-select bg-dark text-white border-secondary"
                  required
                  value={formData.moviecategoryID}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      moviecategoryID: e.target.value,
                    })
                  }
                >
                  <option value="" style={{ color: "gray" }}>
                    Chọn thể loại...
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                      style={{ backgroundColor: "#1e293b", color: "white" }}
                    >
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Poster URL
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="https://..."
                  value={formData.posterUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, posterUrl: e.target.value })
                  }
                />
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
                Lưu Phim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;

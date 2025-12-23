import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { theaterService } from "../../services/theaterService";
import TheaterModal from "./modals/TheaterModal";

const ManageTheaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 1. Thêm state cho Search
  const [searchTerm, setSearchTerm] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    theaterName: "",
    phoneNumber: "",
    capacity: "",
    address: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Load Data
  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    setLoading(true);
    try {
      const res = await theaterService.getAll();
      setTheaters(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi tải danh sách rạp");
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await theaterService.update(editingId, formData);
        toast.success("Cập nhật thành công!");
      } else {
        await theaterService.create(formData);
        toast.success("Thêm rạp thành công!");
      }
      setShowModal(false);
      resetForm();
      fetchTheaters();
    } catch (err) {
      toast.error("Lỗi khi lưu thông tin!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa rạp này?")) return;
    try {
      await theaterService.delete(id);
      toast.success("Đã xóa rạp");
      fetchTheaters();
    } catch (err) {
      toast.error("Lỗi khi xóa rạp");
    }
  };

  const openEdit = (theater) => {
    setFormData({
      theaterName: theater.theaterName,
      phoneNumber: theater.phoneNumber,
      capacity: theater.capacity,
      address: theater.address,
    });
    setEditingId(theater._id);
    setShowModal(true);
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      theaterName: "",
      phoneNumber: "",
      capacity: "",
      address: "",
    });
    setEditingId(null);
  };

  // 2. Logic lọc rạp theo tên (Search Logic)
  const filteredTheaters = theaters.filter((theater) =>
    theater.theaterName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white fw-bold mb-0">Quản lý Rạp chiếu</h3>
        
        {/* 3. Khu vực Search và Button */}
        <div className="d-flex gap-2">
            <input 
                type="text" 
                className="form-control"
                placeholder="🔍 Tìm kiếm tên rạp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                    width: "300px", 
                    borderRadius: "10px",
                    border: "none"
                }}
            />
            <button
            className="btn btn-warning fw-bold px-4"
            style={{ borderRadius: "10px", whiteSpace: "nowrap" }}
            onClick={openAdd}
            >
            + Thêm Rạp Mới
            </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="card border-0 p-3"
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.7)",
          borderRadius: "15px",
        }}
      >
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead className="text-white-50 small">
              <tr>
                <th>RẠP</th>
                <th>LIÊN HỆ</th>
                <th>ĐỊA CHỈ</th>
                <th>SỨC CHỨA</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Đang tải...
                  </td>
                </tr>
              ) : filteredTheaters.length > 0 ? (
                /* 4. Map dữ liệu đã lọc (filteredTheaters) */
                filteredTheaters.map((theater) => (
                  <tr key={theater._id}>
                    <td className="fw-bold text-warning">
                      {theater.theaterName}
                    </td>
                    <td>{theater.phoneNumber}</td>
                    <td
                      className="text-white-50 small"
                      style={{ maxWidth: "200px" }}
                    >
                      {theater.address}
                    </td>
                    <td>{theater.capacity}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => openEdit(theater)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(theater._id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* 5. Thông báo khi không tìm thấy kết quả */
                <tr>
                  <td colSpan="5" className="text-center text-white-50 py-4">
                    {theaters.length === 0 
                        ? "Chưa có rạp nào" 
                        : `Không tìm thấy rạp nào khớp với "${searchTerm}"`
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <TheaterModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingId}
      />
    </div>
  );
};

export default ManageTheaters;

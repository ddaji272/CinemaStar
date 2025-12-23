import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { categoryService } from "../../services/categoryService";
import CategoryModal from "./modals/CategoryModal";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // 1. Thêm state cho Search
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await categoryService.update(editingId, formData);
      else await categoryService.create(formData);

      toast.success(editingId ? "Cập nhật thành công" : "Thêm mới thành công");
      setShowModal(false);
      setFormData({ categoryName: "", description: "" });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      toast.error("Lỗi khi lưu");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa danh mục này?")) return;
    try {
      await categoryService.delete(id);
      toast.success("Đã xóa");
      fetchCategories();
    } catch (err) {
      toast.error("Lỗi xóa");
    }
  };

  const openEdit = (cat) => {
    setFormData({
      categoryName: cat.categoryName,
      description: cat.description,
    });
    setEditingId(cat._id);
    setShowModal(true);
  };

  const openAdd = () => {
    setFormData({ categoryName: "", description: "" });
    setEditingId(null);
    setShowModal(true);
  };

  // 2. Logic lọc category (Search Logic)
  // Tìm theo Tên hoặc Mô tả
  const filteredCategories = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white fw-bold mb-0">Quản lý Thể loại</h3>
        
        {/* 3. Khu vực Search và Button */}
        <div className="d-flex gap-2">
            <input 
                type="text" 
                className="form-control"
                placeholder="🔍 Tìm kiếm thể loại..."
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
            + Thêm Thể loại
            </button>
        </div>
      </div>

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
                <th>TÊN</th>
                <th>MÔ TẢ</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {/* 4. Render danh sách đã lọc (filteredCategories) */}
              {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat) => (
                    <tr key={cat._id}>
                      <td className="fw-bold text-warning">{cat.categoryName}</td>
                      <td className="text-white-50">{cat.description}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => openEdit(cat)}
                          >
                            Sửa
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(cat._id)}
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
                    <td colSpan="3" className="text-center text-white-50 py-4">
                      {categories.length === 0 
                          ? "Chưa có thể loại nào" 
                          : `Không tìm thấy thể loại nào khớp với "${searchTerm}"`
                      }
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <CategoryModal
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

export default ManageCategories;

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { movieService } from "../../services/movieService";
import { categoryService } from "../../services/categoryService";
import MovieModal from "./modals/MovieModal";

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // 1. State tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // 2. State xác định đang sửa phim nào (nếu null là thêm mới)
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    releaseDate: "",
    posterUrl: "",
    moviecategoryID: "",
  });

  useEffect(() => {
    fetchMovies();
    fetchCategories();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await movieService.getAll();
      setMovies(res.data);
    } catch (err) {
      toast.error("Lỗi tải phim");
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // --- XỬ LÝ FORM (Thêm & Sửa) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // CASE: SỬA (UPDATE)
        // Gọi API PUT (Backend đã viết ở bước trước)
        await movieService.update(editingId, formData);
        toast.success("Cập nhật phim thành công!");
      } else {
        // CASE: THÊM MỚI (CREATE)
        await movieService.create(formData);
        toast.success("Thêm phim thành công!");
      }

      // Reset và đóng modal
      setShowModal(false);
      resetForm();
      fetchMovies();
    } catch (err) {
      toast.error("Lỗi khi lưu phim! (Kiểm tra lại dữ liệu)");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa phim này?")) return;
    try {
      await movieService.delete(id);
      toast.success("Đã xóa phim");
      fetchMovies();
    } catch (err) {
      toast.error("Lỗi xóa phim");
    }
  };

  // --- HÀM MỞ MODAL ---
  
  // 1. Mở để Thêm mới
  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  // 2. Mở để Sửa
  const openEdit = (movie) => {
    setEditingId(movie._id); // Lưu ID đang sửa
    
    // Xử lý ngày tháng: Backend trả về ISO string, Input date cần YYYY-MM-DD
    let formattedDate = "";
    if (movie.releaseDate) {
        formattedDate = new Date(movie.releaseDate).toISOString().split('T')[0];
    }

    setFormData({
      title: movie.title,
      duration: movie.duration,
      releaseDate: formattedDate,
      posterUrl: movie.posterUrl,
      // Lấy ID của category (do Backend populate object nên cần check)
      moviecategoryID: movie.moviecategoryID?._id || movie.moviecategoryID || "",
    });
    
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
        title: "",
        duration: "",
        releaseDate: "",
        posterUrl: "",
        moviecategoryID: "",
    });
  }

  // Logic Search
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white fw-bold mb-0">Quản lý phim</h3>
        
        <div className="d-flex gap-2">
            <input 
                type="text" 
                className="form-control"
                placeholder="🔍 Tìm kiếm tên phim..."
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
            onClick={openAdd} // Gọi hàm openAdd thay vì setShowModal trực tiếp
            >
            + Thêm phim mới
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
                <th>TITLE</th>
                <th>INFO</th>
                <th>THỂ LOẠI</th>
                <th>POSTER</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <tr
                    key={movie._id}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <td className="py-3 fw-bold text-warning">{movie.title}</td>
                    <td>
                      <div className="small text-white-50 mb-1">
                        {movie.duration} min
                      </div>
                      <div className="small text-white-50">
                        {new Date(movie.releaseDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-secondary">
                        {movie.moviecategoryID?.categoryName || "N/A"}
                      </span>
                    </td>
                    <td>
                      {movie.posterUrl && (
                        <img
                          src={movie.posterUrl}
                          alt="poster"
                          style={{
                            width: "40px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                          {/* Nút Sửa (Màu xanh) */}
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => openEdit(movie)}
                          >
                            Sửa
                          </button>
                          
                          {/* Nút Xóa (Màu đỏ) */}
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(movie._id)}
                          >
                            Xóa
                          </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan="5" className="text-center text-white-50 py-4">
                        Không tìm thấy phim nào khớp với từ khóa "{searchTerm}"
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <MovieModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        isEditing={!!editingId} // Truyền prop này nếu Modal cần đổi Title (Thêm vs Cập nhật)
      />
    </div>
  );
};

export default ManageMovies;

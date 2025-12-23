import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { roomService } from "../../services/roomService";
import { theaterService } from "../../services/theaterService";
import RoomModal from "./modals/RoomModal";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // 1. Thêm state cho Search
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    status: "Active",
    theaterID: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [roomRes, theaterRes] = await Promise.all([
        roomService.getAll(),
        theaterService.getAll(),
      ]);
      setRooms(roomRes.data);
      setTheaters(theaterRes.data);
    } catch (err) {
      toast.error("Lỗi tải dữ liệu");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await roomService.update(editingId, formData);
      else await roomService.create(formData);

      toast.success("Thành công!");
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error("Lỗi khi lưu!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa phòng này?")) return;
    try {
      await roomService.delete(id);
      toast.success("Đã xóa!");
      fetchData();
    } catch (err) {
      toast.error("Lỗi xóa!");
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      capacity: "",
      status: "Active",
      theaterID: theaters[0]?._id || "",
    });
    setShowModal(true);
  };

  const openEdit = (room) => {
    setEditingId(room._id);
    setFormData({
      name: room.name,
      capacity: room.capacity,
      status: room.status,
      theaterID: room.theaterID?._id || room.theaterID,
    });
    setShowModal(true);
  };

  // 2. Logic lọc phòng (Search Logic)
  // Cho phép tìm theo cả Tên Phòng hoặc Tên Rạp
  const filteredRooms = rooms.filter((room) => {
    const term = searchTerm.toLowerCase();
    const roomName = room.name.toLowerCase();
    const theaterName = room.theaterID?.theaterName?.toLowerCase() || "";
    
    return roomName.includes(term) || theaterName.includes(term);
  });

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white fw-bold mb-0">Quản lý Phòng Chiếu</h3>
        
        {/* 3. Khu vực Search và Button */}
        <div className="d-flex gap-2">
            <input 
                type="text" 
                className="form-control"
                placeholder="🔍 Tìm tên phòng hoặc rạp..."
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
            + Thêm Phòng
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
        <table className="table table-dark table-hover mb-0 align-middle">
          <thead className="text-white-50 small">
            <tr>
              <th>PHÒNG</th>
              <th>RẠP</th>
              <th>SỨC CHỨA</th>
              <th>TRẠNG THÁI</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {/* 4. Render danh sách đã lọc (filteredRooms) */}
            {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                <tr key={room._id}>
                    <td className="fw-bold text-warning">{room.name}</td>
                    <td>{room.theaterID?.theaterName || "N/A"}</td>
                    <td>{room.capacity} ghế</td>
                    <td>
                    <span
                        className={`badge ${
                        room.status === "Active" ? "bg-success" : "bg-danger"
                        }`}
                    >
                        {room.status}
                    </span>
                    </td>
                    <td>
                    <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => openEdit(room)}
                    >
                        Sửa
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(room._id)}
                    >
                        Xóa
                    </button>
                    </td>
                </tr>
                ))
            ) : (
                /* 5. Thông báo khi không tìm thấy kết quả */
                <tr>
                  <td colSpan="5" className="text-center text-white-50 py-4">
                    {rooms.length === 0 
                        ? "Chưa có phòng nào" 
                        : `Không tìm thấy phòng nào khớp với "${searchTerm}"`
                    }
                  </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      <RoomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        theaters={theaters}
        isEditing={!!editingId}
      />
    </div>
  );
};
export default ManageRooms;

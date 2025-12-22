// src/pages/BookingFlow.jsx
import React, { useState } from "react";
import { MOVIES, TOTAL_SEATS } from "../data/movieData";

// --- SỬA 1: IMPORT TOAST ĐỂ HIỆN THÔNG BÁO ---
import { toast } from "react-toastify";

// Import các component con
import TheaterSelection from "../components/Booking/TheaterSelection";
import SeatSelection from "../components/Booking/SeatSelection";
import PaymentInfo from "../components/Booking/PaymentInfo";
import FormatSelection from "../components/Booking/FormatSelection";

// --- SỬA 2: NHẬN PROPS currentUser VÀ onSwitchTab ---
const BookingFlow = ({ currentUser, onSwitchTab }) => {
  // --- STATE QUẢN LÝ LUỒNG ĐẶT VÉ ---
  // 0: Home -> 1: Format -> 2: Rạp -> 3: Ghế -> 4: Thanh toán
  const [step, setStep] = useState(0);

  const [bookingData, setBookingData] = useState({
    movie: null,
    format: null,
    theater: null,
    showtime: null,
    seats: [],
  });
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  // --- STATE QUẢN LÝ UI (MODAL, SEARCH) ---
  const [searchTerm, setSearchTerm] = useState("");
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const [viewingDetails, setViewingDetails] = useState(null);

  // --- LOGIC ĐẶT VÉ (BOOKING ACTIONS) ---

  // B1: Từ Home -> Chọn Phim xong -> Sang bước 1 (Chọn Định dạng)
  const handleStartBooking = (movie) => {
    // --- SỬA 3: KIỂM TRA ĐĂNG NHẬP Ở ĐÂY ---
    // Nếu chưa có user thì chặn lại, báo lỗi và chuyển sang tab Member
    if (!currentUser) {
      toast.warn("⚠️ Bạn vui lòng đăng nhập để tiếp tục mua vé!");
      onSwitchTab("member"); // Chuyển sang tab Đăng nhập
      setViewingDetails(null); // Tắt modal chi tiết nếu đang mở
      return; // Dừng lại, không chạy tiếp code bên dưới
    }
    // ----------------------------------------

    setBookingData({
      movie,
      format: null,
      theater: null,
      showtime: null,
      seats: [],
    });
    setViewingDetails(null);
    setStep(1);
  };

  // B2: Chọn Format xong -> Sang bước 2 (Chọn Rạp)
  const handleSelectFormat = (format) => {
    setBookingData((prev) => ({ ...prev, format }));
    setStep(2);
  };

  // B3: Chọn Rạp & Suất xong -> Sang bước 3 (Chọn Ghế)
  const handleSelectSession = (theater, showtime) => {
    setBookingData((prev) => ({ ...prev, theater, showtime }));
    setOccupiedSeats(TOTAL_SEATS.filter(() => Math.random() < 0.25)); // Random ghế ảo
    setStep(3);
  };

  // Logic chọn ghế
  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    setBookingData((prev) => {
      const isSelected = prev.seats.includes(seatId);
      const newSeats = isSelected
        ? prev.seats.filter((id) => id !== seatId)
        : [...prev.seats, seatId];
      return { ...prev, seats: newSeats };
    });
  };

  // B4: Thanh toán thành công -> Về lại trang chủ
  const handlePaymentSuccess = () => {
    // Thay alert bằng toast cho đẹp luôn
    toast.success(`🎉 Đặt vé thành công! Phim: ${bookingData.movie.title}`);
    setBookingData({ movie: null, theater: null, showtime: null, seats: [] });
    setStep(0);
  };

  // --- RENDER MODAL (GIỮ NGUYÊN) ---
  const renderTrailerModal = () => {
    if (!playingTrailer) return null;
    return (
      <div className="modal-backdrop" onClick={() => setPlayingTrailer(null)}>
        <div
          className="modal-content"
          style={{
            background: "transparent",
            boxShadow: "none",
            maxWidth: "900px",
          }}
        >
          <button
            className="btn-close-modal"
            style={{ color: "white", top: "-30px", right: 0 }}
            onClick={() => setPlayingTrailer(null)}
          >
            ×
          </button>
          <div className="trailer-container">
            <iframe
              src={`${playingTrailer}?autoplay=1`}
              title="Trailer"
              allowFullScreen
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderDetailsModal = () => {
    if (!viewingDetails) return null;
    return (
      <div className="modal-backdrop" onClick={() => setViewingDetails(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn-close-modal"
            onClick={() => setViewingDetails(null)}
          >
            ×
          </button>
          <div className="details-flex">
            <img
              src={viewingDetails.image}
              alt={viewingDetails.title}
              className="details-poster"
            />
            <div className="details-info">
              <h2>{viewingDetails.title}</h2>
              <p style={{ color: "#a0aec0", fontSize: "1.1rem" }}>
                Thời lượng: {viewingDetails.duration}{" "}
                <span style={{ margin: "0 10px" }}>|</span>
                Giá vé:{" "}
                <span style={{ color: "#fbbf24", fontWeight: "bold" }}>
                  {viewingDetails.price.toLocaleString()} đ
                </span>
              </p>
              <div className="details-desc">
                <h4 style={{ margin: "0 0 10px 0", color: "white" }}>
                  Nội dung phim:
                </h4>
                {viewingDetails.desc}
              </div>
              <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
                <button
                  className="btn-checkout"
                  onClick={() => handleStartBooking(viewingDetails)}
                >
                  ĐẶT VÉ NGAY
                </button>
                <button
                  className="btn-back"
                  style={{ marginBottom: 0 }}
                  onClick={() => {
                    setPlayingTrailer(viewingDetails.trailer);
                    setViewingDetails(null);
                  }}
                >
                  XEM TRAILER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- MAIN RENDER (ĐÃ SỬA LẠI ĐÚNG THỨ TỰ) ---

  // STEP 1: CHỌN ĐỊNH DẠNG (MỚI THÊM)
  if (step === 1) {
    return (
      <FormatSelection
        movie={bookingData.movie}
        onBack={() => setStep(0)}
        onSelectFormat={handleSelectFormat}
      />
    );
  }

  // STEP 2: CHỌN RẠP (Cập nhật props nhận format)
  if (step === 2) {
    return (
      <TheaterSelection
        movie={bookingData.movie}
        selectedFormat={bookingData.format} // <-- Quan trọng: Truyền format đã chọn
        onBack={() => setStep(1)} // Quay lại chọn Format
        onSelectSession={handleSelectSession}
      />
    );
  }

  // STEP 3: CHỌN GHẾ
  if (step === 3) {
    return (
      <SeatSelection
        movie={bookingData.movie}
        theater={bookingData.theater}
        showtime={bookingData.showtime}
        selectedSeats={bookingData.seats}
        occupiedSeats={occupiedSeats}
        onSeatClick={handleSeatClick}
        onBack={() => setStep(2)} // Quay lại chọn Rạp
        onNext={() => setStep(4)} // Sang thanh toán
      />
    );
  }

  // STEP 4: THANH TOÁN
  if (step === 4) {
    return (
      <PaymentInfo
        bookingData={bookingData}
        onBack={() => setStep(3)} // Quay lại chọn ghế
        onConfirm={handlePaymentSuccess}
      />
    );
  }

  // STEP 0: TRANG CHỦ
  const filteredMovies = MOVIES.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm tên phim..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredMovies.length > 0 ? (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="poster-wrapper">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="movie-poster"
                  onClick={() => setPlayingTrailer(movie.trailer)}
                  style={{ cursor: "pointer" }}
                />
                <div className="overlay">
                  <button
                    className="btn-overlay btn-details"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingDetails(movie);
                    }}
                  >
                    CHI TIẾT
                  </button>
                  <button
                    className="btn-overlay btn-buy"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartBooking(movie);
                    }}
                  >
                    MUA VÉ
                  </button>
                </div>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                    color: "#a0aec0",
                  }}
                >
                  <span>{movie.duration}</span>
                  <span style={{ color: "#fbbf24", fontWeight: "bold" }}>
                    {movie.price.toLocaleString()} đ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{ textAlign: "center", color: "#a0aec0", marginTop: "50px" }}
        >
          <p style={{ fontSize: "4rem", margin: "0" }}>🎬</p>
          <p>Không tìm thấy phim nào.</p>
        </div>
      )}

      {renderTrailerModal()}
      {renderDetailsModal()}
    </>
  );
};

export default BookingFlow;

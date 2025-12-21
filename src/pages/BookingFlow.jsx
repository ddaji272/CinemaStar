// src/pages/BookingFlow.jsx
import { useState } from "react";
import { MOVIES, THEATERS, TOTAL_SEATS } from "../data/movieData";

const BookingFlow = () => {
  // State luồng đặt vé
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // State Modal
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const [viewingDetails, setViewingDetails] = useState(null);

  // --- LOGIC ---

  const handleBookingStart = (movie) => {
    setSelectedMovie(movie);
    setSelectedTheater(null);
    setSelectedSeats([]);
    setOccupiedSeats([]);
    setViewingDetails(null);
  };

  const handleSelectTheater = (theater) => {
    setSelectedTheater(theater);
    setOccupiedSeats(TOTAL_SEATS.filter(() => Math.random() < 0.25));
  };

  const handleBack = () => {
    if (selectedSeats.length > 0) setSelectedSeats([]);
    else if (selectedTheater) setSelectedTheater(null);
    else if (selectedMovie) setSelectedMovie(null);
  };

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalPrice = selectedMovie
    ? selectedSeats.length * selectedMovie.price
    : 0;

  // --- RENDERING SUB-COMPONENTS (MODALS) ---

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
                  onClick={() => handleBookingStart(viewingDetails)}
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

  // --- MAIN RENDER LOGIC ---

  // 1. MÀN HÌNH CHỌN RẠP
  if (selectedMovie && !selectedTheater) {
    return (
      <div className="booking-section" style={{ textAlign: "left" }}>
        <button className="btn-back" onClick={handleBack}>
          ← Quay lại chọn phim
        </button>
        <h2
          style={{
            color: "#fbbf24",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Chọn rạp để xem: {selectedMovie.title}
        </h2>
        <div className="theater-grid">
          {THEATERS.map((t, i) => (
            <div
              key={i}
              className="theater-card"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectTheater(t)}
            >
              <h3 style={{ marginBottom: "5px" }}>{t.name}</h3>
              <p style={{ color: "#a0aec0", fontSize: "0.9rem" }}>
                {t.address}
              </p>
              <div
                style={{
                  marginTop: "15px",
                  color: "#fbbf24",
                  fontSize: "0.9rem",
                }}
              >
                ● Nhấn để chọn rạp này
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. MÀN HÌNH CHỌN GHẾ
  if (selectedMovie && selectedTheater) {
    return (
      <div className="booking-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            className="btn-back"
            style={{ marginBottom: 0 }}
            onClick={handleBack}
          >
            ← Đổi rạp
          </button>
          <div style={{ textAlign: "right" }}>
            <h3 style={{ margin: 0, color: "#fbbf24" }}>
              {selectedMovie.title}
            </h3>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#a0aec0" }}>
              Tại: {selectedTheater.name}
            </p>
          </div>
        </div>
        <div className="screen">MÀN HÌNH</div>
        <div className="seats-grid">
          {TOTAL_SEATS.map((seatId) => (
            <div
              key={seatId}
              className={`seat ${
                occupiedSeats.includes(seatId) ? "occupied" : ""
              } ${selectedSeats.includes(seatId) ? "selected" : ""}`}
              onClick={() => handleSeatClick(seatId)}
            />
          ))}
        </div>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#374151" }}></div>
            Trống
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#fbbf24" }}></div>
            Đang chọn
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: "#e50914" }}></div>
            Đã bán
          </div>
        </div>
        <div className="summary">
          <div>
            <div style={{ color: "#a0aec0" }}>
              Ghế:{" "}
              {selectedSeats.length > 0
                ? selectedSeats.map((s) => s + 1).join(", ")
                : "..."}
            </div>
            <div className="total-price">{totalPrice.toLocaleString()} đ</div>
          </div>
          <button
            className="btn-checkout"
            disabled={selectedSeats.length === 0}
            onClick={() =>
              alert(
                `Thanh toán thành công!\nPhim: ${selectedMovie.title}\nRạp: ${
                  selectedTheater.name
                }\nTổng tiền: ${totalPrice.toLocaleString()}đ`
              )
            }
          >
            THANH TOÁN
          </button>
        </div>
      </div>
    );
  }

  // 3. MÀN HÌNH DANH SÁCH PHIM (Mặc định)
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
                      handleBookingStart(movie);
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

      {/* Gọi Modal ở đây */}
      {renderTrailerModal()}
      {renderDetailsModal()}
    </>
  );
};

export default BookingFlow;

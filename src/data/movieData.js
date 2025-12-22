// src/data/movieData.js
// Lưu ý đường dẫn ảnh ../assets/ vì file này nằm trong thư mục data

import imgBoTu from '../assets/botubaothu.jpg';
import imgYeuNham from '../assets/yeunhambanthan.jpg';
import imgNuHon from '../assets/nuhonbacty.jpg';
import imgMuaBuom from '../assets/muatrencanhbuom.jpg';
import imgDenAmHon from '../assets/denamhon.jpg';
import imgNhaGiaTien from '../assets/nhagiatien.jpg';
import imgQuyNhapTrang from '../assets/quynhaptrang.jpg';
import imgAmDuongLo from '../assets/amduonglo.jpg';
import imgDiaDao from '../assets/diadao.jpg';
import imgThamTuKien from '../assets/thamtukien.jpg';
import imgLatMat from '../assets/latmat.jpg';
import imgMuaDo from '../assets/muado.jpg';
import imgMangMeDiBo from '../assets/mangmedibo.jpg';
import imgChotDon from '../assets/chotdon.jpg';
import imgTuChien from '../assets/tuchientrenkhong.jpg';
import imgQuanKyNam from '../assets/quankynam.jpg';
import imgNhiemVu from '../assets/nhiemvubatkhathi.jpg';
import imgKhungLong from '../assets/thegioikhunglong.jpg';

const btbt_TRAILER = "https://www.youtube.com/embed/njfAWzmF6oY?si=7ZiN-kXXYywmPpCc"; 
const ynbt_TRAILER = "https://www.youtube.com/embed/XcRgMTmmXaI?si=Pu1UsR-e-fvWNzfS";
const nhbt_TRAILER = "https://www.youtube.com/embed/wr6MeifZCUs?si=vP7gMoVGSqmEv-5E";
const mtcb_TRAILER = "https://www.youtube.com/embed/EXhamQsxNqU?si=nlp_9ZmXfsI3vKEe";
const dah_TRAILER = "https://www.youtube.com/embed/E7exHaPHDeM?si=SXx6Gk-4u17ZXNHg";
const ngt_TRAILER = "https://www.youtube.com/embed/hXGozmNBwt4?si=37IsQ057FVQtQezN";
const qnt_TRAILER = "https://www.youtube.com/embed/XsPl7SbL2kg?si=sk18IETyCbUjfG9S";
const adl_TRAILER = "https://www.youtube.com/embed/Hy9-IIroldw?si=1JvnOF9NJzqzXnyk";
const dd_TRAILER = "https://www.youtube.com/embed/xh6IDHjvytU?si=pB5TzTEX1lipfJ2B";
const ttk_TRAILER = "https://www.youtube.com/embed/QiXNbEKF3U0?si=bE_PdSMRkPKKVNhj";
const lm_TRAILER = "https://www.youtube.com/embed/hUlBTt3NyGI?si=374lE9skw2diEk-y";
const md_TRAILER = "https://www.youtube.com/embed/BD6PoZJdt_M?si=XFnFR3bbRtt6EA8_";
const mmdb_TRAILER = "https://www.youtube.com/embed/yF2pXRJictA?si=cRBXQzp61UiV7U-H";
const cd_TRAILER = "https://www.youtube.com/embed/FWOuq8Blpcc?si=lAN4MdG1-lxmkWed";
const tctk_TRAILER = "https://www.youtube.com/embed/Q-Zf8KhyS6E?si=jEYMMT8PeLbfxqsd";
const qkn_TRAILER = "https://www.youtube.com/embed/6bW9byYRhz8?si=6DlmAYmCQPGBsl2F";
const nvbkt_TRAILER = "https://www.youtube.com/embed/no2HdwAX8jI?si=IGR0E-JpJxH44cQD";
const tgkl_TRAILER = "https://www.youtube.com/embed/F175sCpwXbo?si=qv9Q-KirMufFoK4W";

export const MOVIES = [
  { id: 1, title: "Bộ Tứ Báo Thủ", image: imgBoTu, price: 90000, duration: "2h 12m", trailer: btbt_TRAILER, desc: "Bộ tứ báo thủ bao gồm Chét-Xi-Cà, Dì Bốn, Cậu Mười Một, Con Kiều chính thức xuất hiện cùng với phi vụ báo thế kỉ." },
  { id: 2, title: "Yêu Nhầm Bạn Thân", image: imgYeuNham, price: 95000, duration: "1h 46m", trailer: ynbt_TRAILER, desc: "Yêu Nhầm Bạn Thân kể câu chuyện tình yêu lãng mạn giữa khung cảnh tuyệt đẹp của Việt Nam." },
  { id: 3, title: "Nụ Hôn Bạc Tỷ", image: imgNuHon, price: 100000, duration: "1h 40m", trailer: nhbt_TRAILER, desc: "Câu chuyện xoay quanh Vân - cô gái bán bánh mì vô tình gặp phải hai chàng trai." },
  { id: 4, title: "Mưa Trên Cánh Bướm", image: imgMuaBuom, price: 90000, duration: "1h 35m", trailer: mtcb_TRAILER, desc: "MƯA TRÊN CÁNH BƯỚM xoay quanh câu chuyện của bà Tâm." },
  { id: 5, title: "Đèn Âm Hồn", image: imgDenAmHon, price: 95000, duration: "1h 40m", trailer: dah_TRAILER, desc: "Lấy cảm các từ Chuyện Người Con Gái Nam Xương..." },
  { id: 6, title: "Nhà Gia Tiên", image: imgNhaGiaTien, price: 90000, duration: "1h 57m", trailer: ngt_TRAILER, desc: "Nhà Gia Tiên xoay quanh câu chuyện đa góc nhìn về các thế hệ khác nhau..." },
  { id: 7, title: "Quỷ Nhập Tràng", image: imgQuyNhapTrang, price: 95000, duration: "2h 02m", trailer: qnt_TRAILER, desc: "Phim lấy cảm hứng từ câu chuyện có thật..." },
  { id: 8, title: "Âm Dương Lộ", image: imgAmDuongLo, price: 90000, duration: "1h 59m", trailer: adl_TRAILER, desc: "Vì mưu sinh, một cử nhân thất nghiệp lén cha chở một thi thể nữ..." },
  { id: 9, title: "Địa Đạo: Mặt Trời Trong Bóng Tối", image: imgDiaDao, price: 110000, duration: "2h 08m", trailer: dd_TRAILER, desc: "Nhân dịp kỷ niệm 50 năm đất nước hoà bình..." },
  { id: 10, title: "Thám Tử Kiên: Kỳ Án Không Đầu", image: imgThamTuKien, price: 95000, duration: "2h 11m", trailer: ttk_TRAILER, desc: "Thám Tử Kiên là một nhân vật được yêu thích trong tác phẩm điện ảnh..." },
  { id: 11, title: "Lật Mặt 8: Vòng Tay Nắng", image: imgLatMat, price: 100000, duration: "2h 15m", trailer: lm_TRAILER, desc: "Một bộ phim về sự khác biệt quan điểm giữa ba thế hệ..." },
  { id: 12, title: "Mưa Đỏ", image: imgMuaDo, price: 90000, duration: "2h 04m", trailer: md_TRAILER, desc: "“Mưa Đỏ” - Phim truyện điện ảnh về đề tài chiến tranh cách mạng..." },
  { id: 13, title: "Mang Mẹ Đi Bỏ", image: imgMangMeDiBo, price: 90000, duration: "1h 52m", trailer: mmdb_TRAILER, desc: "Mang Mẹ Đi Bỏ kể về số phận của Hoan..." },
  { id: 14, title: "Chốt Đơn", image: imgChotDon, price: 95000, duration: "1h 52m", trailer: cd_TRAILER, desc: "Ông An là một người giao hàng đang tìm kiểm cha mẹ..." },
  { id: 15, title: "Tử Chiến Trên Không", image: imgTuChien, price: 105000, duration: "1h 58m", trailer: tctk_TRAILER, desc: "Tử Chiến Trên Không là phim điện ảnh hành động..." },
  { id: 16, title: "Quán Kỳ Nam", image: imgQuanKyNam, price: 90000, duration: "2h 15m", trailer: qkn_TRAILER, desc: "Với sự nâng đỡ của người chú quyền lực, Khang được giao cho công việc..." },
  { id: 17, title: "NV Bất Khả Thi: Nghiệp Báo Cuối Cùng", image: imgNhiemVu, price: 120000, duration: "2h 49m", trailer: nvbkt_TRAILER, desc: "Cuộc đời là tất thảy những lựa chọn. Tom Cruise thủ vai Ethan Hunt trở lại..." },
  { id: 18, title: "Thế Giới Khủng Long: Tái Sinh", image: imgKhungLong, price: 110000, duration: "2h 14m", trailer: tgkl_TRAILER, desc: "Thế Giới Khủng Long: Tái Sinh lấy bối cảnh 5 năm sau..." },
];

export const THEATERS = [
  { 
    id: 't1', 
    name: "Cinema Star Royal City", 
    address: "72A Nguyễn Trãi, Thanh Xuân, Hà Nội", 
    showtimes: {
      "2D Phụ đề Việt": ["09:00", "12:00", "15:00", "20:00"],
      "IMAX 3D Phụ đề Việt": ["19:30", "22:00"],
      "4DX 3D Phụ đề Việt": ["10:00", "14:00"]
    }
  },
  { 
    id: 't2', 
    name: "Cinema Star Landmark 81", 
    address: "208 Nguyễn Hữu Cảnh, Bình Thạnh, TP.HCM", 
    showtimes: {
      "2D Phụ đề Việt": ["09:30", "11:30", "16:00"],
      "ScreenX 3D Phụ đề Việt": ["18:00", "21:00"],
      "Ultra 4DX SCX 3D Phụ đề Việt": ["20:15"] 
    }
  },
  { 
    id: 't3', 
    name: "Cinema Star Đà Nẵng", 
    address: "910A Ngô Quyền, Sơn Trà, Đà Nẵng", 
    showtimes: {
      "2D Phụ đề Việt": ["08:00", "10:00", "19:00"],
      "3D Phụ đề Việt": ["15:00", "21:00"]
    }
  },
  { 
    id: 't4', 
    name: "Cinema Star Cần Thơ", 
    address: "Số 1 Đại lộ Hòa Bình, Ninh Kiều, Cần Thơ", 
    showtimes: {
      "2D Phụ đề Việt": ["09:00", "14:00", "20:00"]
    }
  },
];

export const TOTAL_SEATS = Array.from({ length: 64 }, (_, i) => i);

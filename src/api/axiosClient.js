import axios from "axios";

const axiosClient = axios.create({
  // Ensure you add http://
  baseURL: "https://cinestarbackend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;

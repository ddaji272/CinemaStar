import axiosClient from "../api/axiosClient";

export const showtimeService = {
  getAll: () => axiosClient.get("/showtimes"),
  create: (data) => axiosClient.post("/showtimes", data),
  update: (id, data) => axiosClient.put(`/showtimes/${id}`, data),
  delete: (id) => axiosClient.delete(`/showtimes/${id}`),
};

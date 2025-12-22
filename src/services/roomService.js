import axiosClient from "../api/axiosClient";

export const roomService = {
  getAll: () => axiosClient.get("/rooms"),
  create: (data) => axiosClient.post("/rooms", data),
  update: (id, data) => axiosClient.put(`/rooms/${id}`, data),
  delete: (id) => axiosClient.delete(`/rooms/${id}`),
};

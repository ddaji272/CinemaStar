import axiosClient from "../api/axiosClient";

export const theaterService = {
  getAll: () => {
    return axiosClient.get("/theaters");
  },

  create: (data) => {
    return axiosClient.post("/theaters", data);
  },

  update: (id, data) => {
    return axiosClient.put(`/theaters/${id}`, data);
  },

  delete: (id) => {
    return axiosClient.delete(`/theaters/${id}`);
  },
};

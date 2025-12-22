import axiosClient from "../api/axiosClient";

export const movieService = {
  getAll: () => {
    return axiosClient.get("/movies");
  },

  create: (data) => {
    // If sending images, we need to change Content-Type to multipart/form-data
    // This is handled automatically if 'data' is a FormData object
    return axiosClient.post("/movies", data);
  },

  update: (id, data) => {
    return axiosClient.put(`/movies/${id}`, data);
  },

  delete: (id) => {
    return axiosClient.delete(`/movies/${id}`);
  },
};

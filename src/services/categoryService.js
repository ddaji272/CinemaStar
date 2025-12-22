import axiosClient from "../api/axiosClient";

export const categoryService = {
  // Get all categories
  getAll: () => {
    return axiosClient.get("/categories");
  },

  // Create a new category
  create: (data) => {
    return axiosClient.post("/categories", data);
  },

  // Update a category
  update: (id, data) => {
    return axiosClient.put(`/categories/${id}`, data);
  },

  // Delete a category
  delete: (id) => {
    return axiosClient.delete(`/categories/${id}`);
  },
};

import axiosClient from "../api/axiosClient";

export const userService = {
  getAll: () => {
    return axiosClient.get("/auth/users");
    // Make sure your backend route is actually /api/users
    // If your route is /api/auth/users, change this string accordingly.
  },

  blockUser: (id) => {
    // Example: PUT /api/users/:id/block
    return axiosClient.put(`/auth/users/${id}/block`);
  },
};

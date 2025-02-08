import apiClient from "./api/apiClient";

const userService = {
  authenticate: async (credentials) => {
    return await apiClient.post("/users/authenticate", credentials);
  },
};

export default userService;

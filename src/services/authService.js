import apiClient from "../api/apiClient";
import tokenService from "./tokenService";

const authService = {
  login: async (credentials) => {
    const response = await apiClient.post("/users/authenticate", credentials);
    tokenService.setToken(response.token);
    return response;
  },

  logout: () => {
    tokenService.removeToken();
  },
};

export default authService;

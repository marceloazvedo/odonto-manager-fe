import axios from "axios";
import { navigateToLogin } from "../navigationService";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 3600,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor: Handle 401 (Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url
    if (error.response?.status === 401 && requestUrl !== "/users/authenticate") {
      toast.warning("Sessão expirada. Realize o login novamente."); // Show toast message
      navigateToLogin(); // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

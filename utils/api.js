import axios from "axios";
import store from "@/redux/store";
import { logout, updateAccessToken } from "@/redux/features/authSlice";
import { API_URL } from "@/app/apiconfig";

// Axios instance yarat
const api = axios.create({
  baseURL: `${API_URL}/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Her request-ə token əlavə et
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Cavab interceptor (error handling)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Loop-un qarşısını alır

      const state = store.getState();
      const refreshToken = state.auth.refreshToken;

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${API_URL}/auth/refreshToken`,
            { token: refreshToken },
            { withCredentials: true }
          );

          const newAccessToken = response.data.accessToken;

          // Redux store-da güncəllə
          store.dispatch(updateAccessToken(newAccessToken));

          // Yeni token ilə orijinal request-i təkrar göndər
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh token də expired olubsa logout
          store.dispatch(logout());
          window.location.href = "/";
          return Promise.reject(refreshError);
        }
      }
    }

    // 403 Forbidden
    if (error.response && error.response.status === 403) {
      store.dispatch(logout());
      window.location.href = "/";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;

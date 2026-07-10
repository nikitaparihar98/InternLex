import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Request Interceptor: Attach token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("API Request Error:", {
      message: error.message,
      stack: error.stack,
    });
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors and log detailed diagnostics
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const diagnostics = {
      message: error.message,
      url: error.config?.url ? `${error.config.baseURL || ""}${error.config.url}` : null,
      method: error.config?.method?.toUpperCase(),
      headers: error.config?.headers,
      payload: error.config?.data,
    };

    if (error.response) {
      diagnostics.status = error.response.status;
      diagnostics.responseData = error.response.data;
      console.error("API Response Error:", diagnostics);

      if (error.response.status === 401) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
          // Redirect to correct admin route
          window.location.href = "/admin";
        }
      }
    } else if (error.request) {
      diagnostics.request = "No response received. This typically points to a CORS block, a DNS failure (e.g. host not found), or a blocked request (e.g. by privacy shields or ad-blockers).";
      console.error("API Network Error (No Response):", diagnostics);
    } else {
      console.error("API General Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

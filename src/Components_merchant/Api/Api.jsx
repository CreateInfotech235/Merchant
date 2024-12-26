import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8001",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

// Add a response interceptor using a fat arrow function
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      localStorage.removeItem("accessToken");
      console.error("Unauthorized, logging out...");
      window.location.href = "/merchant/login";
    }
    return error;
  }
);

export default API;

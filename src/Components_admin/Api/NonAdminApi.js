import axios from "axios";

const API = axios.create({
  baseURL: "https://create-4.onrender.com",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessTokenForAdmin");
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
      console.error("Unauthorized, logging out...");
      // Perform any logout actions or redirect to login page
    }
    return error;
  }
);

export default API;

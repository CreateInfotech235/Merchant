import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { getSupportTicket } from "./SupportTicket"

const API = axios.create({
  baseURL: "http://localhost:8001/",
  headers: { "Content-Type": "application/json" },
});

// Initialize socket connection
export const socket = io("http://localhost:8001/", {
  transports: ["websocket"],
  autoConnect: true, // Changed to false to prevent auto-connection
  auth: {
    token: localStorage.getItem("accessToken")
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000
});

// Socket event listeners
socket.on("connect", async () => {
  console.log("Socket connected successfully");

  const userId = localStorage.getItem("merchnatId");
  if (userId) {
    socket.emit("userdata", { userId });
    // Fetch and log the list of support tickets
    const response = await getSupportTicket();
    console.log("responsesdsf", response);
    if (response.data.message == "Support ticket get successfully") {
      if (response.data.data != null && response.data.data.length > 0) {
        response.data.data.forEach(element => {
          socket.emit("SupportTicketconnect", { conectid: element._id });
        });
      }
    }
  }
});

socket.on("welcome", (data) => {
  console.log("Welcome message received:", data.message);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

// socket.on("notification", (data) => {
//   toast.info(data.message);
//   console.log("New notification received:", data);
// });

socket.on("error", (error) => {
  console.error("Socket error:", error);
  toast.error("Connection error occurred");
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
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

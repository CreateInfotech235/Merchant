import axios from "axios";
import { io } from "socket.io-client";
import { getSupportTicket } from "./SupportTicket";
// Initialize socket connection
export const socket = io("https://create-courier-8.onrender.com/", {
  transports: ["websocket"],
  autoConnect: true, // Changed to false to prevent auto-connection
  auth: {
    token: localStorage.getItem("accessTokenForAdmin"),
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});
const API = axios.create({
  baseURL: "https://create-courier-8.onrender.com/admin",
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
console.log("stfjuui");

socket.on("connect", async () => {
  console.log("Admin Socket connected successfully");
  const accessTokenForAdmin = localStorage.getItem("accessTokenForAdmin");
  const refreshTokenForAdmin = localStorage.getItem("refreshTokenForAdmin");
  if (accessTokenForAdmin && refreshTokenForAdmin) {
    const listOfSupportTicket = await getSupportTicket();
    console.log("listOfSupportTicket", listOfSupportTicket.data);
    if (listOfSupportTicket.data.message == "Support ticket get successfully") {
      if (
        listOfSupportTicket.data.data != null &&
        listOfSupportTicket.data.data.length > 0
      ) {
        listOfSupportTicket.data.data.forEach((element) => {
          socket.emit("SupportTicketconnect", { conectid: element._id });
        });
      }
    }
  }
});

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

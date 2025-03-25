import { io } from "socket.io-client";

export const socket = io("https://create-courier-8.onrender.com/admin", {
  transports: ["websocket"],
  autoConnect: false,
  auth: {
    token: localStorage.getItem("accessTokenForAdmin"),
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const joinAllTicket = () => {
  socket.emit("joinAllTicket", {
    token: localStorage.getItem("accessTokenForAdmin"),
  });
};

export const sendMessageAdminToUser = (ticketId, message) => {
  socket.emit("sendMessageAdminToUser", {
    token: localStorage.getItem("accessTokenForAdmin"),
    ticketId: ticketId,
    message: message,
  });
};

socket.on("connect", () => {
  const userId = localStorage.getItem("merchnatId");
  if (userId) {
    socket.emit("userdata", { userId });
  }
});

socket.on("welcome", (data) => {
  console.log("Welcome message received:", data.message);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});

import axios from "axios";

const API = axios.create({
  baseURL: "https://create-4.onrender.com",
  headers: { "Content-Type": "application/json" },
});

export default API;
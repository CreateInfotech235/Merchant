import axios from "axios";

const API = axios.create({
  baseURL: "https://create-courier-8.onrender.com",
  headers: { "Content-Type": "application/json" },
});

export default API;

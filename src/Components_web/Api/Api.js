import axios from "axios";

const API = axios.create({
  baseURL: "https://create-1-opqy.onrender.com",
  headers: { "Content-Type": "application/json" },
});

export default API;

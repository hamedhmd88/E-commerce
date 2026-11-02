import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com",
  timeout: 10000,
});

export default api;

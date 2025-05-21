import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
  // baseURL: "http://clpit.duckdns.org:64660/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

export default instance;

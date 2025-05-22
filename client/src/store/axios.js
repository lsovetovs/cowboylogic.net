import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api", 
  baseURL: "http://clpit.duckdns.org:64660/api",
  withCredentials: false,
});

export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // або твій продакшн бекенд
  withCredentials: false,
});

export default instance;

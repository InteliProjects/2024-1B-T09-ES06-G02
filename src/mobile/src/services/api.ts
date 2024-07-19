import axios from "axios";

const api = axios.create({
  baseURL: "http://54.210.72.233:8000/",
});

export default api;

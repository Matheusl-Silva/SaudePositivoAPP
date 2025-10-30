import axios from "axios";

const API_URL = "http://10.73.63.7:3000";

const api = axios.create({
  baseURL: API_URL,
});

export default api;

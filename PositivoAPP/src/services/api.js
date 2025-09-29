import axios from "axios";

const API_URL = "http://10.200.64.7:3000";

const api = axios.create({
  baseURL: API_URL,
});

export default api;

import axios from "axios";
// alterar conforme for seu ip
const API_URL = "http://192.168.1.15:3000";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
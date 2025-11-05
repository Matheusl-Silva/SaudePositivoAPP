import axios from "axios";
// alterar conforme for seu ip
const API_URL = "http://10.136.132.230:3000";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
import axios from "axios";

const api = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_WIFI_IP}:3000`,
});

export default api;

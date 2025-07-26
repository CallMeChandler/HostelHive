import axios from "axios";

const API = axios.create({ baseURL: `${import.meta.env.VITE_API_BASE_URL}/circulars` });

export const fetchNotifications = (token) =>
  API.get("/", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const postNotification = (data, token) =>
  API.post("/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

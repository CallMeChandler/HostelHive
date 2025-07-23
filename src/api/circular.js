import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/circulars" });

export const fetchNotifications = (token) =>
  API.get("/", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const postNotification = (data, token) =>
  API.post("/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

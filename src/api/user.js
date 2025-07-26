import axios from "axios";

const API = axios.create({ baseURL: `${import.meta.env.VITE_API_BASE_URL}/users` });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const updateProfile = (data) => API.patch("/profile", data);

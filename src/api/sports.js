import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/sports`,
});

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});


export const fetchSportsStock = () => API.get("/stock");


export const submitSportsRequest = (item) =>
  API.post("/request", { item });


export const fetchAllSportsRequests = () => API.get("/requests");

export const updateRequestStatus = (id, status) =>
  API.put(`/request/${id}`, { status });

import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/complaints`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const submitComplaint = (data) => {
  const { title, description, category, room } = data;

  return API.post("/", {
    title,
    description,
    type: category,
    room,
  });
};

export const getMyComplaints = () => API.get("/my");
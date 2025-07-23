import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/complaints",
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
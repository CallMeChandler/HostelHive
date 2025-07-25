import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/messmenu",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const updateMessMenu = (day, meals, hostel) =>
  API.put(`/edit`, { day, meals, hostel });

export const fetchMessMenu = () =>
    API.get("/");

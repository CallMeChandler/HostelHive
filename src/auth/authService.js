/*  ── src/auth/authService.js  ────────────────────────────────────── */

const USER_LIST_KEY = "hostelhive-users";      // one key for everything
const CURRENT_KEY = "user";

/* helper: always trim + lower‑case email */
const cleanEmail = (e) => e.trim().toLowerCase();
const cleanPassword = (p) => p.trim();

/* 🔐 LOGIN  */
export const loginUser = async (credentials) => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json(); // { token, user }
};

/* 🔏 SIGN‑UP  */
export const signup = ({ name, email, password, room, hostel }) => {
  const users = JSON.parse(localStorage.getItem(USER_LIST_KEY)) || [];

  const e = cleanEmail(email);
  const p = cleanPassword(password);

  if (users.find((u) => cleanEmail(u.email) === e)) return false; // duplicate

  const newUser = { name, email: e, password: p, room, hostel, role: "student" };
  users.push(newUser);

  localStorage.setItem(USER_LIST_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_KEY, JSON.stringify(newUser));

  return true;
};


export const logout = () => localStorage.removeItem(CURRENT_KEY);


export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(CURRENT_KEY));

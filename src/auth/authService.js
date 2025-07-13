/*  ── src/auth/authService.js  ────────────────────────────────────── */

const USER_LIST_KEY = "hostelhive-users";      // one key for everything
const CURRENT_KEY   = "currentUser";

/* helper: always trim + lower‑case email */
const cleanEmail    = (e) => e.trim().toLowerCase();
const cleanPassword = (p) => p.trim();

/* 🔐 LOGIN  */
export const login = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem(USER_LIST_KEY)) || [];

  const e = cleanEmail(email);
  const p = cleanPassword(password);

  const user = users.find(
    (u) => cleanEmail(u.email) === e && cleanPassword(u.password) === p
  );

  console.log("users ⇒", users);        // 🔎 debug
  console.log("looking for ⇒", e, p);
  console.log("match ⇒", user);

  if (user) {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
    return true;
  }
  return false;
};

/* 🔏 SIGN‑UP  */
export const signup = ({ name, email, password }) => {
  const users = JSON.parse(localStorage.getItem(USER_LIST_KEY)) || [];

  const e = cleanEmail(email);
  const p = cleanPassword(password);

  if (users.find((u) => cleanEmail(u.email) === e)) return false; // duplicate

  const newUser = { name, email: e, password: p, role: "student" };
  users.push(newUser);

  localStorage.setItem(USER_LIST_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_KEY,   JSON.stringify(newUser));

  return true;
};


export const logout = () => localStorage.removeItem(CURRENT_KEY);


export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(CURRENT_KEY));

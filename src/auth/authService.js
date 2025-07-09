export const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user){
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
    }
    return false;
};

export const signup = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === email);
    if (exists) return false;

    const newUser = { name, email, password, role: "student" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
};

export const logout = () => {
    localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};
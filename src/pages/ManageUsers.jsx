import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth/authService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ManageUsers = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!currentUser || currentUser.role !== "admin") {
            toast.error("Access denied.");
            navigate("/login");
            return;
        }

        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/users/all", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUsers(res.data);
                console.log("API returned:", res.data);

            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };

        fetchUsers();
    }, [currentUser, navigate]);

    const handleRoleChange = async (id, newRole) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                `http://localhost:5000/api/users/role/${id}`,
                { role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Role updated!");
            setUsers((prev) =>
                prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
            );
        } catch (err) {
            console.error("Role update failed", err);
            toast.error("Failed to update role");
        }
    };


    return (
        <div className="p-6 bg-[#0a0f0d] min-h-screen text-[#36fba1]">
            <h1 className="text-2xl font-bold mb-6">👥 Manage Users</h1>
            <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-4 p-2 rounded-md bg-[#1e1e1e] text-[#36fba1] border border-[#36fba144] focus:outline-none"
            />

            <div className="overflow-x-auto">
                <table className="w-full text-sm border border-[#36fba133]">
                    <thead className="bg-[#1a1a1a] text-left">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Hostel</th>
                            <th className="p-3">Room</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter(
                                (u) =>
                                    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    u.email.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((user, idx) => (
                                <tr
                                    key={idx}
                                    className="border-t border-[#36fba122] hover:bg-[#1f1f1f]"
                                >
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.hostel || "—"}</td>
                                    <td className="p-3">{user.room || "—"}</td>
                                    <td className="p-3 capitalize">{user.role}</td>
                                    <td className="p-3">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="bg-[#1c1f1e] border border-[#36fba1] rounded px-2 py-1 text-sm"
                                        >
                                            <option value="student">Student</option>
                                            <option value="admin">Admin</option>
                                            <option value="mess-secretary">Mess Secretary</option>
                                            <option value="maintenance-secretary">Maintenance Secretary</option>
                                            <option value="sports-secretary">Sports Secretary</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        {users.length === 0 && (
                            <tr>
                                <td className="p-4 italic opacity-50" colSpan={6}>
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;

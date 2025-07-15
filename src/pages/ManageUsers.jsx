import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth/authService";
import { useNavigate } from "react-router-dom";


const ManageUsers = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Redirect non-admin users
        if (!currentUser || currentUser.role !== "admin") {
            navigate("/dashboard");
            return;
        }

        const allUsers = JSON.parse(localStorage.getItem("hostelhive-users")) || [];
        setUsers(allUsers);
    }, []);

    return (
        <div className="p-6 bg-[#0a0f0d] min-h-screen text-[#36fba1]">
            <h1 className="text-2xl font-bold mb-6">👥 Manage Users</h1>

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
                        {users.map((user, idx) => (
                            <tr key={idx} className="border-t border-[#36fba122] hover:bg-[#1f1f1f]">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.hostel || "—"}</td>
                                <td className="p-3">{user.room || "—"}</td>
                                <td className="p-3 capitalize">{user.role}</td>
                                <td className="p-3">
                                    <button className="text-sm underline hover:text-white">Edit</button>
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

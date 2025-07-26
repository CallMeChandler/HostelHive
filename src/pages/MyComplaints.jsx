import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getCurrentUser } from "../auth/authService";

const MyComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const user = getCurrentUser();

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/complaints/my`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setComplaints(res.data);
            } catch (err) {
                toast.error("Failed to load complaints.");
            }
        };

        fetchComplaints();
    }, []);
    return (
        <div className="min-h-screen bg-[#0a0f0d] text-[#36fba1] p-6">
            <h2 className="text-2xl font-bold mb-6">Your Complaints</h2>

            {complaints.length === 0 ? (
                <p className="opacity-70">No complaints lodged yet.</p>
            ) : (
                <div className="grid gap-4">
                    {complaints.map((complaint, i) => (
                        <div
                            key={i}
                            className="bg-[#1c1f1e] border border-[#36fba122] rounded-lg p-5 flex flex-col md:flex-row md:justify-between md:items-center"
                        >
                            <div>
                                <h4 className="font-semibold text-lg mb-1">{complaint.title}</h4>
                                <p className="text-sm opacity-80 mb-1">Room: {complaint.room}</p>
                                <p className="text-sm opacity-80">"{complaint.description}"</p>
                            </div>

                            <div className="mt-3 md:mt-0 flex items-center gap-3">
                                <span
                                    className={`px-3 py-1 text-sm rounded-full font-semibold ${complaint.status === "Resolved"
                                            ? "bg-green-600 text-white"
                                            : complaint.status === "Rejected"
                                                ? "bg-red-500 text-white"
                                                : "bg-yellow-400 text-black"
                                        }`}
                                >
                                    {complaint.status}
                                </span>

                                <p className="text-xs opacity-60">
                                    {new Date(complaint.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyComplaints;
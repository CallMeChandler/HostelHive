import { useEffect, useState } from "react";

const ManageComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("hostelhive-complaints")) || [];
        setComplaints(stored);
    }, []);

    const handleStatusChange = (index, newStatus) => {
        const updated = [...complaints];
        updated[index].status = newStatus;

        setComplaints(updated);
        localStorage.setItem("hostelhive-complaints", JSON.stringify(updated));
    };

    return (
        <div className="p-6 text-white min-h-screen bg-[#0e0e0e]">
            <h2 className="text-2xl font-bold mb-6">Manage Complaints</h2>

            {complaints.length === 0 ? (
                <p className="text-gray-400 italic">No complaints submitted yet.</p>
            ) : (
                <div className="space-y-4">
                    {complaints.map((c, i) => (
                        <div
                            key={i}
                            className="border border-[#36fba144] bg-[#1a1a1a] p-4 rounded-lg"
                        >
                            <div className="flex justify-between items-start gap-4 flex-wrap">
                                <div className="flex-1">
                                    <p className="text-lg font-semibold">{c.title}</p>
                                    <p className="text-sm text-gray-300 mb-2">{c.description}</p>
                                    <p className="text-xs text-gray-400">
                                        Room {c.room} | {c.category} | {c.date}
                                    </p>
                                    <p className="text-xs text-gray-500">Filed by: {c.name} ({c.email})</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-[#36fba1]">Status</label>
                                    <select
                                        value={c.status}
                                        onChange={(e) => handleStatusChange(i, e.target.value)}
                                        className="bg-[#121816] border border-[#36fba1] text-white px-2 py-1 rounded-md focus:outline-none"
                                    >
                                        <option value="lodged">Lodged</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageComplaints;

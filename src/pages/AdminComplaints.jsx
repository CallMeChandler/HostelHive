import { useState, useEffect } from "react";

const AdminComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const all = JSON.parse(localStorage.getItem("complaints")) || [];
        setComplaints(all);
    }, []);

    const handleStatusUpdate = (index) => {
        const updated = [...complaints];
        updated[index].status = "Closed";
        localStorage.setItem("complaints", JSON.stringify(updated));
        setComplaints(updated);
    };

    return (
        <div className="p-6 bg-[#0e0e0e] min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-4">🛠 Maintenance Complaints</h2>

            {complaints.length === 0 ? (
                <p className="text-gray-400">No complaints found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-[#36fba122]">
                        <thead className="bg-[#1a1a1a] text-[#36fba1]">
                            <tr>
                                <th className="px-4 py-2 border border-[#36fba122]">Room</th>
                                <th className="px-4 py-2 border border-[#36fba122]">Title</th>
                                <th className="px-4 py-2 border border-[#36fba122]">Category</th>
                                <th className="px-4 py-2 border border-[#36fba122]">Status</th>
                                <th className="px-4 py-2 border border-[#36fba122]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((c, index) => (
                                <tr key={index} className="border-t border-[#36fba122]">
                                    <td className="px-4 py-2">{c.room}</td>
                                    <td className="px-4 py-2">{c.title}</td>
                                    <td className="px-4 py-2">{c.category}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded text-sm font-medium ${c.status === "Closed" ? "bg-green-600" : "bg-yellow-500"
                                            }`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        {c.status !== "Closed" && (
                                            <button
                                                onClick={() => handleStatusUpdate(index)}
                                                className="bg-[#36fba1] text-black px-3 py-1 rounded hover:bg-[#29c984]"
                                            >
                                                Mark as Closed
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminComplaints;
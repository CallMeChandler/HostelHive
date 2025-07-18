import { useEffect, useState } from "react";

const ManageSports = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("hostelhive-sports-requests")) || [];
        setRequests(data);
    }, []);

    const updateStatus = (index, newStatus) => {
        if (newStatus === "approved") {
            const stock = JSON.parse(localStorage.getItem("hostelhive-sports-stock")) || [];
            const index = stock.findIndex(s => s.item === requests[index].item);
            if (index !== -1) {
                stock[index].qty += 1;
                localStorage.setItem("hostelhive-sports-stock", JSON.stringify(stock));
            }
        }
    };

    const getStatusColor = (status) => {
        if (status === "approved") return "text-green-400";
        if (status === "rejected") return "text-red-400";
        return "text-yellow-400";
    };

    return (
        <div className="p-6 text-white min-h-screen bg-[#0a0f0d]">
            <h1 className="text-2xl font-bold mb-6">Manage Sports Requests</h1>

            {requests.length === 0 ? (
                <p className="text-gray-400 italic">No requests found.</p>
            ) : (
                <div className="space-y-4">
                    {requests.map((req, index) => (
                        <div
                            key={index}
                            className="border border-[#36fba122] rounded-md p-4 bg-[#1b1f1d] flex justify-between items-center flex-wrap"
                        >
                            <div>
                                <p className="font-semibold">{req.name} ({req.email})</p>
                                <p className="text-sm">
                                    Item: <span className="font-medium">{req.item}</span> | Qty: {req.quantity}
                                </p>
                                <p className="text-xs text-gray-400">Date: {new Date(req.date).toLocaleString()}</p>
                            </div>

                            <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                <span className={`text-sm font-bold ${getStatusColor(req.status)}`}>
                                    {req.status.toUpperCase()}
                                </span>
                                {req.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() => updateStatus(index, "approved")}
                                            className="bg-green-500 text-black px-3 py-1 rounded-md hover:bg-green-400"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(index, "rejected")}
                                            className="bg-red-500 text-black px-3 py-1 rounded-md hover:bg-red-400"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageSports;
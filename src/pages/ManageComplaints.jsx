import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/complaints/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(res.data);
      } catch (error) {
        toast.error("Failed to fetch complaints.");
      }
    };

    fetchAll();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/complaints/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c))
      );
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="p-6 text-white bg-[#0e0e0e] min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📋 All Complaints</h2>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((c) => (
            <div key={c._id} className="p-4 rounded-md border border-[#36fba1] bg-[#1c1c1c]">
              <p className="text-lg font-semibold">{c.title}</p>
              <p className="text-sm text-gray-300">{c.description}</p>
              <p className="text-xs text-gray-400">
                {c.name} ({c.email}) | Room: {c.room} | Category: {c.type}
              </p>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-sm">
                  Status:{" "}
                  <span className="capitalize px-2 py-1 bg-[#36fba122] rounded">
                    {c.status}
                  </span>
                </span>

                <select
                  value={c.status}
                  onChange={(e) => handleStatusChange(c._id, e.target.value)}
                  className="bg-[#121212] text-white border border-[#36fba1] rounded px-2 py-1 text-sm"
                >
                  <option value="lodged">Lodged</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageComplaints;

import { useEffect, useState } from "react";

const ManageComplaints = () => {
  const [allComplaints, setAllComplaints] = useState([]);

  useEffect(() => {
    const complaints = JSON.parse(localStorage.getItem("hostelhive-complaints")) || [];
    setAllComplaints(complaints);
  }, []);

  const toggleStatus = (index) => {
    const updated = [...allComplaints];
    updated[index].status = updated[index].status === "lodged" ? "closed" : "lodged";
    setAllComplaints(updated);
    localStorage.setItem("hostelhive-complaints", JSON.stringify(updated));
  };

  return (
    <div className="p-6 text-white min-h-screen bg-[#0e0e0e]">
      <h2 className="text-2xl font-bold mb-6">Manage All Complaints</h2>

      {allComplaints.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No complaints to manage.</p>
      ) : (
        <div className="space-y-4">
          {allComplaints.map((c, i) => (
            <div
              key={i}
              className="p-4 bg-[#1a1a1a] rounded-lg border border-[#36fba122]"
            >
              <p className="text-lg font-semibold">{c.title}</p>
              <p className="text-sm">{c.description}</p>
              <p className="text-sm mt-1 text-gray-400">
                Category: {c.category} | Room: {c.room} | Hostel: {c.hostel}
              </p>
              <p className="text-xs text-gray-500">
                By {c.name} ({c.email}) — {new Date(c.date).toLocaleString()}
              </p>

              <div className="mt-3 flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    c.status === "lodged"
                      ? "bg-yellow-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {c.status}
                </span>
                <button
                  onClick={() => toggleStatus(i)}
                  className="px-3 py-1 text-sm bg-[#36fba1] text-black rounded hover:bg-[#2ae79a] transition"
                >
                  Mark as {c.status === "lodged" ? "Closed" : "Lodged"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageComplaints;

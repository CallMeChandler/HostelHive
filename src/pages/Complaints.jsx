import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth/authService";

const LOCAL_KEY = "hostelhive-complaints";

const Complaints = () => {
  const user = getCurrentUser();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    room: ""
  });

  const [complaints, setComplaints] = useState([]);

  /* 🟢 Load current user’s complaints on mount */
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
    setComplaints(all.filter((c) => c.email === user.email).reverse());
  }, [user.email]);

  /* 📝 Submit new complaint */
  const handleSubmit = (e) => {
    e.preventDefault();

    const all = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];

    const newComplaint = {
      ...formData,
      email: user.email,
      name: user.name,
      room: formData.room || user.room,
      status: "lodged",
      date: new Date().toISOString()
    };

    const updated = [...all, newComplaint];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));

    setComplaints([newComplaint, ...complaints]); // update UI instantly
    setFormData({ title: "", description: "", category: "", room: "" });
    alert("Complaint submitted!");
  };

  return (
    <div className="p-6 text-white bg-[#0e0e0e] min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Raise a Complaint</h2>

      {/* ➕ Complaint Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 bg-[#1e1e1e] rounded-md border border-[#36fba1] focus:outline-none"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 bg-[#1e1e1e] rounded-md border border-[#36fba1] focus:outline-none"
          required
        />

        <input
          type="text"
          name="room"
          placeholder="Room No"
          value={formData.room}
          onChange={(e) => setFormData({ ...formData, room: e.target.value })}
          className="w-full p-2 bg-[#1e1e1e] rounded-md border border-[#36fba1]"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full p-2 bg-[#1e1e1e] rounded-md border border-[#36fba1]"
          required
        >
          <option value="">Select Category</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Furniture">Furniture</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-[#36fba1] text-black px-4 py-2 rounded hover:bg-[#29c984]"
        >
          Submit Complaint
        </button>
      </form>

      {/* 📜 User’s Complaints */}
      <h2 className="text-lg font-semibold mb-2">Your Complaints</h2>
      <div className="space-y-3">
        {complaints.length === 0 && (
          <p className="text-sm text-gray-400 italic">No complaints yet.</p>
        )}

        {complaints.map((c, i) => (
          <div
            key={i}
            className="p-3 border border-[#36fba144] rounded-md bg-[#1a1a1a]"
          >
            <p className="text-sm font-semibold">
              {c.title}{" "}
              <span className="text-xs text-gray-400">({c.category})</span>
            </p>
            <p className="text-sm">{c.description}</p>
            <p className="text-xs text-gray-500">
              Room: {c.room} | Status: {c.status}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(c.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../auth/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    room: "",
    hostel: "H-1"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isRoomFull = () => {
    const users = JSON.parse(localStorage.getItem("hostelhive-users")) || [];
    const sameRoomUsers = users.filter(
      u => u.room === formData.room && u.hostel === formData.hostel
    );
    return sameRoomUsers.length >= 2;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRoomFull()) {
      alert("This room is already full (2 users max). Choose another room.");
      return;
    }

    const success = signup(formData);
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Email already registered!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-[#0a0f0d] text-[#36fba1] px-4 py-10">
      <div className="bg-[#1c1f1e] w-full max-w-md p-8 rounded-xl shadow-lg border border-[#36fba122]">
        <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full bg-[#0a0f0d] text-[#36fba1] border border-[#36fba144] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36fba1]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@bitmesra.ac.in"
              required
              className="w-full bg-[#0a0f0d] text-[#36fba1] border border-[#36fba144] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36fba1]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="w-full bg-[#0a0f0d] text-[#36fba1] border border-[#36fba144] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36fba1]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Room Number</label>
            <input
              name="room"
              type="text"
              value={formData.room}
              onChange={handleChange}
              placeholder="Eg. 202"
              required
              className="w-full bg-[#0a0f0d] text-[#36fba1] border border-[#36fba144] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36fba1]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Hostel</label>
            <select
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
              required
              className="w-full bg-[#0a0f0d] text-[#36fba1] border border-[#36fba144] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36fba1]"
            >
              {[...Array(13)].map((_, i) => (
                <option key={i} value={`H-${i + 1}`}>{`H-${i + 1}`}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#36fba1] text-black font-semibold py-2 rounded-lg hover:bg-[#2ae79a] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-4 text-center opacity-70">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-white">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

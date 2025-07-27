import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import toast from "react-hot-toast";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // BIT Mesra email format: abc12345.23@bitmesra.ac.in
    const emailPattern = /^[a-z]{2,10}\d{5}\.\d{2}@bitmesra\.ac\.in$/;

    if (!emailPattern.test(formData.email.toLowerCase())) {
      toast.error("Please register with a valid BIT Mesra email.");
      return;
    }

    try {
      const res = await registerUser(formData);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
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

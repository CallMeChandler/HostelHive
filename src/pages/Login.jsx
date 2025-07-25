import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      const { token, user } = res.data;

      // Save token & user info
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed!";
      toast.error(msg);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#0a0f0d] text-[#36fba1] px-4">
      <div className="bg-[#1c1f1e] w-full max-w-md p-8 rounded-xl shadow-lg border border-[#36fba122]">
        <h2 className="text-3xl font-bold mb-6 text-center">Login to HostelHive</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="you@bitmesra.ac.in"
              className="w-full bg-[#0a0f0d] text-[#36fba1] border border-[#36fba144] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36fba1]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="********"
              className="w-full bg-[#0a0f0d] text-[#36fba1] border border-[#36fba144] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36fba1]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#36fba1] text-black font-semibold py-2 rounded-lg hover:bg-[#2ae79a] transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-4 text-center opacity-70">
          Don’t have an account?{" "}
          <a href="/signup" className="underline hover:text-white">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

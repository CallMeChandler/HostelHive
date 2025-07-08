const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#0a0f0d] text-[#36fba1] px-4">
      <div className="bg-[#1c1f1e] w-full max-w-md p-8 rounded-xl shadow-lg border border-[#36fba122]">
        <h2 className="text-3xl font-bold mb-6 text-center">Login to HostelHive</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@bitmesra.ac.in"
              className="w-full bg-[#0a0f0d] text-[#36fba1] border border-[#36fba144] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36fba1]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
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
          <span className="underline cursor-pointer hover:text-white">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

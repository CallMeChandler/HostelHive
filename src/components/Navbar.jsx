import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authService"; // adjust path if needed

const Navbar = ({ setDrawerOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();            // clear currentUser from localStorage
    navigate("/login");  // go back to login screen
  };

  return (
    <nav className="w-full bg-[#0a0f0d] text-[#36fba1] px-6 py-4 flex justify-between items-center border-b border-[#36fba144]">
      {/*  ── left side: logo + hamburger  ───────────────────────── */}
      <div className="flex items-center gap-4">
        {/* Hamburger visible only on mobile */}
        <button onClick={() => setDrawerOpen(true)} className="md:hidden text-2xl">
          <MdMenu />
        </button>
        <h1 className="text-xl font-semibold tracking-wide">HostelHive</h1>
      </div>

      {/*  ── right side: welcome + logout  ──────────────────────── */}
      <div className="flex items-center gap-4">
        <p className="text-sm opacity-80 hidden sm:block">Welcome, Student</p>

        <button
          onClick={handleLogout}
          className="px-3 py-[6px] text-sm bg-[#36fba1] text-black rounded hover:bg-[#29c984] transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

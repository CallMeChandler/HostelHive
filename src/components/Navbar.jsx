import { MdMenu } from "react-icons/md";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser, logout } from "../auth/authService"; // adjust path if needed

const Navbar = ({ setDrawerOpen }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    logout();            // clear currentUser from localStorage
    navigate("/login");  // go back to login screen
  };

  useEffect(() => {
    const allNotifications = JSON.parse(localStorage.getItem("hostelhive-notifications")) || [];
    const readIds = JSON.parse(localStorage.getItem(`read-notifications-${user.email}`)) || [];
    const unread = allNotifications.filter(n => !readIds.includes(n.id));
    setUnreadCount(unread.length);
  }, []);

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
        <p className="text-sm opacity-80 hidden sm:block">Welcome, {user?.name?.split(" ")[0]}</p>

        <button onClick={() => navigate("/notifications")} className="relative text-xl">
          <FiBell />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

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

import { MdMenu } from "react-icons/md";
import { FiBell } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser, logout } from "../auth/authService";
import { ArrowLeft } from "lucide-react";
import { fetchNotifications } from "../api/circular";

const Navbar = ({ setDrawerOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [unreadCount, setUnreadCount] = useState(0);
  const showBack = location.pathname !== "/dashboard";

  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetchNotifications(token);
        const allNotifs = res.data;

        const read = JSON.parse(localStorage.getItem(`read-notifications-${user.email}`)) || [];
        const unread = allNotifs.filter((n) => !read.includes(n._id));

        setUnreadCount(unread.length);
      } catch (err) {
        console.error("Failed to fetch notifications in navbar:", err);
      }
    };

    loadUnreadCount();
    const interval = setInterval(loadUnreadCount, 10000); // every 10s
    return () => clearInterval(interval);
  }, [user.email]);


  // 👉 Swipe-to-back detection
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX;

      // ✅ Right swipe (min 75px) and not on /dashboard
      if (diff > 75 && location.pathname !== "/dashboard") {
        navigate("/dashboard");
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#0a0f0d] text-[#36fba1] px-4 py-3 flex items-center justify-between border-b border-[#36fba144]">
      <div className="flex items-center gap-3">
        <button onClick={() => setDrawerOpen(true)} className="md:hidden text-2xl text-[#36fba1]">
          <MdMenu />
        </button>

        {showBack && (
          <button
            onClick={() => navigate("/dashboard")}
            className="hidden md:flex items-center gap-1 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}

        <div className="flex items-center gap-2">
          <img src="./img/HostelHive_PNG-logo.png" alt="Logo" className="w-12 h-12" />
          <h1 className="text-lg font-semibold">HostelHive</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-sm opacity-80 hidden sm:block">
          Welcome, {user?.name?.split(" ")[0]}
        </p>

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

import {
  MdClose, MdDashboard, MdBuild, MdRestaurantMenu, MdSportsCricket, MdNotificationAdd
} from "react-icons/md";
import { FaUser, FaTools, FaTableTennis } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/authService";
import { useSwipeable } from "react-swipeable";

const DrawerSidebar = ({ isOpen, setIsOpen }) => {
  const user = getCurrentUser();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIsOpen(false),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  const linkStyle = "flex items-center gap-3 px-4 py-2 rounded-md hover:text-white transition";

  return (
    <div
      {...swipeHandlers}
      className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0a0f0d] text-[#36fba1] shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:hidden`}
    >
      <div className="flex justify-between items-center p-4 border-b border-[#36fba144]">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={() => setIsOpen(false)}>
          <MdClose className="text-xl" />
        </button>
      </div>

      <ul className="p-6 space-y-5 text-sm font-medium">
        <li className="bg-[#1c1f1e] px-4 py-2 rounded-lg shadow border border-[#36fba122] flex items-center gap-3">
          <MdDashboard className="text-lg" />
          Dashboard
        </li>
        <Link to="/complaints" className={linkStyle} onClick={() => setIsOpen(false)}>
          <MdBuild className="text-lg" />
          Complaints
        </Link>
        <Link to="/mess" className={linkStyle} onClick={() => setIsOpen(false)}>
          <MdRestaurantMenu className="text-lg" />
          Mess Menu
        </Link>
        <Link to="/sports" className={linkStyle} onClick={() => setIsOpen(false)}>
          <MdSportsCricket className="text-lg" />
          Sports Inventory
        </Link>
        <Link to="/profile" className={linkStyle} onClick={() => setIsOpen(false)}>
          <FaUser className="text-lg" />
          My Profile
        </Link>

        {["admin"].includes(user?.role) && (
          <Link to="/manage-notifications" className={linkStyle} onClick={() => setIsOpen(false)}>
            <MdNotificationAdd /> Manage Notifications
          </Link>
        )}
        {["admin", "maintenance"].includes(user?.role) && (
          <Link to="/manage-complaints" className={linkStyle} onClick={() => setIsOpen(false)}>
            <FaTools /> Manage Complaints
          </Link>
        )}
        {["admin", "sports"].includes(user?.role) && (
          <Link to="/manage-sports" className={linkStyle} onClick={() => setIsOpen(false)}>
            <FaTableTennis /> Manage Sports
          </Link>
        )}
        {["admin", "mess"].includes(user?.role) && (
          <Link to="/edit-mess-menu" className={linkStyle} onClick={() => setIsOpen(false)}>
            <IoFastFoodOutline /> Edit Mess Menu
          </Link>
        )}
        {["admin"].includes(user?.role) && (
          <Link to="/manage-users" className={linkStyle} onClick={() => setIsOpen(false)}>
            <HiMiniUsers /> Manage Users
          </Link>
        )}
      </ul>
    </div>
  );
};

export default DrawerSidebar;

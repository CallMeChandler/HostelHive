import { MdDashboard, MdBuild, MdRestaurantMenu, MdSportsCricket, MdNotificationAdd } from "react-icons/md";
import { FaUser, FaTools, FaTableTennis } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/authService";
const user = getCurrentUser();


const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col bg-[#0a0f0d] text-[#36fba1] w-64 h-screen px-6 py-8 border-r border-[#36fba144] shadow-inner">
      <ul className="space-y-6 mt-4 text-sm font-medium">
        <li className="bg-[#1c1f1e] px-4 py-2 rounded-lg shadow border border-[#36fba122] flex items-center gap-3">
          <MdDashboard className="text-lg" />
          Dashboard
        </li>
        <Link to="/complaints" className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-white transition">
          <MdBuild className="text-lg" />
          Complaints
        </Link>
        <Link to="/mess" className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-white transition">
          <MdRestaurantMenu className="text-lg" />
          Mess Menu
        </Link>
        <Link to="/sports" className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-white transition">
          <MdSportsCricket className="text-lg" />
          Sports Inventory
        </Link>
        <Link to="/Profile" className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-white transition">
          <FaUser className="text-lg" />
          My Profile
        </Link>
        {["admin", "maintenance-secretary", "mess-secretary", "sports-secretary"].includes(user?.role) && (
          <li>
            <Link
              to="/manage-notifications"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-[#36fba1] transition"
            >
              <MdNotificationAdd /> Manage Notifications
            </Link>
          </li>
        )}
        {["admin", "maintenance-secretary", "mess-secretary", "sports-secretary"].includes(user?.role) && (
          <li>
            <Link
              to="/manage-complaints"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-[#36fba1] transition"
            >
              <FaTools /> Manage Complaints
            </Link>
          </li>
        )}
        {["admin", "sports-secretary"].includes(user?.role) && (
          <li>
            <Link
              to="/manage-sports"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-[#36fba1] transition"
            >
              <FaTableTennis /> Manage Sports
            </Link>
          </li>
        )}
        {["admin", "mess-secretary"].includes(user?.role) && (
          <li>
            <Link
              to="/edit-mess-menu"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-[#36fba1] transition"
            >
              <IoFastFoodOutline /> Edit Mess Menu
            </Link>
          </li>
        )}
        {["admin"].includes(user?.role) && (
          <li>
            <Link
              to="/manage-users"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-[#36fba1] transition"
            >
              <HiMiniUsers /> Manage Users
            </Link>
          </li>
        )}

      </ul>
    </aside>
  );
};

export default Sidebar;

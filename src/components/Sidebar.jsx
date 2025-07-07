import { MdDashboard, MdBuild, MdRestaurantMenu, MdSportsCricket } from "react-icons/md";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col bg-[#0a0f0d] text-[#36fba1] w-64 h-screen px-6 py-8 border-r border-[#36fba144] shadow-inner">
      <ul className="space-y-6 text-sm font-medium">
        <li className="bg-[#1c1f1e] px-4 py-2 rounded-lg shadow border border-[#36fba122] flex items-center gap-3">
          <MdDashboard className="text-lg" />
          Dashboard
        </li>
        <li className="hover:text-white transition-all cursor-pointer flex items-center gap-3">
          <MdBuild className="text-lg" />
          Complaints
        </li>
        <li className="hover:text-white transition-all cursor-pointer flex items-center gap-3">
          <MdRestaurantMenu className="text-lg" />
          Mess Menu
        </li>
        <li className="hover:text-white transition-all cursor-pointer flex items-center gap-3">
          <MdSportsCricket className="text-lg" />
          Sports Inventory
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

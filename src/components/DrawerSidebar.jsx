import { MdClose, MdDashboard, MdBuild, MdRestaurantMenu, MdSportsCricket } from "react-icons/md";

const DrawerSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
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
      <ul className="p-6 space-y-6 text-sm font-medium">
        <li className="flex items-center gap-3">
          <MdDashboard className="text-lg" />
          Dashboard
        </li>
        <li className="flex items-center gap-3">
          <MdBuild className="text-lg" />
          Complaints
        </li>
        <li className="flex items-center gap-3">
          <MdRestaurantMenu className="text-lg" />
          Mess Menu
        </li>
        <li className="flex items-center gap-3">
          <MdSportsCricket className="text-lg" />
          Sports Inventory
        </li>
      </ul>
    </div>
  );
};

export default DrawerSidebar;

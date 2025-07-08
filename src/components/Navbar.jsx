import { MdMenu } from "react-icons/md";

const Navbar = ({ setDrawerOpen }) => {
  return (
    <nav className="w-full bg-[#0a0f0d] text-[#36fba1] px-6 py-4 flex justify-between items-center border-b border-[#36fba144]">
      <div className="flex items-center gap-4">
        {/* Hamburger visible only on mobile */}
        <button className="md:hidden text-2xl" onClick={() => setDrawerOpen(true)}>
          <MdMenu />
        </button>
        <h1 className="text-xl font-semibold tracking-wide">HostelHive</h1>
      </div>
      <p className="text-sm opacity-80 hidden sm:block">Welcome, Student</p>
    </nav>
  );
};

export default Navbar;

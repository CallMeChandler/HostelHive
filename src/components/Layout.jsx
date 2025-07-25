import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-4 bg-[#0a0f0d] min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

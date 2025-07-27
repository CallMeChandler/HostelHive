import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import DrawerSidebar from "./DrawerSidebar";
import { useState } from "react";

const Layout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <>
            <Navbar setDrawerOpen={setDrawerOpen} />
            <DrawerSidebar isOpen={drawerOpen} setIsOpen={setDrawerOpen} />
            <main className="pt-4 bg-[#0a0f0d] min-h-screen">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;

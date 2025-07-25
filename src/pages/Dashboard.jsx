import { FaUser, FaTools, FaUtensils, FaFootballBall } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { RiWifiFill } from "react-icons/ri";
import { getCurrentUser } from "../auth/authService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchMessMenu } from "../api/messmenu.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [complaintsCount, setComplaintsCount] = useState(0);
  const [todayMenu, setTodayMenu] = useState("Loading...");
  const [sportsItems, setSportsItems] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    const userComplaints = complaints.filter(c => c.email === user.email);
    setComplaintsCount(userComplaints.length);

    const loadMessMenu = async () => {
      try {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const day = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase(); // e.g., "monday"

        const meals = [
          { name: "Breakfast", time: 450, end: 540 },
          { name: "Lunch", time: 750, end: 840 },
          { name: "Snacks", time: 1020, end: 1080 },
          { name: "Dinner", time: 1230, end: 1320 },
        ];

        const messData = await fetchMessMenu(); // { monday: { breakfast: "...", ... }, ... }
        const todayMenuData = messData[day];

        const matched = meals.find(m => currentMinutes >= m.time && currentMinutes <= m.end);
        const next = meals.find(m => currentMinutes < m.time) || meals[0];

        const mealToShow = matched ? matched : next;
        const mealKey = mealToShow.name.toLowerCase(); // "lunch", etc.
        const label = matched ? mealToShow.name : `Next Meal: ${mealToShow.name}`;

        setTodayMenu(`${label}: ${todayMenuData?.[mealKey] || "Not set"}`);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setTodayMenu("Couldn't load menu");
      }
    };

    loadMessMenu();
    setSportsItems(6);
  }, [navigate, user]);

  if (!user) return null;

  const cardStyle = "bg-[#121816] text-[#36fba1] p-6 rounded-xl shadow-md border border-[#36fba155] flex items-center gap-4 hover:bg-[#1c2824] transition";

  return (
    <>

      <div className="p-6 text-white">

        {/* ✅ Hero Banner with Full Height Image */}
        <div className="relative w-full rounded-xl overflow-hidden shadow-md mb-6">
          <img
            src="/img/BITBuilidingBanner.png"
            alt="BIT Mesra Campus"
            className="w-full object-cover rounded-xl"
            style={{ maxHeight: "400px", width: "100%" }}
          />
          {/* Softer overlay if needed, can be removed if too dark */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* ✅ Welcome Back Text BELOW Banner */}
        <h1 className="text-2xl font-bold mb-6">
          Welcome back, {user.name.split(" ")[0]} 👋
        </h1>

        {/* ✅ Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={cardStyle}>
            <FaUser size={28} />
            <div>
              <p className="text-sm">Logged in as</p>
              <p className="font-semibold capitalize">{user.role}</p>
            </div>
          </div>

          <Link to="/my-complaints" className={cardStyle}>
            <FaTools size={28} />
            <div>
              <p className="text-sm">Your Complaints</p>
              <p className="font-semibold">{complaintsCount} total</p>
            </div>
          </Link>

          <div className={cardStyle}>
            <FaUtensils size={28} />
            <div>
              <p className="text-sm">Tonight's Dinner</p>
              <p className="font-semibold">{todayMenu}</p>
            </div>
          </div>

          <div className={cardStyle}>
            <FaFootballBall size={28} />
            <div>
              <p className="text-sm">Sports Items Available</p>
              <p className="font-semibold">{sportsItems}</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-10 mb-4 text-[#36fba1]">Quick Access</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <a
            href="https://erpportal.bitmesra.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#121816] hover:bg-[#1c2824] transition border border-[#36fba155] rounded-xl p-6 flex items-center gap-4 shadow-md"
          >
            <HiOutlineAcademicCap size={42} className="text-[#36fba1]" />
            <div>
              <p className="text-lg font-bold text-[#36fba1]">ERP Portal</p>
              <p className="text-sm text-gray-400">Access your academics</p>
            </div>
          </a>


          <a
            href="http://192.168.5.20:8090/httpclient.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#121816] hover:bg-[#1c2824] transition border border-[#36fba155] rounded-xl p-6 flex items-center gap-4 shadow-md"
          >
            <RiWifiFill size={42} className="text-[#36fba1]" />
            <div>
              <p className="text-lg font-bold text-[#36fba1]">Connect to Wi-Fi</p>
              <p className="text-sm text-gray-400">Login via Sophos Portal</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

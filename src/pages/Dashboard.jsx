import { FaUser, FaTools, FaUtensils, FaFootballBall } from "react-icons/fa";
import { getCurrentUser } from "../auth/authService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [complaintsCount, setComplaintsCount] = useState(0);
  const [todayMenu, setTodayMenu] = useState("Loading...");
  const [sportsItems, setSportsItems] = useState(0);

  // 🛑 Redirect if no user
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    const userComplaints = complaints.filter(c => c.email === user.email);
    setComplaintsCount(userComplaints.length);

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const meals = [
      { name: "Breakfast", time: 7 * 60 + 30, end: 9 * 60 },
      { name: "Lunch", time: 12 * 60 + 30, end: 14 * 60 },
      { name: "Snacks", time: 17 * 60, end: 18 * 60 },
      { name: "Dinner", time: 20 * 60 + 30, end: 22 * 60 },
    ];

    const mockDayMenu = {
      Breakfast: "Poha + Chai",
      Lunch: "Rajma Chawal",
      Snacks: "Samosa + Tea",
      Dinner: "Paneer Butter Masala"
    };

    let matched = meals.find(m => currentMinutes >= m.time && currentMinutes <= m.end);

    if (matched) {
      setTodayMenu(`${matched.name}: ${mockDayMenu[matched.name]}`);
    } else {
      const nextMeal = meals.find(m => currentMinutes < m.time) || meals[0];
      setTodayMenu(`Next Meal: ${nextMeal.name} — ${mockDayMenu[nextMeal.name]}`);
    }

    setSportsItems(6);
  }, [navigate, user]);

  if (!user) return null; // avoid rendering if user is null

  const cardStyle = "bg-[#121816] text-[#36fba1] p-6 rounded-xl shadow-md border border-[#36fba155] flex items-center gap-4 hover:bg-[#1c2824] transition";

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user.name.split(" ")[0]}</h1>

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
    </div>
  );
};

export default Dashboard;

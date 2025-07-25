import { useState, useEffect } from "react";
import { fetchMessMenu } from "../api/messmenu";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

const MessMenu = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [weekMenu, setWeekMenu] = useState({});

  // Set today's day and fetch menu initially
  useEffect(() => {
    const today = days[new Date().getDay()];
    setSelectedDay(today);
  }, []);

  // Refetch menu whenever selected day changes
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await fetchMessMenu();
        console.log("🔁 Fetched fresh mess menu:", res.data);
        setWeekMenu(res.data.week || {});
      } catch (err) {
        console.error("Failed to load mess menu", err);
      }
    };

    if (selectedDay) loadMenu();
  }, [selectedDay]);

  const currentMeals = weekMenu[selectedDay.toLowerCase()] || {};

  return (
    <div className="min-h-screen bg-[#0a0f0d] p-6 text-[#36fba1]">
      <h2 className="text-2xl font-bold mb-6">Weekly Mess Menu</h2>

      {/* 📅 Day selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1 rounded-full border border-[#36fba144] ${
              selectedDay === day ? "bg-[#36fba1] text-black" : ""
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* 🍽 Meal cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {meals.map((meal) => (
          <div
            key={meal}
            className="bg-[#1c1f1e] border border-[#36fba122] rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-2">{meal}</h3>

            {currentMeals[meal.toLowerCase()] ? (
              <ul className="list-disc list-inside space-y-1 text-xl">
                {currentMeals[meal.toLowerCase()]
                  .split(",")
                  .map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                  ))}
              </ul>
            ) : (
              <p className="italic text-gray-400 text-sm">No items listed.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessMenu;

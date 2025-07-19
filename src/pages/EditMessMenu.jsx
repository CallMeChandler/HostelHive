import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const MEALS = ["Breakfast", "Lunch", "Snacks", "Dinner"];
const MENU_KEY = "hostelhive-mess-menu";

const EditMessMenu = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState("Monday");
  const [menu, setMenu] = useState({});
  const [form, setForm] = useState({
    Breakfast: "",
    Lunch: "",
    Snacks: "",
    Dinner: "",
  });

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.role !== "secretary")) {
      navigate("/dashboard");
      return;
    }

    const savedMenu = JSON.parse(localStorage.getItem(MENU_KEY)) || {};
    setMenu(savedMenu);
    if (savedMenu[selectedDay]) {
      setForm(savedMenu[selectedDay]);
    }

  }, []);

  const handleDayChange = (day) => {
    setSelectedDay(day);
    setForm(menu[day] || {
      Breakfast: "",
      Lunch: "",
      Snacks: "",
      Dinner: ""
    });
  };

  const handleInput = (meal, value) => {
    setForm({ ...form, [meal]: value });
  };

  const handleSave = () => {
    const updatedMenu = { ...menu, [selectedDay]: form };
    setMenu(updatedMenu);
    localStorage.setItem(MENU_KEY, JSON.stringify(updatedMenu));
    toast.success(`${selectedDay} menu updated!`);
  };

  return (
    <div className="p-6 min-h-screen bg-[#0a0f0d] text-[#36fba1]">
      <h1 className="text-2xl font-bold mb-6">📝 Edit Mess Menu</h1>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Select Day</label>
        <select
          value={selectedDay}
          onChange={(e) => handleDayChange(e.target.value)}
          className="p-2 rounded bg-[#1e1e1e] text-[#36fba1] border border-[#36fba144]"
        >
          {daysOfWeek.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {MEALS.map(meal => (
          <div key={meal}>
            <label className="block mb-1 text-sm">{meal}</label>
            <input
              type="text"
              value={form[meal]}
              onChange={(e) => handleInput(meal, e.target.value)}
              placeholder={`Enter ${meal} items`}
              className="w-full p-2 rounded bg-[#1e1e1e] text-[#36fba1] border border-[#36fba144]"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-[#36fba1] text-black px-6 py-2 rounded hover:bg-[#2ae79a] transition"
      >
        Save Menu
      </button>
    </div>
  );
};

export default EditMessMenu;
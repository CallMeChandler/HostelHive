import { useState } from "react";

const weekMenu = {
    Monday: {
        Breakfast: [
            "Cheese Veg Sandwich (layered)",
            "Milk",
            "Apple"
        ],
        Lunch: [
            "Curry",
            "Roti",
            "Chawal",
            "Aloo Sabzi"
        ],
        Snacks: [
            "Finger Chips (thin)",
            "Boondi Raita"
        ],
        Dinner: [
            "Moong Dal Chilla (2 pcs)",
            "Pudina Chutney",
            "Sharbat"
        ]
    },

    Tuesday: {
        Breakfast: [
            "IMPROVED Poha (else Upma)",
            "Sprouts",
            "Jalebi",
            "Banana"
        ],
        Lunch: [
            "Paneer Curry",
            "Rice",
            "Butter Roti",
            "Dal"
        ],
        Snacks: [
            "Pastry",
            "Cutlet Paratha (mooli / methi)",
            "Aloo Sabzi",
            "Tamatar Chutney",
            "Shahi Tukda"
        ],
        Dinner: [
            "Paneer Kofta",
            "Dal Makhani",
            "Roti",
            "Rice"
        ]
    },

    Wednesday: {
        Breakfast: [
            "Brown + White Bread (50–50 %)",
            "Milk"
        ],
        Lunch: [
            "Rajma",
            "Jeera Rice",
            "Roti",
            "Aloo Finger Chips"
        ],
        Snacks: [
            "Moong Dal Kachori",
            "Aloo Sabzi",
            "Green Chutney"
        ],
        Dinner: [
            "Mutton / IMPROVED Veg Biryani",
            "Raita",
            "Cold Drink (Sprite / Coke / Mountain Dew)"
        ]
    },

    Thursday: {
        Breakfast: [
            "Aloo Paratha",
            "Dahi",
            "Sprouts",
            "Amrood + Black Pepper"
        ],
        Lunch: [
            "Mix Veg",
            "Butter Roti",
            "Lemon Rice",
            "Rasgulla"
        ],
        Snacks: [
            "Chowmein / Maggi (alternate)"
        ],
        Dinner: [
            "Fried Rice",
            "Manchurian",
            "Tadka Dal"
        ]
    },

    Friday: {
        Breakfast: [
            "Bread (50‑50 brown/white) (butter / jam)",
            "Cornflakes + Milk",
            "Sprouts",
            "Orange"
        ],
        Lunch: [
            "Soya Chilli / Dry Seasonal Green Veg (alternate)",
            "Roti",
            "Rice",
            "Long‑cut Kheera (chat masala)",
            "Gulab Jamun"
        ],
        Snacks: [
            "Dhuska",
            "Green Chutney",
            "Tamatar Chutney"
        ],
        Dinner: [
            "Paneer Chilli",
            "Rice",
            "Plain Paratha",
            "Dal"
        ]
    },

    Saturday: {
        Breakfast: [
            "Kachori Poori (atta & light sattu)",
            "Aloo Sabzi",
            "Sprouts"
        ],
        Lunch: [
            "Vegetable Masala Khichdi",
            "Dahi",
            "Papad",
            "Aloo Chokha"
        ],
        Snacks: [
            "Bread Pakoda",
            "Lassi / Chaach"
        ],
        Dinner: [
            "Aloo Gobi Matar Sabzi",
            "Gobi / Matar Paratha",
            "Tadka Dal",
            "Rice",
            "Custard"
        ]
    },

    Sunday: {
        Breakfast: [
            "Dosa",
            "Sambhar",
            "Chutney",
            "Sprouts"
        ],
        Lunch: [
            "Chole Bhature",
            "Rice",
            "Dal"
        ],
        Snacks: [
            "Samosa Chaat (chole + dahi + sweet & green chutney)"
        ],
        Dinner: [
            "Mutton / Paneer Curry",
            "Roti",
            "Rice"
        ]
    }
};

const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

const MessMenu = () => {
    const [selectedDay, setSelectedDay] = useState("Monday");


    return (
        <div className="min-h-screen bg-[#0a0f0d] p-6 text-[#36fba1]">
            <h2 className="text-2xl font-bold mb-6">Weekly Mess Menu</h2>

            {/* 📅 Day selector */}
            <div className="flex flex-wrap gap-3 mb-8">
                {Object.keys(weekMenu).map((day) => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-3 py-1 rounded-full border border-[#36fba144] ${selectedDay === day ? "bg-[#36fba1] text-black" : ""
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
                        <ul className="list-disc list-inside space-y-1 text-xl">
                            {weekMenu[selectedDay][meal].map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessMenu;
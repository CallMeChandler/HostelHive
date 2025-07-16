import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth/authService";

const INVENTORY_KEY = "hostelhive-sports-stock";
const REQUEST_KEY = "hostelhive-sports-requests";

const defaultStock = [
    { id: 1, item: "Cricket Bat", qty: 3 },
    { id: 2, item: "Cricket Ball", qty: 5 },
    { id: 3, item: "TT Racket", qty: 2 },
    { id: 4, item: "TT Ball", qty: 12 },
    { id: 5, item: "Badminton Racket", qty: 6 },
    { id: 6, item: "Shuttlecock", qty: 5 }
];

const SportsInventory = () => {
    const user = getCurrentUser();
    const [stock, setStock] = useState(defaultStock);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(INVENTORY_KEY));
        if (saved) setStock(saved);
        else localStorage.setItem(INVENTORY_KEY, JSON.stringify(defaultStock));
    }, []);

    const handleRequest = (idx) => {
        if (stock[idx].qty < 1) return alert("Item out of stock!");

        const updated = [...stock];
        updated[idx].qty -= 1;
        setStock(updated);
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(updated));

        const existingRequests = JSON.parse(localStorage.getItem(REQUEST_KEY)) || [];

        const newRequest = {
            name: user.name,
            email: user.email,
            item: updated[idx].item,
            quantity: 1,
            date: new Date().toISOString(),
            status: "pending"
        };

        const updatedRequests = [...existingRequests, newRequest];
        localStorage.setItem(REQUEST_KEY, JSON.stringify(updatedRequests));

        alert("Request sent to Sports Secretary!");
    };

    return (
        <div className="min-h-screen bg-[#0a0f0d] text-[#36fba1] p-6">
            <h2 className="text-2xl font-bold mb-6">Sports Inventory</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stock.map((s, idx) => (
                    <div
                        key={s.id}
                        className="bg-[#1c1f1e] border border-[#36fba144] rounded-lg p-5 flex flex-col"
                    >
                        <h3 className="text-lg font-semibold mb-2">{s.item}</h3>
                        <p className="text-sm mb-4">
                            Available:{" "}
                            <span className={s.qty ? "text-green-400" : "text-red-500"}>
                                {s.qty}
                            </span>
                        </p>

                        <button
                            onClick={() => handleRequest(idx)}
                            disabled={s.qty === 0}
                            className={`mt-auto px-3 py-2 rounded ${s.qty === 0
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-[#36fba1] text-black hover:bg-[#29c984]"
                                }`}
                        >
                            {s.qty === 0 ? "Out of Stock" : "Request Item"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SportsInventory;

import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { getCurrentUser } from "../auth/authService";
import { fetchSportsStock, submitSportsRequest } from "../api/sports";

const SportsInventory = () => {
  const user = getCurrentUser();
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetchSportsStock();
        setStock(res.data);
      } catch (err) {
        toast.error("Failed to load sports inventory.");
      }
    };

    fetchStock();
  }, []);

  const handleRequest = async (itemName) => {
    try {
      await submitSportsRequest(itemName);
      toast.success("Request sent to Sports Secretary!");
    } catch (err) {
      toast.error("Request failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#36fba1] p-6">
      <h2 className="text-2xl font-bold mb-6">Sports Inventory</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stock.map((s) => (
          <div
            key={s._id}
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
              onClick={() => handleRequest(s.item)}
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

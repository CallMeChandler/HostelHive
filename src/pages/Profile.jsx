import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth/authService";
import { updateProfile } from "../api/user";
import toast from "react-hot-toast";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [dirty, setDirty] = useState(false);
    const [pendingData, setPendingData] = useState({});

    useEffect(() => {
        const u = getCurrentUser();
        if (u) setUser(u);
    }, []);

    const handleBranchChange = (e) => {
        const newBranch = e.target.value;
        setUser({ ...user, branch: newBranch });
        setPendingData((prev) => ({ ...prev, branch: newBranch }));
        setDirty(true);
    };




    if (!user) return <div className="p-6 text-white">Loading...</div>;

    //Roll no, programme, batch scraping from email
    if (!user || !user.email) return <div className="p-6 text-white">Loading...</div>;

    const [, rollPart] = user.email.split("@");
    const rollMatch = user.email.match(/([a-zA-Z]+)(\d+)\.(\d{2})/i);
    const programme = rollMatch ? rollMatch[1].toUpperCase() : "–";
    const rollNum = rollMatch ? rollMatch[2] : "–";
    const batch = rollMatch ? `k${rollMatch[3]}` : "–";
    const fullRoll = `${programme}/${rollNum}/${batch.slice(-2)}`;
    { console.log("Dirty:", dirty, "Pending:", pendingData) }


    return (
        <div className="min-h-screen bg-[#0a0f0d] text-[#36fba1] p-8 flex flex-col items-center">
            {/* avatar + name */}
            <div className="flex flex-col items-center mb-8">
                <label htmlFor="avatar" className="cursor-pointer relative">
                    <img
                        src="https://api.dicebear.com/7.x/thumbs/svg?seed=egghead"
                        alt="avatar"
                        className="w-32 h-32 object-cover rounded-full border-2 border-[#36fba1]"
                    />


                </label>
                <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
            </div>

            {/* info grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                <InfoCard label="Email" value={user.email} />
                <InfoCard label="Roll No" value={fullRoll} />
                <InfoCard label="Programme" value={programme} />
                <InfoCard label="Batch" value={batch} />
                <InfoCard label="Hostel" value={user.hostel} />
                <InfoCard label="Room No" value={user.room} />

                {/* editable branch */}
                <div className="flex flex-col">
                    <label className="text-sm mb-1">Branch</label>
                    <input
                        value={user.branch || ""}
                        onChange={handleBranchChange}
                        placeholder="e.g., AIML"
                        className="bg-[#1c1f1e] border border-[#36fba144] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#36fba1]"
                    />
                </div>
            </div>
            {dirty && (
                <button
                    onClick={async () => {
                        try {
                            const updatedUser = await updateProfile(pendingData);
                            toast.success("Profile updated!");

                            localStorage.setItem("user", JSON.stringify(updatedUser.data)); // ✅ fix here
                            setUser(updatedUser.data);                                     // ✅ UI sync

                            setDirty(false);
                            setPendingData({});
                        } catch {
                            toast.error("Update failed.");
                        }
                    }}

                    className="mt-6 bg-[#36fba1] text-black px-6 py-2 rounded hover:bg-[#2ae79a] transition"
                >
                    Save Changes
                </button>

            )}
        </div>
    );
};

const InfoCard = ({ label, value }) => (
    <div className="bg-[#1c1f1e] border border-[#36fba122] rounded p-4">
        <p className="text-sm opacity-70">{label}</p>
        <p className="font-medium mt-1">{value}</p>
    </div>
);

export default Profile;
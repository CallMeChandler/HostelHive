import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth/authService";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const u = getCurrentUser();
        if (u) setUser(u);
    }, []);

    const handleBranchChange = (e) => {
        const updated = { ...user, branch: e.target.value };
        setUser(updated);
        localStorage.setItem("hostelhive-user", JSON.stringify(updated));
    };

    const handlePhoto = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const base64 = await fileToBase64(file);
        const updated = { ...user, profileImage: base64 };
        setUser(updated);
        localStorage.setItem("hostelhive-user", JSON.stringify(updated));
    };

    const fileToBase64 = (file) =>
        new Promise((res) => {
            const reader = new FileReader();
            reader.onloadend = () => res(reader.result);
            reader.readAsDataURL(file);
        });

    if (!user) return <div className="p-6 text-white">Loading...</div>;

    //Roll no, programme, batch scraping from email
    const [, rollPart] = user.email.split("@");
    const rollMatch = user.email.match(/([a-zA-Z]+)(\d+)\.(\d{2})/i);
    const programme = rollMatch ? rollMatch[1].toUpperCase() : "–";
    const rollNum = rollMatch ? rollMatch[2] : "–";
    const batch = rollMatch ? `20${rollMatch[3]}` : "–";
    const fullRoll = `${programme}/${rollNum}/${batch.slice(-2)}`;

    return (
        <div className="min-h-screen bg-[#0a0f0d] text-[#36fba1] p-8 flex flex-col items-center">
            {/* avatar + name */}
            <div className="flex flex-col items-center mb-8">
                <label htmlFor="avatar" className="cursor-pointer relative">
                    <img
                        src={
                            user.profileImage ||
                            "https://api.dicebear.com/6.x/identicon/svg?seed=HH"
                        }
                        alt="avatar"
                        className="w-32 h-32 object-cover rounded-full border-2 border-[#36fba1]"
                    />
                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto}
                        className="hidden"
                    />
                    <span className="absolute bottom-1 right-1 text-xs bg-[#36fba1] text-black px-1 rounded">
                        edit
                    </span>
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
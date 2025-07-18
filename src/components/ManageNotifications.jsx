import { useState } from "react";
import toast from "react-hot-toast";

const ManageNotifications = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !desc) {
            toast.error("Title and Description are required");
            return;
        }

        const notifications = JSON.parse(localStorage.getItem("hostelhive-notifications")) || [];

        const newNotif = {
            id: Date.now(),
            title,
            desc,
            pdf: file ? URL.createObjectURL(file) : null,
            timestamp: new Date().toISOString(),
            readBy: []
        };

        localStorage.setItem("hostelhive-notifications", JSON.stringify([newNotif, ...notifications]));
        toast.success("Notification posted!");
        setTitle("");
        setDesc("");
        setFile(null);
    };

    return (
        <div className="p-6 text-white min-h-screen bg-[#0a0f0d]">
            <h1 className="text-2xl font-bold mb-6">📢 Post Notification</h1>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <input
                    type="text"
                    placeholder="Notification Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 bg-[#1e1e1e] border border-[#36fba144] rounded text-[#36fba1]"
                />

                <textarea
                    placeholder="Enter notification description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full p-2 bg-[#1e1e1e] border border-[#36fba144] rounded text-[#36fba1]"
                />

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="text-sm"
                />

                <button
                    type="submit"
                    className="bg-[#36fba1] text-black px-4 py-2 rounded font-semibold hover:bg-[#2ae79a]"
                >
                    Post Notification
                </button>
            </form>
        </div>
    );
};

export default ManageNotifications;
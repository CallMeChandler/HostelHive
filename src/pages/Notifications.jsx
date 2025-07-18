import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth/authService";

const NOTIF_KEY = "hostelhive-notifications";

const Notifications = () => {
    const user = getCurrentUser();
    const [notifications, setNotifications] = useState([]);
    const [readIds, setReadIds] = useState([]);

    useEffect(() => {
        const all = JSON.parse(localStorage.getItem(NOTIF_KEY)) || [];
        const read = JSON.parse(localStorage.getItem(`read-notifications-${user.email}`)) || [];

        setNotifications(all.reverse()); // newest first
        setReadIds(read);

        // mark all as read
        localStorage.setItem(`read-notifications-${user.email}`, JSON.stringify(all.map(n => n.id)));
    }, []);

    const isUnread = (id) => !readIds.includes(id);

    return (
        <div className="min-h-screen bg-[#0a0f0d] text-[#36fba1] p-6">
            <h1 className="text-2xl font-bold mb-6">🔔 Notifications</h1>

            {notifications.length === 0 ? (
                <p className="text-gray-400 italic">No notifications yet.</p>
            ) : (
                <div className="space-y-4">
                    {notifications.map((n, i) => (
                        <div
                            key={n.id}
                            className={`border border-[#36fba144] rounded-lg p-4 bg-[#1c1f1e] ${isUnread(n.id) ? "border-l-4 border-l-[#36fba1]" : ""
                                }`}
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <div>
                                    <p className="font-semibold text-lg">{n.title}</p>
                                    <p className="text-sm text-[#bbbbbb]">{n.desc}</p>
                                </div>
                                {n.pdf && (
                                    <a
                                        href={n.pdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm underline text-[#36fba1] hover:text-white"
                                    >
                                        📄 View PDF
                                    </a>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 mt-2">{new Date(n.timestamp).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
const Dashboard = () => {
    return (
        <div className="p-8 text-[#36fba1] bg-[#0a0f0d] min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
            <div className="bg-[#1c1f1e] rounded-xl shadow-md border border-[#36fba122] p-6 max-w-xl">
                <h3 className="text-xl font-semibold mb-2">Welcome to HostelHive</h3>
                <p className="text-sm opacity-80">
                    View rooms, raise complaints, check mess menus and more.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;

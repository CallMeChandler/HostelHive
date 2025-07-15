import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DrawerSidebar from "./components/DrawerSidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Complaints  from "./pages/Complaints";
import AdminComplaints from './pages/AdminComplaints';
import Profile from "./pages/Profile";
import MyComplaints from "./pages/MyComplaints";
import MessMenu from "./pages/MessMenu";
import ManageComplaints from "./pages/ManageComplaints";
import SportsInventory from "./pages/SportsInventory";
import ManageUsers from "./pages/ManageUsers";
import { getCurrentUser } from "./auth/authService";


function App() {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Signup Route */}
      <Route path="/signup" element={<Signup />} />

      {/* Complaints Route */}
      <Route path="/complaints" element={<Complaints />} />

      {/* Profile Route */}
      <Route path="/profile" element={<Profile />} />

      {/* Login Route */}
      <Route path="/mess" element={<MessMenu />} />

      {/* Sports Route */}
      <Route path="/sports" element={<SportsInventory />} />
      
      {/* Complaint Dashboard Route */}
      <Route path="/my-complaints" element={<MyComplaints />} />

      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/manage-complaints" element={<ManageComplaints />} />
      <Route path="/admin-complaints" element={<AdminComplaints />} />


      {/* Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          getCurrentUser() ? 
            (<div className="flex h-screen bg-[#0a0f0d] text-[#36fba1]">
              <Sidebar />
              <DrawerSidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                  <Dashboard />
                </main>
              </div>
            </div>) : (
              <Navigate to="/login" />
            )
        }
      />

      {/* Redirect root (/) to /dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;

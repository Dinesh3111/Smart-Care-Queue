import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Bell,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate(); 

const handleLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRole");
  localStorage.removeItem("hospitalName");

  navigate("/login", { replace: true });
};
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl p-6 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-blue-700">
            🏥 Smart Care
          </h1>

          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-3">
          <button className="w-full flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-xl">
            <LayoutDashboard size={20} /> Dashboard
          </button>

          <button className="w-full flex items-center gap-3 text-gray-600 hover:bg-blue-50 px-4 py-3 rounded-xl">
            <CalendarDays size={20} /> Appointments
          </button>

          <button className="w-full flex items-center gap-3 text-gray-600 hover:bg-blue-50 px-4 py-3 rounded-xl">
            <Ticket size={20} /> Live Queue
          </button>

          <button className="w-full flex items-center gap-3 text-gray-600 hover:bg-blue-50 px-4 py-3 rounded-xl">
            <Bell size={20} /> Notifications
          </button>

          <button className="w-full flex items-center gap-3 text-gray-600 hover:bg-blue-50 px-4 py-3 rounded-xl">
            <User size={20} /> Profile
          </button>

          <button className="w-full flex items-center gap-3 text-gray-600 hover:bg-blue-50 px-4 py-3 rounded-xl">
            <Settings size={20} /> Settings
          </button>
        </nav>

       <button
  type="button"
  onClick={handleLogout}
  className="mt-20 w-full flex items-center gap-3 text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl"
>
  <LogOut size={20} />
  Logout
</button>
      </aside>

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40"
        ></div>
      )}
    </>
  );
}

export default Sidebar;
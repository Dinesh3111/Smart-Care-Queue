import { Bell, Menu, UserCircle } from "lucide-react";

function TopNavbar({ onMenuClick, userName }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex items-center justify-between mb-6">
      <button
        onClick={onMenuClick}
        className="bg-blue-50 text-blue-700 p-3 rounded-xl"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-5">
        <button className="relative text-gray-600 hover:text-blue-600">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        <div className="flex items-center gap-2">
          <UserCircle className="text-blue-600" size={30} />
          <span className="font-semibold text-gray-700">{userName}</span>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
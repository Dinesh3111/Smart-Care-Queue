import { CalendarPlus, Ticket, FileText, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();
  const actions = [

    {
      title: "Book Appointment",
      icon: <CalendarPlus size={28} />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Live Queue",
      icon: <Ticket size={28} />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "My History",
      icon: <FileText size={28} />,
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "My Profile",
      icon: <User size={28} />,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {actions.map((item, index) => (
         <button
  key={index}
  onClick={() => {
  if (item.title === "Book Appointment") {
    navigate("/book-appointment");
  }

  if (item.title === "My History") {
    navigate("/my-appointments");
  }
  if (item.title === "Live Queue") {
  navigate("/live-queue");
}
if (item.title === "My Profile") {
  navigate("/profile");
}
}}
  className="flex flex-col items-center justify-center p-6 rounded-2xl border hover:shadow-lg hover:scale-105 transition"
>
            <div className={`p-4 rounded-full ${item.color}`}>
              {item.icon}
            </div>

            <p className="mt-4 font-semibold text-gray-700">
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
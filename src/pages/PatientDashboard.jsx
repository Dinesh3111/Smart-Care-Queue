import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import TopNavbar from "../components/common/TopNavbar";
import StatCard from "../components/common/StatCard";
import AppointmentCard from "../components/patient/AppointmentCard";
import QuickActions from "../components/patient/QuickActions";

function PatientDashboard() {
  const patientName = "Dinesh";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-blue-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 p-6 md:p-10">
        <TopNavbar
          userName={patientName}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <h1 className="text-3xl font-bold text-blue-700">
          Welcome, {patientName} 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your appointments and live queue status here.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <StatCard title="Today's Token" value="21" subtitle="General Medicine" valueColor="text-blue-600" />
          <StatCard title="Current Queue" value="18" subtitle="3 patients before you" valueColor="text-green-600" />
          <StatCard title="Estimated Time" value="15m" subtitle="Approx waiting time" valueColor="text-orange-500" />
        </div>

        <AppointmentCard />
        <QuickActions />
      </main>
    </div>
  );
}

export default PatientDashboard;
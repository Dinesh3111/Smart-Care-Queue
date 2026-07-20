import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/common/Sidebar";
import TopNavbar from "../../components/common/TopNavbar";
import StatCard from "../../components/common/StatCard";
import AppointmentCard from "../../components/patient/AppointmentCard";
import QuickActions from "../../components/patient/QuickActions";

import {
  getActiveAppointment,
  getLoggedInPatientId,
} from "../../utils/patientStorage";

import {
  getAppointmentDayMessage,
  isAppointmentToday,
} from "../../utils/dateUtils";

function PatientDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const patientName =
    localStorage.getItem("userName") || "Patient";

  useEffect(() => {
    const loggedInPatientId = getLoggedInPatientId();

    if (!loggedInPatientId) {
      navigate("/login", { replace: true });
      return;
    }

    const appointment =
      getActiveAppointment(loggedInPatientId);

    setActiveAppointment(appointment);
    setIsLoading(false);
  }, [navigate]);

  const appointmentIsToday =
    activeAppointment
      ? isAppointmentToday(activeAppointment.date)
      : false;

  const appointmentMessage =
    activeAppointment
      ? getAppointmentDayMessage(activeAppointment.date)
      : "";

  const currentQueue = 18;

  const tokenValue = activeAppointment
    ? Number(
        String(activeAppointment.token).replace(/\D/g, "")
      ) || 0
    : 0;

  const patientsBeforeYou = Math.max(
    tokenValue - currentQueue,
    0
  );

  const estimatedTime = patientsBeforeYou * 5;

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

        <section>
          <h1 className="text-3xl font-bold text-blue-700">
            Welcome, {patientName} 👋
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your appointments and live queue status here.
          </p>
        </section>

        {isLoading ? (
          <div className="bg-white rounded-2xl shadow p-6 mt-8">
            <p className="text-gray-500">
              Loading appointment details...
            </p>
          </div>
        ) : activeAppointment && appointmentIsToday ? (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <StatCard
              title="Your Token"
              value={activeAppointment.token}
              subtitle={activeAppointment.department}
              valueColor="text-blue-600"
            />

            <StatCard
              title="Patients Before You"
              value={patientsBeforeYou}
              subtitle={`Current queue token: A${currentQueue}`}
              valueColor="text-green-600"
            />

            <StatCard
              title="Estimated Time"
              value={`${estimatedTime}m`}
              subtitle="Approximate waiting time"
              valueColor="text-orange-500"
            />
          </div>
        ) : activeAppointment ? (
          <div className="bg-white rounded-2xl shadow p-6 mt-8">
            <h2 className="text-xl font-bold text-blue-700">
              Upcoming Appointment
            </h2>

            <p className="text-gray-700 mt-3">
              {appointmentMessage}
            </p>

            <p className="text-gray-500 mt-2">
              Live queue and estimated waiting time will be
              available only on the appointment date.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800">
              No Active Appointment
            </h2>

            <p className="text-gray-500 mt-2">
              Book an appointment to view token and queue details.
            </p>
          </div>
        )}

        <AppointmentCard />
        <QuickActions />
      </main>
    </div>
  );
}

export default PatientDashboard;
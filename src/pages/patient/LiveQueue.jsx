import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getActiveAppointment,
  getLoggedInPatientId,
} from "../../utils/patientStorage";

const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const isAppointmentToday = (date) => {
  return date === getTodayDate();
};

const getAppointmentDayMessage = (date) => {
  if (!date) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const appointmentDate = new Date(`${date}T00:00:00`);
  appointmentDate.setHours(0, 0, 0, 0);

  const difference = appointmentDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  if (daysRemaining === 0) return "Your appointment is today";
  if (daysRemaining === 1) return "Your appointment is tomorrow";

  if (daysRemaining > 1) {
    return `Your appointment is in ${daysRemaining} days`;
  }

  return "Appointment date has passed";
};

function LiveQueue() {
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const patientId = getLoggedInPatientId();

    if (!patientId) {
      setAppointment(null);
      setIsLoading(false);
      return;
    }

    const activeAppointment = getActiveAppointment(patientId);

    setAppointment(activeAppointment);
    setIsLoading(false);
  }, []);

  const currentQueue = 18;

  const tokenValue = appointment
    ? Number(appointment.token.replace(/\D/g, "")) || 0
    : 0;

  const patientsBeforeYou = Math.max(
    tokenValue - currentQueue,
    0
  );

  const estimatedTime = patientsBeforeYou * 5;

  const progress =
    tokenValue > 0
      ? Math.min((currentQueue / tokenValue) * 100, 100)
      : 0;

  const appointmentIsToday =
    appointment &&
    isAppointmentToday(appointment.date);

  const appointmentMessage = appointment
    ? getAppointmentDayMessage(appointment.date)
    : "";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-gray-600">
          Loading queue details...
        </p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-blue-50 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => navigate("/patient-dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <h1 className="text-3xl font-bold text-blue-700">
              Live Queue Status
            </h1>

            <h2 className="text-xl font-bold text-gray-700 mt-10">
              No Active Appointment
            </h2>

            <p className="text-gray-500 mt-3">
              Book an appointment to track the live queue.
            </p>

            <button
              type="button"
              onClick={() => navigate("/book-appointment")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!appointmentIsToday) {
    return (
      <div className="min-h-screen bg-blue-50 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => navigate("/patient-dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <h1 className="text-3xl font-bold text-blue-700">
              Live Queue Status
            </h1>

            <h2 className="text-2xl font-bold text-blue-700 mt-10">
              {appointmentMessage}
            </h2>

            <p className="text-gray-500 mt-3">
              Live queue tracking will start on{" "}
              {appointment.date}.
            </p>

            <div className="bg-blue-50 rounded-2xl p-5 mt-6 text-left max-w-xl mx-auto">
              <p>
                <b>Hospital:</b> {appointment.hospital}
              </p>

              <p className="mt-2">
                <b>Doctor:</b> {appointment.doctor}
              </p>

              <p className="mt-2">
                <b>Department:</b>{" "}
                {appointment.department}
              </p>

              <p className="mt-2">
                <b>Appointment Time:</b>{" "}
                {appointment.time}
              </p>

              <p className="mt-2">
                <b>Token:</b> {appointment.token}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => navigate("/patient-dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Live Queue Status
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-blue-50 rounded-2xl p-6">
              <p className="text-gray-500">
                Current Queue Token
              </p>

              <h2 className="text-5xl font-bold text-blue-700 mt-2">
                A{currentQueue}
              </h2>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <p className="text-gray-500">
                Your Token
              </p>

              <h2 className="text-5xl font-bold text-green-700 mt-2">
                {appointment.token}
              </h2>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mt-6 space-y-3">
            <p>
              <b>Hospital:</b> {appointment.hospital}
            </p>

            <p>
              <b>Doctor:</b> {appointment.doctor}
            </p>

            <p>
              <b>Department:</b>{" "}
              {appointment.department}
            </p>

            <p>
              <b>Patients Before You:</b>{" "}
              {patientsBeforeYou}
            </p>

            <p>
              <b>Estimated Waiting Time:</b>{" "}
              {estimatedTime} minutes
            </p>
          </div>

          <div className="mt-7">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Queue Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveQueue;
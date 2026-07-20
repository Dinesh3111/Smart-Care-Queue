import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getActiveAppointment,
  getLoggedInPatientId,
} from "../../utils/patientStorage";

function AppointmentCard() {
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const patientId = getLoggedInPatientId();

    if (!patientId) {
      setAppointment(null);
      return;
    }

    const activeAppointment = getActiveAppointment(patientId);
    setAppointment(activeAppointment);
  }, []);

  if (!appointment) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold text-blue-700">
          Current Appointment
        </h2>

        <p className="text-gray-500 mt-3">
          No active appointment found.
        </p>

        <Link
          to="/book-appointment"
          className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Book Appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-2xl font-bold text-blue-700">
          Current Appointment
        </h2>

        <span className="w-fit bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          {appointment.status}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-gray-700 mt-5">
        <p>
          <b>Hospital:</b> {appointment.hospital}
        </p>

        <p>
          <b>Doctor:</b> {appointment.doctor}
        </p>

        <p>
          <b>Department:</b> {appointment.department}
        </p>

        <p>
          <b>Date:</b> {appointment.date}
        </p>

        <p>
          <b>Time:</b> {appointment.time}
        </p>

        <p>
          <b>Token:</b> {appointment.token}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <Link
          to="/live-queue"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          View Live Queue
        </Link>

        <Link
          to="/my-appointments"
          className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl"
        >
          View History
        </Link>
      </div>
    </div>
  );
}

export default AppointmentCard;
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getLoggedInPatientId,
  getPatientAppointments,
  updateAppointmentStatus,
} from "../../utils/patientStorage";

function MyAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState("");

  const loadAppointments = () => {
    const loggedInPatientId = getLoggedInPatientId();

    setPatientId(loggedInPatientId);

    const savedAppointments =
      getPatientAppointments(loggedInPatientId);

    setAppointments([...savedAppointments].reverse());
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleCancel = (appointmentId) => {
    const shouldCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!shouldCancel) return;

    updateAppointmentStatus(
      patientId,
      appointmentId,
      "Cancelled"
    );

    loadAppointments();
  };

  const getStatusClass = (status) => {
    if (status === "Confirmed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Waiting") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Completed") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8 md:px-6">
      <div className="max-w-6xl mx-auto">
        <button
          type="button"
          onClick={() => navigate("/patient-dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-700">
                My Appointment History
              </h1>

              <p className="text-gray-500 mt-2">
                Patient ID: {patientId || "Not available"}
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl px-5 py-4">
              <p className="text-sm text-gray-500">
                Total Bookings
              </p>

              <p className="text-3xl font-bold text-blue-700">
                {appointments.length}
              </p>
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-14">
              <CalendarDays
                size={52}
                className="text-gray-300 mx-auto"
              />

              <p className="text-gray-500 mt-4">
                No appointments found for this patient.
              </p>

              <button
                type="button"
                onClick={() => navigate("/book-appointment")}
                className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                Book Appointment
              </button>
              <button
  onClick={() =>
    navigate(`/appointment-details/${appointment.id}`)
  }
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
  View Details
</button>
            </div>
          ) : (
            <div className="space-y-5">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Token Number
                      </p>

                      <h2 className="text-2xl font-bold text-blue-700">
                        {appointment.token}
                      </h2>
                    </div>

                    <span
                      className={`w-fit px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <span
  className={
    appointment.status === "Confirmed"
      ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
      : appointment.status === "Cancelled"
      ? "bg-red-100 text-red-700 px-3 py-1 rounded-full"
      : "bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
  }
>
  {appointment.status}
</span>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 text-gray-700">
                    <p>
                      <b>Hospital:</b> {appointment.hospital}
                    </p>

                    <p>
                      <b>Department:</b>{" "}
                      {appointment.department}
                    </p>

                    <p>
                      <b>Doctor:</b> {appointment.doctor}
                    </p>

                    <p>
                      <b>Date:</b> {appointment.date}
                    </p>

                    <p>
                      <b>Time:</b> {appointment.time}
                    </p>

                    <p>
                      <b>Booked On:</b>{" "}
                      {appointment.bookedAt
                        ? new Date(
                            appointment.bookedAt
                          ).toLocaleString()
                        : "-"}
                    </p>
                  </div>

                  {(appointment.status === "Confirmed" ||
                    appointment.status === "Waiting") && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCancel(appointment.id)
                      }
                      className="mt-5 flex items-center gap-2 border border-red-500 text-red-600 hover:bg-red-50 px-5 py-2.5 rounded-xl"
                    >
                      <XCircle size={19} />
                      Cancel Appointment
                    </button>
                    
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;
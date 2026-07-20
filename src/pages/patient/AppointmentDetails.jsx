import { useEffect, useState } from "react";
import { ArrowLeft, Download, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  cancelPatientAppointment,
  getCurrentPatientAppointments,
  getCurrentPatientName,
} from "../../services/patientService";

function AppointmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const patientName = getCurrentPatientName();
  const patientId = localStorage.getItem("userId") || "-";

  useEffect(() => {
    const appointments = getCurrentPatientAppointments();

    const selectedAppointment = appointments.find(
      (item) => item.id === id
    );

    setAppointment(selectedAppointment || null);
    setIsLoading(false);
  }, [id]);

  const handleCancel = () => {
    if (!appointment) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) return;

    const cancelled = cancelPatientAppointment(
      appointment.id
    );

    if (cancelled) {
      setAppointment((current) => ({
        ...current,
        status: "Cancelled",
      }));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-gray-600">
          Loading appointment details...
        </p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-blue-50 px-6 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Appointment Not Found
          </h1>

          <button
            type="button"
            onClick={() => navigate("/my-appointments")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Back to History
          </button>
        </div>
      </div>
    );
  }

  const statusClass =
    appointment.status === "Confirmed"
      ? "bg-green-100 text-green-700"
      : appointment.status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : appointment.status === "Completed"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => navigate("/my-appointments")}
          className="print:hidden flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={20} />
          Back to History
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-blue-700 text-white p-8">
            <h1 className="text-3xl font-bold">
              Smart Care Queue
            </h1>

            <p className="text-blue-100 mt-2">
              Appointment Details
            </p>
          </div>

          <div className="p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Token Number
                </p>

                <h2 className="text-4xl font-bold text-blue-700">
                  {appointment.token}
                </h2>
              </div>

              <span
                className={`w-fit px-4 py-2 rounded-full font-semibold ${statusClass}`}
              >
                {appointment.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <DetailItem
                label="Patient Name"
                value={patientName}
              />

              <DetailItem
                label="Patient ID"
                value={patientId}
              />

              <DetailItem
                label="Hospital"
                value={appointment.hospital}
              />

              <DetailItem
                label="Department"
                value={appointment.department}
              />

              <DetailItem
                label="Doctor"
                value={appointment.doctor}
              />

              <DetailItem
                label="Appointment Date"
                value={appointment.date}
              />

              <DetailItem
                label="Appointment Time"
                value={appointment.time}
              />

              <DetailItem
                label="Appointment ID"
                value={appointment.id}
              />

              <DetailItem
                label="Booked On"
                value={
                  appointment.bookedAt
                    ? new Date(
                        appointment.bookedAt
                      ).toLocaleString()
                    : "-"
                }
              />
            </div>

            <div className="print:hidden flex flex-wrap gap-3 mt-8">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                <Download size={19} />
                Download / Print Slip
              </button>

              {(appointment.status === "Confirmed" ||
                appointment.status === "Waiting") && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 border border-red-500 text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl"
                >
                  <XCircle size={19} />
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold text-gray-800 mt-1 break-words">
        {value || "-"}
      </p>
    </div>
  );
}

export default AppointmentDetails;
import { useState } from "react";
import { hospitals } from "../../data/hospitalData";
import SuccessModal from "../../components/common/SuccessModal";
import { useNavigate } from "react-router-dom";
import {
  getLoggedInPatientId,
  savePatientAppointment,
} from "../../utils/patientStorage";

function BookAppointment() {
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [tokenNumber, setTokenNumber] = useState("");
  const [appointment, setAppointment] = useState(null);
  const navigate = useNavigate();

  const hospital = hospitals.find((item) => item.name === selectedHospital);
  const department = hospital?.departments.find(
    (item) => item.name === selectedDepartment
  );

 const handleConfirm = () => {
  if (
    !selectedHospital ||
    !selectedDepartment ||
    !selectedDoctor ||
    !selectedDate ||
    !selectedTime
  ) {
    alert("Please fill all fields");
    return;
  }

  const patientId = getLoggedInPatientId();

  if (!patientId) {
    alert("Please login again");
    navigate("/login");
    return;
  }

  const randomToken =
    "A" + Math.floor(100 + Math.random() * 900);

  const newAppointment = {
    id: crypto.randomUUID(),
    patientId,
    hospital: selectedHospital,
    department: selectedDepartment,
    doctor: selectedDoctor,
    date: selectedDate,
    time: selectedTime,
    token: randomToken,
    status: "Confirmed",
    bookedAt: new Date().toISOString(),
  };

  savePatientAppointment(patientId, newAppointment);

  setAppointment(newAppointment);
  setTokenNumber(randomToken);
  setShowSuccess(true);
};
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          Book Appointment
        </h1>

        <label className="block mb-2 font-medium">Hospital *</label>
        <select
          value={selectedHospital}
          onChange={(e) => {
            setSelectedHospital(e.target.value);
            setSelectedDepartment("");
            setSelectedDoctor("");
          }}
          className="w-full border rounded-xl px-4 py-3 mb-5"
        >
          <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.id} value={hospital.name}>
              {hospital.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Department *</label>
        <select
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value);
            setSelectedDoctor("");
          }}
          className="w-full border rounded-xl px-4 py-3 mb-5"
        >
          <option value="">Select Department</option>
          {hospital?.departments.map((dept) => (
            <option key={dept.name} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Doctor *</label>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-5"
        >
          <option value="">Select Doctor</option>
          {department?.doctors.map((doctor) => (
            <option key={doctor} value={doctor}>
              {doctor}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Appointment Date *</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-5"
        />

        <label className="block mb-3 font-medium">Available Time Slots *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"].map(
            (time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`border rounded-xl py-3 font-medium ${
                  selectedTime === time
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                {time}
              </button>
            )
          )}
        </div>

        {selectedHospital &&
          selectedDepartment &&
          selectedDoctor &&
          selectedDate &&
          selectedTime && (
            <div className="bg-blue-50 rounded-2xl p-5 mb-6">
              <h2 className="text-xl font-bold text-blue-700 mb-4">
                Appointment Summary
              </h2>
              <p><b>Hospital:</b> {selectedHospital}</p>
              <p><b>Department:</b> {selectedDepartment}</p>
              <p><b>Doctor:</b> {selectedDoctor}</p>
              <p><b>Date:</b> {selectedDate}</p>
              <p><b>Time:</b> {selectedTime}</p>
            </div>
          )}

        <button
          onClick={handleConfirm}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Confirm Appointment
        </button>
      </div>
<SuccessModal
  isOpen={showSuccess}
  onClose={() => {
    setShowSuccess(false);
    navigate("/patient-dashboard");
  }}
  appointment={appointment}
/>
    </div>
  );
}

export default BookAppointment; 
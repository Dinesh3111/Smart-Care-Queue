import { CheckCircle } from "lucide-react";

function SuccessModal({ isOpen, onClose, appointment }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <CheckCircle size={60} className="text-green-600 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800">
          Appointment Confirmed
        </h2>

        <p className="text-gray-500 mt-2">
          Your appointment has been booked successfully.
        </p>

        <div className="bg-blue-50 rounded-2xl p-5 mt-6 text-left space-y-2">
          <p><b>Hospital:</b> {appointment?.hospital}</p>
          <p><b>Department:</b> {appointment?.department}</p>
          <p><b>Doctor:</b> {appointment?.doctor}</p>
          <p><b>Date:</b> {appointment?.date}</p>
          <p><b>Time:</b> {appointment?.time}</p>
          <p><b>Status:</b> {appointment?.status}</p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-5 mt-5">
          <p className="text-sm">Token Number</p>
          <h1 className="text-4xl font-bold mt-2">{appointment?.token}</h1>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
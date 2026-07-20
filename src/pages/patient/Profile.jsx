import { useEffect, useState } from "react";
import { ArrowLeft, Edit3, Phone, Mail, MapPin, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getLoggedInPatientId,
  getPatientProfile,
} from "../../utils/patientStorage";
function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
    age: "",
    bloodGroup: "",
    address: "",
  });

  useEffect(() => {
  const patientId = getLoggedInPatientId();
  const savedName =
    localStorage.getItem("userName") || "Patient";

  const savedProfile = getPatientProfile(patientId);

  if (savedProfile) {
    setProfile(savedProfile);
  } else {
    setProfile((current) => ({
      ...current,
      name: savedName,
    }));
  }
}, []);

  const firstLetter = profile.name
    ? profile.name.charAt(0).toUpperCase()
    : "P";

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

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white text-blue-700 flex items-center justify-center text-4xl font-bold shadow-lg">
                {firstLetter}
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {profile.name || "Patient"}
                </h1>

                <p className="text-blue-100 mt-1">
                  Smart Care Queue Patient
                </p>

                <p className="text-sm text-blue-100 mt-2">
                  Patient ID: PT1001
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Phone size={19} />
                  Mobile Number
                </div>

                <p className="font-semibold text-gray-800">
                  {profile.mobile || "Not added"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Mail size={19} />
                  Email Address
                </div>

                <p className="font-semibold text-gray-800">
                  {profile.email || "Not added"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Droplets size={19} />
                  Blood Group
                </div>

                <p className="font-semibold text-gray-800">
                  {profile.bloodGroup || "Not added"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-gray-500 mb-2">Age</p>

                <p className="font-semibold text-gray-800">
                  {profile.age || "Not added"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 md:col-span-2">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <MapPin size={19} />
                  Address
                </div>

                <p className="font-semibold text-gray-800">
                  {profile.address || "Not added"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/edit-profile")}
              className="mt-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Edit3 size={19} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
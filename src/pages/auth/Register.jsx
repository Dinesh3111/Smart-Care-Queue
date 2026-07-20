import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Stethoscope, Building2, ArrowLeft } from "lucide-react";

function Register() {
  const [role, setRole] = useState("");

  const [fullName, setFullName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [department, setDepartment] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const resetForm = () => {
    setFullName("");
    setDoctorId("");
    setHospitalName("");
    setDepartment("");
    setMobile("");
    setUsername("");
    setStaffId("");
    setPassword("");
    setError("");
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    resetForm();
  };

  const handleRegister = () => {
    setError("");

    if (role === "Patient") {
      if (!fullName || !mobile || !username || !password) {
        setError("All fields are required");
        return;
      }
    }

    if (role === "Doctor") {
      if (!fullName || !doctorId || !hospitalName || !department || !password) {
        setError("All fields are required");
        return;
      }
    }

    if (role === "Receptionist / Admin") {
      if (!hospitalName || !staffId || !password) {
        setError("All fields are required");
        return;
      }
    }

    console.log({ role, fullName, doctorId, hospitalName, department, mobile, username, staffId, password });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-700">Create Account</h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          {role ? `${role} Registration` : "Choose your account type"}
        </p>

        {!role && (
          <div className="space-y-4">
            <button onClick={() => handleRoleSelect("Patient")} className="w-full flex items-center gap-4 border rounded-2xl p-5 hover:border-blue-600 hover:bg-blue-50">
              <User className="text-blue-600" size={32} />
              <div className="text-left">
                <h2 className="font-bold">Patient</h2>
                <p className="text-sm text-gray-500">Book tokens and track queue</p>
              </div>
            </button>

            <button onClick={() => handleRoleSelect("Doctor")} className="w-full flex items-center gap-4 border rounded-2xl p-5 hover:border-blue-600 hover:bg-blue-50">
              <Stethoscope className="text-blue-600" size={32} />
              <div className="text-left">
                <h2 className="font-bold">Doctor</h2>
                <p className="text-sm text-gray-500">Manage patient consultations</p>
              </div>
            </button>

            <button onClick={() => handleRoleSelect("Receptionist / Admin")} className="w-full flex items-center gap-4 border rounded-2xl p-5 hover:border-blue-600 hover:bg-blue-50">
              <Building2 className="text-blue-600" size={32} />
              <div className="text-left">
                <h2 className="font-bold">Receptionist / Admin</h2>
                <p className="text-sm text-gray-500">Manage hospital queue system</p>
              </div>
            </button>
          </div>
        )}

        {role && (
          <>
            <button onClick={() => setRole("")} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6">
              <ArrowLeft size={18} />
              Back
            </button>

            {role === "Patient" && (
              <>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name *" className="w-full border rounded-xl px-4 py-3 mb-4" />
                <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number *" className="w-full border rounded-xl px-4 py-3 mb-4" />
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username *" className="w-full border rounded-xl px-4 py-3 mb-4" />
              </>
            )}

            {role === "Doctor" && (
              <>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Doctor Name *" className="w-full border rounded-xl px-4 py-3 mb-4" />
                <input value={doctorId} onChange={(e) => setDoctorId(e.target.value)} placeholder="Doctor ID *" className="w-full border rounded-xl px-4 py-3 mb-4" />
                <input value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} placeholder="Hospital Name *" className="w-full border rounded-xl px-4 py-3 mb-4" />
                <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department *" className="w-full border rounded-xl px-4 py-3 mb-4" />
              </>
            )}

            {role === "Receptionist / Admin" && (
              <>
                <input value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} placeholder="Hospital Name *" className="w-full border rounded-xl px-4 py-3 mb-4" />
                <input value={staffId} onChange={(e) => setStaffId(e.target.value)} placeholder="Staff / Admin ID *" className="w-full border rounded-xl px-4 py-3 mb-4" />
              </>
            )}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password *"
              className="w-full border rounded-xl px-4 py-3 mb-4"
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button onClick={handleRegister} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
              Register
            </button>
          </>
        )}

        {!role && (
          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
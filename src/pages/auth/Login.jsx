import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Stethoscope,
  Building2,
  ArrowLeft,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loginId, setLoginId] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [password, setPassword] = useState("");

  const [loginIdError, setLoginIdError] = useState("");
  const [hospitalError, setHospitalError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const roleDetails = {
    patient: {
      title: "Patient Login",
      idLabel: "Username / Mobile Number",
      idPlaceholder: "Enter username or mobile number",
    },
    doctor: {
      title: "Doctor Login",
      idLabel: "Doctor ID",
      idPlaceholder: "Enter doctor ID",
    },
    receptionist: {
      title: "Receptionist / Admin Login",
      idLabel: "Staff / Admin ID",
      idPlaceholder: "Enter staff or admin ID",
    },
  };

  const resetForm = () => {
    setLoginId("");
    setHospitalName("");
    setPassword("");

    setLoginIdError("");
    setHospitalError("");
    setPasswordError("");

    setShowPassword(false);
  };

  const handleRoleSelect = (selectedRole) => {
    resetForm();
    setRole(selectedRole);
  };

  const handleBack = () => {
    resetForm();
    setRole("");
  };

  const handleLogin = () => {
  let isValid = true;

  setLoginIdError("");
  setHospitalError("");
  setPasswordError("");

  if (
    (role === "doctor" || role === "receptionist") &&
    hospitalName.trim() === ""
  ) {
    setHospitalError("Hospital name is required");
    isValid = false;
  }

  if (loginId.trim() === "") {
    setLoginIdError(`${roleDetails[role].idLabel} is required`);
    isValid = false;
  }

  if (password.trim() === "") {
    setPasswordError("Password is required");
    isValid = false;
  }

  if (!isValid) return;

  localStorage.setItem("userName", loginId.trim());
  localStorage.setItem("userRole", role);

  console.log("Saved Username:", localStorage.getItem("userName"));

  if (role === "patient") {
    navigate("/patient-dashboard");
    return;
  }

  if (role === "doctor") {
    navigate("/doctor-dashboard");
    return;
  }

  if (role === "receptionist") {
    navigate("/reception-dashboard");
  }
};
const normalizedUserId = loginId.trim().toLowerCase();

localStorage.setItem("userId", normalizedUserId);
localStorage.setItem("userName", loginId.trim());
localStorage.setItem("userRole", role);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6 py-8">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Smart Care Queue
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          {role ? roleDetails[role].title : "Choose your login role"}
        </p>

        {!role && (
          <>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => handleRoleSelect("patient")}
                className="w-full flex items-center gap-4 border border-gray-200 rounded-2xl p-5 hover:border-blue-600 hover:bg-blue-50 transition"
              >
                <User className="text-blue-600" size={32} />

                <div className="text-left">
                  <h2 className="font-bold text-gray-800">
                    Patient
                  </h2>

                  <p className="text-sm text-gray-500">
                    Book appointments and track your queue.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect("doctor")}
                className="w-full flex items-center gap-4 border border-gray-200 rounded-2xl p-5 hover:border-blue-600 hover:bg-blue-50 transition"
              >
                <Stethoscope className="text-blue-600" size={32} />

                <div className="text-left">
                  <h2 className="font-bold text-gray-800">
                    Doctor
                  </h2>

                  <p className="text-sm text-gray-500">
                    Manage assigned patients and consultations.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect("receptionist")}
                className="w-full flex items-center gap-4 border border-gray-200 rounded-2xl p-5 hover:border-blue-600 hover:bg-blue-50 transition"
              >
                <Building2 className="text-blue-600" size={32} />

                <div className="text-left">
                  <h2 className="font-bold text-gray-800">
                    Receptionist / Admin
                  </h2>

                  <p className="text-sm text-gray-500">
                    Manage hospital staff, tokens and queues.
                  </p>
                </div>
              </button>
            </div>

            <p className="text-center text-gray-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Create a new account
              </Link>
            </p>
          </>
        )}

        {role && (
          <>
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            {(role === "doctor" || role === "receptionist") && (
              <>
                <label className="block text-gray-700 font-medium mb-2">
                  Hospital Name
                  <span className="text-red-500"> *</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter hospital name"
                  value={hospitalName}
                  onChange={(event) =>
                    setHospitalName(event.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
                />

                {hospitalError && (
                  <p className="text-red-500 text-sm mt-2 mb-4">
                    {hospitalError}
                  </p>
                )}
              </>
            )}

            <label className="block text-gray-700 font-medium mb-2 mt-4">
              {roleDetails[role].idLabel}
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="text"
              placeholder={roleDetails[role].idPlaceholder}
              value={loginId}
              onChange={(event) =>
                setLoginId(event.target.value)
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />

            {loginIdError && (
              <p className="text-red-500 text-sm mt-2 mb-4">
                {loginIdError}
              </p>
            )}

            <label className="block text-gray-700 font-medium mb-2 mt-4">
              Password
              <span className="text-red-500"> *</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((currentValue) => !currentValue)
                }
                className="absolute right-4 top-3 text-gray-500 hover:text-blue-600"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm mt-2 mb-4">
                {passwordError}
              </p>
            )}

           <button
  type="button"
  onClick={handleLogin}
  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
>
  Login
</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
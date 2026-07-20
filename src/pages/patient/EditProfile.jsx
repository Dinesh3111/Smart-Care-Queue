import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLoggedInPatientId,
  getPatientProfile,
  savePatientProfile,
} from "../../utils/patientStorage";
function EditProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState(
    localStorage.getItem("userName") || ""
  );

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (
      !name.trim() ||
      !mobile.trim() ||
      !email.trim() ||
      !bloodGroup ||
      !address.trim()
    ) {
      setError("All fields are required");
      return;
    }

    const profile = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      bloodGroup,
      address: address.trim(),
    };

    localStorage.setItem(
      "patientProfile",
      JSON.stringify(profile)
    );

    localStorage.setItem("userName", name.trim());

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-blue-700">
          Edit Profile
        </h1>

        <p className="mb-8 mt-2 text-gray-500">
          Update your personal information.
        </p>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Full Name *
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Mobile Number *
            </label>

            <input
              type="text"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email Address *
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Blood Group *
            </label>

            <select
              value={bloodGroup}
              onChange={(event) =>
                setBloodGroup(event.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Address *
            </label>

            <textarea
              rows={4}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {error && (
          <p className="mt-5 text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="rounded-xl border border-gray-300 px-6 py-3"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
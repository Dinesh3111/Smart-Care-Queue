import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import PatientDashboard from "../pages/patient/Dashboard";
import BookAppointment from "../pages/patient/BookAppointment";
import MyAppointments from "../pages/patient/MyAppointments";
import LiveQueue from "../pages/patient/LiveQueue";
import Profile from "../pages/patient/Profile";
import EditProfile from "../pages/patient/EditProfile";
import ProtectedRoute from "./ProtectedRoute";
import AppointmentDetails from "../pages/patient/AppointmentDetails";
 
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/patient-dashboard"
          element={<PatientDashboard />}
        />

        <Route
          path="/book-appointment"
          element={<BookAppointment />}
        />

        <Route
          path="/my-appointments"
          element={<MyAppointments />}
        />

        <Route
          path="/live-queue"
          element={<LiveQueue />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />
      </Routes>
      <Route element={<ProtectedRoute allowedRole="patient" />}>
  <Route
    path="/patient-dashboard"
    element={<PatientDashboard />}
  />

  <Route
    path="/book-appointment"
    element={<BookAppointment />}
  />

  <Route
    path="/my-appointments"
    element={<MyAppointments />}
  />

  <Route
    path="/live-queue"
    element={<LiveQueue />}
  />

  <Route
    path="/profile"
    element={<Profile />}
  />

  <Route
    path="/edit-profile"
    element={<EditProfile />}
  />
  <Route
  path="/appointment-details/:id"
  element={<AppointmentDetails />}
/>
</Route>
    </BrowserRouter>
  );
}

export default AppRoutes;
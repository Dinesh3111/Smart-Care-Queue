import {
  getActiveAppointment,
  getLoggedInPatientId,
  getPatientAppointments,
  getPatientProfile,
  savePatientAppointment,
  savePatientProfile,
  updateAppointmentStatus,
} from "../utils/patientStorage";

export function getCurrentPatientId() {
  return getLoggedInPatientId();
}

export function getCurrentPatientName() {
  return localStorage.getItem("userName") || "Patient";
}

export function getCurrentPatientRole() {
  return localStorage.getItem("userRole") || "";
}

export function getCurrentPatientProfile() {
  const patientId = getCurrentPatientId();

  if (!patientId) {
    return null;
  }

  return getPatientProfile(patientId);
}

export function saveCurrentPatientProfile(profile) {
  const patientId = getCurrentPatientId();

  if (!patientId || !profile) {
    return false;
  }

  const saved = savePatientProfile(patientId, profile);

  if (saved && profile.name) {
    localStorage.setItem("userName", profile.name.trim());
  }

  return saved;
}

export function getCurrentPatientAppointments() {
  const patientId = getCurrentPatientId();

  if (!patientId) {
    return [];
  }

  return getPatientAppointments(patientId);
}

export function getCurrentActiveAppointment() {
  const patientId = getCurrentPatientId();

  if (!patientId) {
    return null;
  }

  return getActiveAppointment(patientId);
}

export function createPatientAppointment(appointmentData) {
  const patientId = getCurrentPatientId();

  if (!patientId || !appointmentData) {
    return null;
  }

  const appointment = {
    id: crypto.randomUUID(),
    patientId,
    hospital: appointmentData.hospital,
    department: appointmentData.department,
    doctor: appointmentData.doctor,
    date: appointmentData.date,
    time: appointmentData.time,
    token: appointmentData.token,
    status: "Confirmed",
    bookedAt: new Date().toISOString(),
  };

  savePatientAppointment(patientId, appointment);

  return appointment;
}

export function cancelPatientAppointment(appointmentId) {
  const patientId = getCurrentPatientId();

  if (!patientId || !appointmentId) {
    return false;
  }

  return updateAppointmentStatus(
    patientId,
    appointmentId,
    "Cancelled"
  );
}

export function completePatientAppointment(appointmentId) {
  const patientId = getCurrentPatientId();

  if (!patientId || !appointmentId) {
    return false;
  }

  return updateAppointmentStatus(
    patientId,
    appointmentId,
    "Completed"
  );
}

export function clearPatientSession() {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRole");
  localStorage.removeItem("hospitalName");
}
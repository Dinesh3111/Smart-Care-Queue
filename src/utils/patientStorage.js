export function getLoggedInPatientId() {
  return localStorage.getItem("userId") || "";
}

export function getPatientAppointments(patientId) {
  if (!patientId) return [];

  const savedData = localStorage.getItem(
    `appointments_${patientId}`
  );

  if (!savedData) return [];

  try {
    const appointments = JSON.parse(savedData);
    return Array.isArray(appointments) ? appointments : [];
  } catch (error) {
    console.error("Unable to read appointments:", error);
    return [];
  }
}

export function savePatientAppointment(
  patientId,
  appointment
) {
  if (!patientId || !appointment) return;

  const appointments =
    getPatientAppointments(patientId);

  const updatedAppointments = [
    ...appointments,
    appointment,
  ];

  localStorage.setItem(
    `appointments_${patientId}`,
    JSON.stringify(updatedAppointments)
  );
}

export function getActiveAppointment(patientId) {
  const appointments =
    getPatientAppointments(patientId);

  return (
    [...appointments]
      .reverse()
      .find(
        (appointment) =>
          appointment.status === "Confirmed" ||
          appointment.status === "Waiting"
      ) || null
  );
}

export function updateAppointmentStatus(
  patientId,
  appointmentId,
  newStatus
) {
  if (!patientId || !appointmentId) {
    return false;
  }

  const appointments =
    getPatientAppointments(patientId);

  const updatedAppointments = appointments.map(
    (appointment) =>
      appointment.id === appointmentId
        ? {
            ...appointment,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          }
        : appointment
  );

  localStorage.setItem(
    `appointments_${patientId}`,
    JSON.stringify(updatedAppointments)
  );

  return true;
}

export function getPatientProfile(patientId) {
  if (!patientId) return null;

  const savedProfile = localStorage.getItem(
    `profile_${patientId}`
  );

  if (!savedProfile) return null;

  try {
    return JSON.parse(savedProfile);
  } catch (error) {
    console.error("Unable to read profile:", error);
    return null;
  }
}

export function savePatientProfile(
  patientId,
  profile
) {
  if (!patientId || !profile) return false;

  localStorage.setItem(
    `profile_${patientId}`,
    JSON.stringify(profile)
  );

  return true;
}
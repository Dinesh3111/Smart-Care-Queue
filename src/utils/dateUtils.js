export function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isAppointmentToday(date) {
  return date === getTodayDate();
}

export function getAppointmentDayMessage(date) {
  if (!date) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const appointmentDate = new Date(`${date}T00:00:00`);
  appointmentDate.setHours(0, 0, 0, 0);

  const difference =
    appointmentDate.getTime() - today.getTime();

  const daysRemaining = Math.round(
    difference / (1000 * 60 * 60 * 24)
  );

  if (daysRemaining === 0) {
    return "Your appointment is today";
  }

  if (daysRemaining === 1) {
    return "Your appointment is tomorrow";
  }

  if (daysRemaining > 1) {
    return `Your appointment is in ${daysRemaining} days`;
  }

  return "Appointment date has passed";
}
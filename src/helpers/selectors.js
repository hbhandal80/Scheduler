import DayList from "components/DayList";

export function getAppointmentsForDay(state, day) {
  const newDays = state.days.filter((element) => {
    return element.name === day;
  });
  let apts = [];
  if (newDays.length > 0) {
    apts = newDays[0].appointments.map((id) => {
      return state.appointments[id];
    });
  }
  return apts;
}

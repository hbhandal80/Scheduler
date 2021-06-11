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

export function getInterview(state, interview) {

};

export function getInterviewersForDay(state, day) {
 
};

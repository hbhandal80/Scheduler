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
  if (interview === null) {
    return null;
  }
  const interviewObj = {
    "student": interview.student,
    "interviewer": {
      "id": state.interviewers[interview.interviewer].id,
      "name": state.interviewers[interview.interviewer].name,
      "avatar": state.interviewers[interview.interviewer].avatar
    }
  }
  return interviewObj;

}

export function getInterviewersForDay(state, day) {
};
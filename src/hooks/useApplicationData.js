import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    const appointmentsURL = "http://localhost:8001/api/appointments";
    const interviewersURL = " http://localhost:8001/api/interviewers";

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  const setDay = day => setState({ ...state, day });

  function spotsRemaining(day, appointments) {
    const spots = day.appointments;
    let spotsAvailable = 0;
    for (let spot of spots) {
      if (!appointments[spot].interview) {
        spotsAvailable++;
      }
    }
    return spotsAvailable;
  }

  function getSpotsRemaining(days, appointments) {
    const updatedSpots = days.map(day => ({
      ...day,spots: spotsRemaining(day, appointments)
    }))
    return updatedSpots;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({ ...state, appointments, days: getSpotsRemaining(state.days, appointments) });
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({ ...prev, appointments, days: getSpotsRemaining(state.days, appointments) }));
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
  }
  return { setDay, bookInterview, cancelInterview, state }
}
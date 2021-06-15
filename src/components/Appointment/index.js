import React from 'react'

import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode'

import Header from 'components/Appointment/Header'
import Empty from 'components/Appointment/Empty'
import Show from 'components/Appointment/Show'
import Confirm from 'components/Appointment/Confirm'
import Form from './Form';
import Status from './Status';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  function deleteAppointment() {
    transition(CONFIRM);
  }

  function confirmDeleteAppointment() {
    transition(DELETING)
    props.cancelInterview(props.id);
    transition(EMPTY);
  }

  function edit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          bookInterview={props.bookInterview}
          onCancel={() => back()}
          onSave={save}
          onDelete={deleteAppointment}
        />
      }
      {mode === CONFIRM &&
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={confirmDeleteAppointment}
          onCancel={() => back()}
        />
      }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppointment}
          onEdit={edit}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving"}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />
      )}
      {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          bookInterview={props.bookInterview}
          onCancel={() => back()}
          onSave={save}
        />
      }
    </article>
  );
}
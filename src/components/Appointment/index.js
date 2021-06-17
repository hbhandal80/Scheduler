import React from 'react'

import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode'

import Header from 'components/Appointment/Header'
import Empty from 'components/Appointment/Empty'
import Show from 'components/Appointment/Show'
import Confirm from 'components/Appointment/Confirm'
import Form from './Form';
import Status from './Status';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    return props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  };

  function deleteAppointment() {
    transition(CONFIRM);
  }

  function confirmDeleteAppointment(event) {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }

  function edit() {
    transition(EDIT);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      }
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
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          bookInterview={props.bookInterview}
          onCancel={() => back()}
          onSave={save}
        />
      }
      {mode === ERROR_SAVE && (
        <Error
          message={"Cannot save appointment"}
          onClose={() => back(SHOW)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment"}
          onClose={() => back(SHOW)}
        />
      )}

    </article>
  );
}
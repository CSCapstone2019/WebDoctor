import axios from 'axios';
import { createMessage, returnErrors } from './errorMsg';
import { tokenConfig } from './auth';

import { GET_APPOINTMENTS, DELETE_APPOINTMENT, ADD_APPOINTMENT } from './types';

// GET APPOINTMENTS
export const getAppointments = () => (dispatch, getState) => {
  axios
    .get('http://127.0.0.1:8000/api/appointment/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_APPOINTMENTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteAppointment = id => (dispatch, getState) => {
  axios
    .delete(
      `http://127.0.0.1:8000/api/appointment/${id}`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ deleteAppointment: 'Appointment Deleted' }));
      dispatch({
        type: DELETE_APPOINTMENT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD APPOINTMENT
export const addAppointment = appointment => (dispatch, getState) => {
  axios
    .post(
      'http://127.0.0.1:8000/api/appointment/',
      appointment,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ addAppointment: 'Appointment Added' }));
      dispatch({
        type: ADD_APPOINTMENT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

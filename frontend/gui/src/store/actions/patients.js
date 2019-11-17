import axios from 'axios';
import { createMessage } from './errorMsg';

import { GET_PATIENTS, DELETE_PATIENT, ADD_PATIENT, GET_ERRORS } from './types';

// GET PATIENTS
export const getPatients = () => dispatch => {
  axios
    .get('http://127.0.0.1:8000/api/patient/')
    .then(res => {
      dispatch({
        type: GET_PATIENTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// DELETE PATIENT
export const deletePatient = id => dispatch => {
  axios
    .delete(`http://127.0.0.1:8000/api/patient/${id}/`)
    .then(res => {
      dispatch(createMessage({ deletePatient: 'Patient Deleted' }));
      dispatch({
        type: DELETE_PATIENT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD PATIENT
export const addPatient = patient => dispatch => {
  axios
    .post('http://127.0.0.1:8000/api/patient/', patient)
    .then(res => {
      dispatch(createMessage({ addPatient: 'Patient Added' }));
      dispatch({
        type: ADD_PATIENT,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

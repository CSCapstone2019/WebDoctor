import axios from 'axios';
import { createMessage, returnErrors } from './errorMsg';
import { tokenConfig } from './auth';

import { GET_PATIENTS, DELETE_PATIENT, ADD_PATIENT } from './types';

// GET PATIENTS
export const getPatients = () => (dispatch, getState) => {
  axios
    .get('http://127.0.0.1:8000/api/patient/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PATIENTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE PATIENT
export const deletePatient = id => (dispatch, getState) => {
  axios
    .delete(`http://127.0.0.1:8000/api/patient/${id}/`, tokenConfig(getState))
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
export const addPatient = patient => (dispatch, getState) => {
  axios
    .post('http://127.0.0.1:8000/api/patient/', patient, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addPatient: 'Patient Added' }));
      dispatch({
        type: ADD_PATIENT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

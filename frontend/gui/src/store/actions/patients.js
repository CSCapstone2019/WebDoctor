import axios from 'axios';
import { createMessage, returnErrors } from './errorMsg';
import { tokenConfig } from './auth';

import { GET_PATIENTS, DELETE_PATIENT, ADD_PATIENT, GET_ALL_PATIENTS, GET_STAFF } from './types';

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

// UPDATE PATIENT
export const updatePatient = id => (dispatch, getState) => {
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

// GET STAFF
export const getStaff = () => (dispatch, getState) => {
  axios
    .get('http://127.0.0.1:8000/api/staff/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_STAFF,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET ALL PATIENTS
export const getAllPatients = () => (dispatch, getState) => {
  axios
    .get('http://127.0.0.1:8000/api/patients/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALL_PATIENTS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
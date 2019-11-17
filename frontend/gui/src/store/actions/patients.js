import axios from 'axios';

import { GET_PATIENTS, DELETE_PATIENT } from './types';

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
      dispatch({
        type: DELETE_PATIENT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

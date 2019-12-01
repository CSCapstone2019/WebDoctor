import axios from 'axios';
import * as actionTypes from './types';
import { tokenConfig } from "./auth";


const getUserReportSuccess = reports => {
  return {
    type: actionTypes.GET_REPORT_SUCCESS,
    reports: reports
  };
};

export const getUserReport = (username) => {
  return dispatch => {
    axios
      .get(`http://127.0.0.1:8000/chat/report/?username=${username}`)
      .then(res => {
        console.log("GET REPORTS:::", res.data);
        dispatch(getUserReportSuccess(res.data));
      })

  };
};



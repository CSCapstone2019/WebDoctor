import axios from 'axios';
import * as actionTypes from './types';
import { tokenConfig } from "./auth";


// export const addSchedule = schedule => {
//   return {
//     type: actionTypes.ADD_SCHEDULE,
//     schedule: schedule
//   };
// };

const getUserScheduleSuccess = schedules => {
  return {
    type: actionTypes.GET_SCHEDULE_SUCCESS,
    schedules: schedules
  };
};

export const getUserSchedule = (username) => {
  return dispatch => {
    axios
      .get(`http://127.0.0.1:8000/chat/schedule/?username=${username}`)
      .then(res => {
        console.log("GET SCHEDULES:::", res.data);
        dispatch(getUserScheduleSuccess(res.data));
      })

  };
};

// // GET CHATS
// export const getUserChats = () => (dispatch, getState) => {
//   const username = getState().auth.user;
//       axios
//         .get(
//           `http://127.0.0.1:8000/chat/?username=test`)
//         .then(res => dispatch(getUserChatsSuccess(res.data)));
//     };



// // GET CHATS
// export const getUserChats = (username) => dispatch => {
//   // Headers
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };
//   // Request body
//   const body = JSON.stringify({ username });

//   axios
//     .get(`http://127.0.0.1:8000/chat/?username=${username}`)
//     .then(res => dispatch(getUserChatsSuccess(res.data)));

// };

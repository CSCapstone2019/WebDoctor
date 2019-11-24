import axios from 'axios';
import * as actionTypes from './types';
import { tokenConfig } from "./auth";


export const addMessage = message => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message
  };
};

export const setMessages = messages => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages: messages
  };
};

const getUserChatsSuccess = chats => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    chats: chats
  };
};

export const getUserChats = (username) => {
  return dispatch => {
    axios
      .get(`http://127.0.0.1:8000/chat/?username=${username}`)
      .then(res => {
        console.log(res.data);
        dispatch(getUserChatsSuccess(res.data));
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

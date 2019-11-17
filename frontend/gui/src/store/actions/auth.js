import axios from 'axios';
import { returnErrors } from './errorMsg';

import { USER_LOADED, USER_LOADING, AUTH_ERROR } from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  // Get token from state
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // If token exists, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios
    .get('http://localhost:8000/api/auth/user', config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

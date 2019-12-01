import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  isStaff: false,
  user: null,
  a_username: null,
  a_email: null,
  a_first_name: null,
  a_last_name: null,
  a_user_id: null,

};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        isStaff: action.payload.is_staff,
        a_username: action.payload.username,
        a_email: action.payload.email,
        a_first_name: action.payload.first_name,
        a_last_name: action.payload.last_name,
        a_user_id: action.payload.id,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isStaff: action.payload.is_staff,
        a_username: action.payload.username,
        a_email: action.payload.email,
        a_first_name: action.payload.first_name,
        a_last_name: action.payload.last_name,
        a_user_id: action.payload.id,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}

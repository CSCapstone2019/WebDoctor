import { combineReducers } from 'redux';
import patients from './patients';
import errors from './errors';
import errorMsg from './errorMsg';
import message from './message';
import nav from './nav';
import auth from './auth';

export default combineReducers({
  patients,
  errors,
  errorMsg,
  message,
  nav,
  auth
});

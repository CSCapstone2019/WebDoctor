import { combineReducers } from 'redux';
import patients from './patients';
import errors from './errors';
import errorMsg from './errorMsg';
import auth from './auth';
import message from './message';
import nav from './nav';

export default combineReducers({
  patients,
  errors,
  errorMsg,
  auth,
  message,
  nav
});

import { combineReducers } from 'redux';
import patients from './patients';
import message from './message';
import nav from './nav';
import auth from './auth';

export default combineReducers({
  patients,
  message,
  nav,
  auth
});

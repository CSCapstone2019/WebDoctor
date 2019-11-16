import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import errorMessages from './errorMessages';
import message from './message';
import nav from './nav';

export default combineReducers({
  auth,
  errors,
  errorMessages,
  message,
  nav
});

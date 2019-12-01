import { combineReducers } from 'redux';
import patients from './patients';
import appointments from './appointments';
import errors from './errors';
import errorMsg from './errorMsg';
import auth from './auth';
import message from './message';
import nav from './nav';
import schedule from './schedule';
import report from './report';

export default combineReducers({
  patients,
  appointments,
  errors,
  errorMsg,
  auth,
  message,
  nav,
  schedule,
  report,
});

import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
  reports: []
};

const setReport = (state, action) => {
  return updateObject(state, {
    reports: action.reports
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REPORT_SUCCESS:
      return setReport(state, action);
    default:
      return state;
  }
};

export default reducer;

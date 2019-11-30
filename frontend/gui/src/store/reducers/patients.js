import { GET_PATIENTS, DELETE_PATIENT, ADD_PATIENT, GET_STAFF, GET_ALL_PATIENTS } from '../actions/types';

const initialState = {
  patients: [],
  staff: [],
  all_patients: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PATIENTS:
      return {
        ...state,
        all_patients: action.payload
      };
    case GET_STAFF:
      return {
        ...state,
        staff: action.payload
      };
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload
      };
    case DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter(p => p.patient_id !== action.payload)
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: [...state.patients, action.payload]
      };
    default:
      return state;
  }
}

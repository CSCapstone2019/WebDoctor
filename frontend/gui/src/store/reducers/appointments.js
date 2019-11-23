import {
  GET_APPOINTMENTS,
  DELETE_APPOINTMENT,
  ADD_APPOINTMENT
} from '../actions/types';

const initialState = {
  appointments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload
      };
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(
          a => a.appointment_id !== action.payload
        )
      };
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload]
      };
    default:
      return state;
  }
}

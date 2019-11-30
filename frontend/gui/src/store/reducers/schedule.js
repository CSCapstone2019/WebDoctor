import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
  schedules: []
};

// const addMessage = (state, action) => {
//   return updateObject(state, {
//     messages: [...state.messages, action.message]
//   });
// };

const setSchedule = (state, action) => {
  return updateObject(state, {
    schedules: action.schedules
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.ADD_MESSAGE:
    //   return addMessage(state, action);
    // case actionTypes.SET_MESSAGES:
    //   return setMessages(state, action);
    case actionTypes.GET_SCHEDULE_SUCCESS:
      return setSchedule(state, action);
    default:
      return state;
  }
};

export default reducer;

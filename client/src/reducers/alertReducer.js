import { SET_ALERT, CLEAR_ALERT } from "../actions/actionTypes.js";

const INITIAL_STATE = [];

const alertReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [payload, ...state];
    case CLEAR_ALERT:
      return state.filter((el) => el.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;

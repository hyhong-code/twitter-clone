import { SOCKET_CONNECTED, SOCKET_DISPOSED } from "../actions/actionTypes";

const INITIAL_STATE = null;

const socketReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SOCKET_CONNECTED:
      return payload;
    case SOCKET_DISPOSED:
      return null;
    default:
      return state;
  }
};

export default socketReducer;

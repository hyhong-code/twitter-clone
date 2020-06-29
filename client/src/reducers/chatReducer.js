import {
  CHAT_TARGET_SET,
  CHAT_TARGET_CLEARED,
} from "../actions/actionTypes.js";

const INITAL_STATE = {
  chatTarget: null,
};

const chatReducer = (state = INITAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHAT_TARGET_SET:
      return { ...state, chatTarget: payload };
    case CHAT_TARGET_CLEARED:
      return { ...state, chatTarget: null };
    default:
      return state;
  }
};

export default chatReducer;

import { GET_PROFILE, CLEAR_PROFILE } from "../actions/actionTypes";

const INITIAL_STATE = {};

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return { ...state, ...payload.profile };
    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
};

export default profileReducer;

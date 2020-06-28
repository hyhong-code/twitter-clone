import {
  GET_PROFILE,
  CLEAR_PROFILE,
  PROFILE_UPDATED,
} from "../actions/actionTypes";

const INITIAL_STATE = null;

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case PROFILE_UPDATED:
      return { ...payload.profile };
    case CLEAR_PROFILE:
      return null;
    default:
      return state;
  }
};

export default profileReducer;

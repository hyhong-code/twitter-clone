import {
  GET_PROFILE,
  CLEAR_PROFILE,
  PROFILE_UPDATED,
  PROFILE_FOLLOWED,
  PROFILE_UNFOLLOWED,
  FOLLOW_LOADED,
} from "../actions/actionTypes";

const INITIAL_STATE = null;

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case PROFILE_UPDATED:
    case PROFILE_FOLLOWED:
    case PROFILE_UNFOLLOWED:
    case FOLLOW_LOADED:
      return { ...payload.profile };
    case CLEAR_PROFILE:
      return null;
    default:
      return state;
  }
};

export default profileReducer;

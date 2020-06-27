import { SET_LOADING, CLEAR_LOADING } from "../actions/actionTypes";

const INITIAL_STATE = false;

const loadingReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return true;
    case CLEAR_LOADING:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;

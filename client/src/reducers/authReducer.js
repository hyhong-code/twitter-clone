import { LOGIN_SECCESS, LOGIN_FAILED } from "../actions/actionTypes.js";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, paylaod } = action;
  switch (type) {
    default:
      return state;
  }
};

export default authReducer;

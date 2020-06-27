import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/actionTypes.js";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("jwtToken", payload.token);
      return { ...state, isAuthenticated: true };
    case USER_LOADED:
      return { ...state, isAuthenticated: true, ...payload };
    case LOGIN_FAILED:
    case AUTH_ERROR:
      localStorage.removeItem("jwtToken");
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default authReducer;

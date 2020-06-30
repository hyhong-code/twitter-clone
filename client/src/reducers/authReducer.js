import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  USER_DELETED,
} from "../actions/actionTypes.js";
const { setTokenHeader } = require("../util/auth");

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem("jwtToken", payload.token);
      return { ...state, isAuthenticated: true };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        ...payload,
      };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
    case AUTH_ERROR:
    case LOGOUT:
    case USER_DELETED:
      localStorage.removeItem("jwtToken");
      setTokenHeader(false);
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default authReducer;

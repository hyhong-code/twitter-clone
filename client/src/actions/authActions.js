import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./actionTypes";
import axios from "axios";

import { setTokenHeader } from "../util/auth";

export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const resp = await axios.post("/api/v1/users/login", formData, config);
    console.log(resp.data);
    dispatch({ type: LOGIN_SUCCESS, payload: resp.data.data });
    dispatch(loadUser());
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    setTokenHeader(localStorage.jwtToken);
    const resp = await axios.get("/api/v1/users/loadMe");
    console.log(resp.data);
    dispatch({
      type: USER_LOADED,
      payload: resp.data.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

import { SET_ALERT, CLEAR_ALERT } from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (isError = true, msg, timeout = 8000) => (dispatch) => {
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      isError,
      msg,
      timeout,
    },
  });

  setTimeout(() => {
    dispatch(clearAlert(id));
  }, timeout);
};

export const clearAlert = (id) => (dispatch) => {
  dispatch({
    type: CLEAR_ALERT,
    payload: id,
  });
};

import { SET_LOADING, CLEAR_LOADING } from "./actionTypes";

export const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};

export const clearLoading = () => (dispatch) => {
  dispatch({
    type: CLEAR_LOADING,
  });
};

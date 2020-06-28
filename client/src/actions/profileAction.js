import axios from "axios";
import { setAlert } from "./alertActions";
import { setLoading, clearLoading } from "./loadingActions";
import {
  GET_PROFILE,
  CLEAR_PROFILE,
  GET_USER_TWEETS,
  CLEAR_TWEETS,
} from "./actionTypes";

export const getProfile = (id) => async (dispatch) => {
  dispatch(setLoading());
  dispatch({
    type: CLEAR_TWEETS,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const respProfile = await axios.get(`/api/v1/users/${id}/profile`);
    dispatch({
      type: GET_PROFILE,
      payload: respProfile.data.data,
    });
    const respTweet = await axios.get(
      `/api/v1/users/${id}/tweets?sort=-createdAt`
    );
    dispatch({
      type: GET_USER_TWEETS,
      payload: respTweet.data.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch(setAlert(true, error.response.data.message));
  }
  dispatch(clearLoading());
};

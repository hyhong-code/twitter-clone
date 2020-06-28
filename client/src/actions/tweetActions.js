import {
  GET_TWEETS,
  CREATE_TWEET,
  CLEAR_TWEETS,
  DELETE_TWEET,
  LIKE_TWEET,
} from "./actionTypes";
import axios from "axios";

import { setAlert } from "./alertActions";
import { setLoading, clearLoading } from "./loadingActions";

export const getTweets = () => async (dispatch) => {
  dispatch(setLoading());
  dispatch({
    type: CLEAR_TWEETS,
  });
  try {
    const resp = await axios.get("/api/v1/tweets?sort=-createdAt");
    dispatch({
      type: GET_TWEETS,
      payload: resp.data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch(setAlert(true, error.response.data.message));
  }
  dispatch(clearLoading());
};

export const createTweet = (formData) => async (dispatch) => {
  const formConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const resp = await axios.post("/api/v1/tweets", formData, formConfig);
    dispatch({
      type: CREATE_TWEET,
      payload: resp.data.data,
    });
    dispatch(setAlert(false, `Tweet shared!`, 3000));
    return true;
  } catch (error) {
    console.log(error);
    dispatch(setAlert(true, error.response.data.message));
    return false;
  }
};

export const deleteTweet = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/tweets/${id}`);
    dispatch({
      type: DELETE_TWEET,
      payload: id,
    });
    dispatch(setAlert(false, `Tweet deleted`, 3000));
  } catch (error) {
    console.log(error);
    dispatch(setAlert(true, error.response.data.message));
  }
};

export const likeTweet = (tweetId) => async (dispatch) => {
  try {
    const resp = await axios.patch(`/api/v1/tweets/${tweetId}/like`);
    dispatch({
      type: LIKE_TWEET,
      payload: resp.data.data,
    });
    dispatch(setAlert(false, `Tweet liked`, 3000));
  } catch (error) {
    console.log(error);
    dispatch(setAlert(true, error.response.data.message));
  }
};

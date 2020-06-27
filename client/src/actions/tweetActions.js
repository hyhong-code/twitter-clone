import {
  GET_TWEETS,
  CREATE_TWEET,
  GET_USER_TWEETS,
  CLEAR_TWEETS,
  DELETE_TWEET,
} from "./actionTypes";
import axios from "axios";

import { setAlert } from "./alertActions";
import { setLoading, clearLoading } from "./loadingActions";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getTweets = () => async (dispatch) => {
  dispatch(setLoading());
  dispatch({
    type: CLEAR_TWEETS,
  });
  try {
    const resp = await axios.get("/api/v1/tweets?sort=-createdAt");
    console.log(resp.data);
    dispatch({
      type: GET_TWEETS,
      payload: resp.data.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch(setAlert(true, error.response.data.message));
  }
  dispatch(clearLoading());
};

export const createTweet = (text) => async (dispatch) => {
  try {
    const resp = await axios.post("/api/v1/tweets", { text }, config);
    console.log(resp.data);
    dispatch({
      type: CREATE_TWEET,
      payload: resp.data.data,
    });
    dispatch(setAlert(false, `Tweet shared!`, 3000));
    return true;
  } catch (error) {
    console.log(error.response.data);
    dispatch(setAlert(true, error.response.data.message));
  }
};

export const getUserTweets = (id) => async (dispatch) => {
  dispatch(setLoading());
  dispatch({
    type: CLEAR_TWEETS,
  });
  try {
    const resp = await axios.get(`/api/v1/users/${id}/tweets?sort=-createdAt`);
    console.log("look here", resp.data);
    dispatch({
      type: GET_USER_TWEETS,
      payload: resp.data.data,
    });
  } catch (error) {
    console.log(error.reaponse.data);
    dispatch(setAlert(true, error.response.data.message));
  }
  dispatch(clearLoading());
};

export const deleteTweet = (id) => async (dispatch) => {
  console.log(id);
  try {
    await axios.delete(`/api/v1/tweets/${id}`);
    dispatch({
      type: DELETE_TWEET,
      payload: id,
    });
    dispatch(setAlert(false, `Tweet deleted`, 3000));
  } catch (error) {
    console.log(error.response.data);
    dispatch(setAlert(true, error.response.data.message));
  }
};

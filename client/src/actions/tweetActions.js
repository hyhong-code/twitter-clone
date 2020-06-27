import {
  GET_TWEETS,
  CREATE_TWEET,
  GET_USER_TWEETS,
  CLEAR_TWEETS,
} from "./actionTypes";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getTweets = () => async (dispatch) => {
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
  }
};

export const createTweet = (text) => async (dispatch) => {
  try {
    const resp = await axios.post("/api/v1/tweets", { text }, config);
    console.log(resp.data);
    dispatch({
      type: CREATE_TWEET,
      payload: resp.data.data,
    });
    return true;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getUserTweets = (id) => async (dispatch) => {
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
  }
};

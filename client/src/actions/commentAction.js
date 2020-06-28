import { COMMENTS_LOADED } from "./actionTypes";
import { setLoading, clearLoading } from "./loadingActions";
import { setAlert } from "./alertActions";
import axios from "axios";

export const getComments = (tweetId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const respComments = await axios.get(
      `/api/v1/tweets/${tweetId}/comments?sort=-createdAt`
    );
    const respTweet = await axios.get(`/api/v1/tweets/${tweetId}`);
    console.log(respComments.data);
    console.log(respTweet.data);
    dispatch({
      type: COMMENTS_LOADED,
      payload: {
        comments: respComments.data.data.tweets,
        commentingTweet: respTweet.data.data.tweet,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
  dispatch(clearLoading());
};

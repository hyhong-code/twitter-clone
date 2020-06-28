import {
  COMMENTS_LOADED,
  COMMENT_CREATED,
  COMMENT_DELETED,
} from "./actionTypes";
import { setLoading, clearLoading } from "./loadingActions";
import { setAlert } from "./alertActions";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getComments = (tweetId) => async (dispatch) => {
  dispatch(setLoading());
  console.log("getComments ran");
  try {
    const respComments = await axios.get(
      `/api/v1/tweets/${tweetId}/comments?sort=-createdAt`
    );
    const respTweet = await axios.get(`/api/v1/tweets/${tweetId}`);
    dispatch({
      type: COMMENTS_LOADED,
      payload: {
        comments: respComments.data.data.comments,
        commentingTweet: respTweet.data.data.tweet,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch(setAlert(true, error.response.data.message));
  }
  dispatch(clearLoading());
};

export const createComment = (formData, tweetId) => async (dispatch) => {
  try {
    const resp = await axios.post(
      `/api/v1/tweets/${tweetId}/comments`,
      formData,
      config
    );
    dispatch({
      type: COMMENT_CREATED,
      payload: resp.data.data,
    });
    dispatch(setAlert(false, `Comment created`, 3000));
    return true;
  } catch (error) {
    console.log(error);
    dispatch(setAlert(true, error.response.data.message));
    return false;
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const resp = await axios.delete(`/api/v1/comments/${commentId}`);
    console.log(resp.data);
    dispatch({
      type: COMMENT_DELETED,
      payload: commentId,
    });
    dispatch(setAlert(false, `Comment delted`, 3000));
  } catch (error) {
    console.log(error);
    dispatch(setAlert(true, error.response.data.message));
  }
};

import { COMMENTS_LOADED, COMMENTS_CREATED } from "../actions/actionTypes";

const INITIAL_STATE = {
  commentingTweet: null,
  comments: [],
};

const commentReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMMENTS_LOADED:
      return {
        ...state,
        commentingTweet: payload.commentingTweet,
        comments: payload.comments,
      };
    case COMMENTS_CREATED:
      return {
        ...state,
        comments: [payload.comment, ...state.comments],
      };
    default:
      return state;
  }
};

export default commentReducer;

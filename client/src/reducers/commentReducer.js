import { COMMENTS_LOADED } from "../actions/actionTypes";

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
        commentingTweet: payload.tweet,
        comments: payload.comments,
      };
    default:
      return state;
  }
};

export default commentReducer;

import {
  COMMENTS_LOADED,
  COMMENT_CREATED,
  COMMENT_DELETED,
} from "../actions/actionTypes";

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
    case COMMENT_CREATED:
      console.log("COMMENT_CREATED");
      return {
        ...state,
        commentingTweet: {
          ...state.commentingTweet,
          comments: [payload.comment, ...state.commentingTweet.comments],
        },
        comments: [payload.comment, ...state.comments],
      };
    case COMMENT_DELETED:
      return {
        ...state,
        commentingTweet: {
          ...state.commentingTweet,
          comments: state.commentingTweet.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        comments: state.comments.filter((comment) => comment._id !== payload),
      };
    default:
      return state;
  }
};

export default commentReducer;

import {
  GET_TWEETS,
  CREATE_TWEET,
  GET_USER_TWEETS,
  CLEAR_TWEETS,
  DELETE_TWEET,
  LIKE_TWEET,
} from "../actions/actionTypes";

const INITIAL_STATE = [];

const tweetReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TWEETS:
    case GET_USER_TWEETS:
      return [...payload.tweets];
    case CREATE_TWEET:
      return [payload.tweet, ...state];
    case DELETE_TWEET:
      return state.filter((tweet) => tweet._id !== payload);
    case LIKE_TWEET:
      return state.map((tweet) =>
        tweet.id === payload.tweet.id ? payload.tweet : tweet
      );
    case CLEAR_TWEETS:
      return [];
    default:
      return state;
  }
};

export default tweetReducer;

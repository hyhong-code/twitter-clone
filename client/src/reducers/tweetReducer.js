import { GET_TWEETS, CREATE_TWEET } from "../actions/actionTypes";

const INITIAL_STATE = [];

const tweetReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TWEETS:
      return [...payload.tweets];
    case CREATE_TWEET:
      return [payload.tweet, ...state];
    default:
      return state;
  }
};

export default tweetReducer;

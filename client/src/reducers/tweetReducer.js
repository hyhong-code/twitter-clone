import { GET_TWEETS } from "../actions/actionTypes";

const INITIAL_STATE = [];

const tweetReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TWEETS:
      return [...payload.tweets];
    default:
      return state;
  }
};

export default tweetReducer;

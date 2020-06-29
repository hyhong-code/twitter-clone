import { combineReducers } from "redux";
import auth from "./authReducer";
import tweets from "./tweetReducer";
import alerts from "./alertReducer";
import loading from "./loadingReducrer";
import profile from "./profileReducer";
import comments from "./commentReducer";
import socket from "./socketReducer.js";
import chat from "./chatReducer";

export default combineReducers({
  auth,
  tweets,
  alerts,
  loading,
  profile,
  comments,
  socket,
  chat,
});

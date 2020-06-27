import { combineReducers } from "redux";
import auth from "./authReducer";
import tweets from "./tweetReducer";

export default combineReducers({ auth, tweets });

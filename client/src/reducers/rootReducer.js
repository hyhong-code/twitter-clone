import { combineReducers } from "redux";
import auth from "./authReducer";
import tweets from "./tweetReducer";
import alerts from "./alertReducer";

export default combineReducers({ auth, tweets, alerts });

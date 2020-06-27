import { combineReducers } from "redux";
import auth from "./authReducer";
import tweets from "./tweetReducer";
import alerts from "./alertReducer";
import loading from "./loadingReducrer";

export default combineReducers({ auth, tweets, alerts, loading });

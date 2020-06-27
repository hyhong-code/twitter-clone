import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers/rootReducer";

const middlewares = [thunk];

const storeConfig = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

export default storeConfig;

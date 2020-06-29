import io from "socket.io-client";

import { SOCKET_CONNECTED, SOCKET_DISPOSED } from "./actionTypes";

let socket;

export const connectSocket = (userId) => (dispatch) => {
  socket = io("/");
  socket.emit("userConnected", userId);
  dispatch({
    type: SOCKET_CONNECTED,
    payload: socket,
  });
};

export const disposeSocket = () => (dispatch) => {
  socket.disconnect();
  dispatch({
    type: SOCKET_DISPOSED,
  });
};

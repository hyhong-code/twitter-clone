import { CHAT_TARGET_SET, CHAT_TARGET_CLEARED } from "./actionTypes.js";

export const setChatTarget = (targetUser) => (dispatch) => {
  console.log(targetUser);
  dispatch({
    type: CHAT_TARGET_SET,
    payload: targetUser,
  });
};

export const clearChatTarget = () => (dispatch) => {
  dispatch({
    type: CHAT_TARGET_CLEARED,
  });
};

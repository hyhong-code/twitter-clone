import axios from "axios";

export const setTokenHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bear ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

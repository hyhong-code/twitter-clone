import { GET_TWEETS } from "./actionTypes";
import axios from "axios";

export const getTweets = () => async (dispatch) => {
  try {
    const resp = await axios.get("/api/v1/tweets?sort=-createdAt");
    console.log(resp.data);
    // dispatch({
    //   type: GET_TWEETS,
    // });
  } catch (error) {
    console.log(error.response.data);
  }
};

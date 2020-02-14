import { CREATE_CHANNEL, GET_ERRORS } from "./types";

import axios from "axios";

export const createChannel = channelInfo => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/channel/create", channelInfo)
      .then(res => {
        resolve();
        dispatch({
          type: CREATE_CHANNEL,
          payload: res.data
        });
      })
      .catch(err => {
        reject();
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  });
};

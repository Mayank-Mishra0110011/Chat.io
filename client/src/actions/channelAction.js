import { CREATE_CHANNEL, GET_ERRORS, DELETE_CHANNEL } from "./types";

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

export const deleteChannel = channelInfo => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/channel/delete", channelInfo)
      .then(res => {
        resolve();
        dispatch({
          type: DELETE_CHANNEL,
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

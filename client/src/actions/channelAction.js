import {
  CREATE_CHANNEL,
  DELETE_CHANNEL,
  CHANNEL_MESSAGES_LOADING,
  GET_CHANNEL_MESSAGES,
  SEND_CHANNEL_MESSAGE,
  ADD_CHANNEL_MESSAGE,
} from "./types";

import axios from "axios";

export const addChannel = (data) => (dispatch) => {
  dispatch({
    type: CREATE_CHANNEL,
    payload: data,
  });
};

export const removeChannel = (data) => (dispatch) => {
  dispatch({
    type: DELETE_CHANNEL,
    payload: data,
  });
};

export const setMessagesLoading = () => {
  return {
    type: CHANNEL_MESSAGES_LOADING,
  };
};

export const getMessages = (channelID) => (dispatch) => {
  dispatch(setMessagesLoading());
  axios
    .post("http://localhost:5000/channel/message", { channelID: channelID })
    .then((res) => {
      dispatch({
        type: GET_CHANNEL_MESSAGES,
        payload: res.data,
      });
    })
    .catch(() =>
      dispatch({
        type: GET_CHANNEL_MESSAGES,
        payload: {},
      })
    );
};

export const sendMessage = (channelID, message) => (dispatch) => {
  axios
    .post("http://localhost:5000/channel/message/send", {
      channelID: channelID,
      message: message,
    })
    .then((res) => {
      dispatch({
        type: SEND_CHANNEL_MESSAGE,
        payload: res.data,
      });
    })
    .catch(() =>
      dispatch({
        type: SEND_CHANNEL_MESSAGE,
        payload: {},
      })
    );
};

export const addMessage = (userID, username, profilePicture, message) => (
  dispatch
) => {
  dispatch({
    type: ADD_CHANNEL_MESSAGE,
    payload: {
      _id: userID,
      username: username,
      profilePicture: profilePicture,
      message: message,
    },
  });
};

import {
  GET_USER_DATA,
  USER_DATA_LOADING,
  SET_USER_STATUS,
  SET_STATUS_ON_LOAD,
  SET_USER_PROFILE_PICTURE,
  UPDATE_PROFILE,
  GET_CHANNEL_MESSAGES,
  ADD_DM,
  CHANGE_MEDIA_STATUS,
} from "./types";
import axios from "axios";

import { setMessagesLoading } from "./channelAction";

export const getUserData = () => (dispatch) => {
  dispatch(setUserDataLoading());
  axios
    .get("http://localhost:5000/user")
    .then((res) => {
      dispatch({
        type: GET_USER_DATA,
        payload: res.data,
      });
    })
    .catch(() =>
      dispatch({
        type: GET_USER_DATA,
        payload: {},
      })
    );
};

export const changeMediaStatus = (mediaStatus) => (dispatch) => {
  dispatch({
    type: CHANGE_MEDIA_STATUS,
    payload: mediaStatus,
  });
  let status = Object.keys(mediaStatus)[0];
  axios.post("http://localhost:5000/user/set/media", { [status]: true });
};

export const setStatus = (newStatus, userID) => (dispatch) => {
  axios
    .post("http://localhost:5000/user/set/status", { status: newStatus })
    .then(() => {
      dispatch({
        type: SET_USER_STATUS,
        payload: { status: newStatus, id: userID },
      });
    })
    .catch(() =>
      dispatch({
        type: SET_USER_STATUS,
        payload: null,
      })
    );
};

export const setUserDataLoading = () => {
  return {
    type: USER_DATA_LOADING,
  };
};

export const setStatusOnLoad = () => {
  return {
    type: SET_STATUS_ON_LOAD,
  };
};

export const setProfilePicture = (userID, image, broadcasting = false) => (
  dispatch
) => {
  dispatch({
    type: SET_USER_PROFILE_PICTURE,
    payload: {
      id: userID,
      img: image,
      broadcast: broadcasting,
    },
  });
};

export const updateProfile = (
  newProfilePicture,
  newUsername = "",
  newEmail = ""
) => (dispatch) => {
  axios
    .post("http://localhost:5000/user/profile/update", {
      username: newUsername,
      email: newEmail,
      profilePicture: newProfilePicture,
    })
    .then(() => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: null,
      });
    })
    .catch(() =>
      dispatch({
        type: UPDATE_PROFILE,
        payload: null,
      })
    );
};

export const addDMUser = (data) => (dispatch) => {
  dispatch({
    type: ADD_DM,
    payload: data,
  });
};

export const getMessages = (id) => (dispatch) => {
  dispatch(setMessagesLoading());
  axios
    .post("http://localhost:5000/user/message", { conversationID: id })
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

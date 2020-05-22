import {
  GET_SERVERS,
  SERVERS_LOADING,
  CREATE_SERVER,
  SET_SELECTED_CHANNEL,
  UPDATE_USERS,
  ADD_USER,
  DELETE_SERVER,
} from "./types";

import axios from "axios";

export const getServers = () => (dispatch) => {
  dispatch(setServersLoading());
  axios
    .get("http://localhost:5000/server")
    .then((res) => {
      dispatch({
        type: GET_SERVERS,
        payload: res.data,
      });
    })
    .catch(() =>
      dispatch({
        type: GET_SERVERS,
        payload: {},
      })
    );
};

export const deleteServer = (serverID) => (dispatch) => {
  dispatch({
    type: DELETE_SERVER,
    payload: serverID,
  });
  axios.post("http://localhost:5000/server", { serverID: serverID });
};

export const createServer = (serverInfo) => (dispatch) => {
  axios
    .post("http://localhost:5000/server/create", serverInfo)
    .then((res) => {
      dispatch({
        type: CREATE_SERVER,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: CREATE_SERVER,
        payload: null,
      });
    });
};

export const setServersLoading = () => {
  return {
    type: SERVERS_LOADING,
  };
};

export const setSelectedChannel = (dataObject, selectedServer) => (
  dispatch
) => {
  axios.post("http://localhost:5000/server/channel", dataObject).then(() => {
    dispatch({
      type: SET_SELECTED_CHANNEL,
      payload: {
        selectedServer: selectedServer,
        channelID: dataObject.channelID,
      },
    });
  });
};

export const updateUsers = (serverID, userID, userStatus) => (dispatch) => {
  dispatch({
    type: UPDATE_USERS,
    payload: {
      serverID,
      userID,
      userStatus,
    },
  });
};

export const addUser = (serverID, userID) => (dispatch) => {
  axios.post("http://localhost:5000/user/info", { id: userID }).then((user) => {
    const userInfo = user.data.info;
    dispatch({
      type: ADD_USER,
      payload: {
        serverID,
        userInfo,
      },
    });
  });
};

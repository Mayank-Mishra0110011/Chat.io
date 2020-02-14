import {
  GET_SERVERS,
  GET_ERRORS,
  SERVERS_LOADING,
  CREATE_SERVER,
  SET_SELECTED_CHANNEL
} from "./types";
import axios from "axios";

export const getServers = () => dispatch => {
  dispatch(setServersLoading());
  axios
    .get("http://localhost:5000/server")
    .then(res => {
      dispatch({
        type: GET_SERVERS,
        payload: res.data
      });
    })
    .catch(() =>
      dispatch({
        type: GET_SERVERS,
        payload: {}
      })
    );
};

export const createServer = serverInfo => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/server/create", serverInfo)
      .then(res => {
        resolve();
        dispatch({
          type: CREATE_SERVER,
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

export const setServersLoading = () => {
  return {
    type: SERVERS_LOADING
  };
};

export const setSelectedChannel = (dataObject, selectedServer) => dispatch => {
  axios.post("http://localhost:5000/server/channel", dataObject).then(() => {
    dispatch({
      type: SET_SELECTED_CHANNEL,
      payload: {
        selectedServer: selectedServer,
        channelID: dataObject.channelID
      }
    });
  });
};

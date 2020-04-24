import {
  GET_USER_DATA,
  USER_DATA_LOADING,
  SET_USER_STATUS,
  SET_STATUS_ON_LOAD,
} from "./types";
import axios from "axios";

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

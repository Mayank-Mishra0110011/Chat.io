import { GET_USER_DATA, USER_DATA_LOADING, SET_USER_STATUS } from "./types";
import axios from "axios";

export const getUserData = () => dispatch => {
  dispatch(setUserDataLoading());
  axios
    .get("http://localhost:5000/user")
    .then(res => {
      dispatch({
        type: GET_USER_DATA,
        payload: res.data
      });
    })
    .catch(() =>
      dispatch({
        type: GET_USER_DATA,
        payload: {}
      })
    );
};

export const setStatus = newStatus => dispatch => {
  axios
    .post("http://localhost:5000/user/set/status", { status: newStatus })
    .then(res => {
      dispatch({
        type: SET_USER_STATUS,
        payload: {}
      });
    })
    .catch(() =>
      dispatch({
        type: SET_USER_STATUS,
        payload: {}
      })
    );
};

export const setUserDataLoading = () => {
  return {
    type: USER_DATA_LOADING
  };
};

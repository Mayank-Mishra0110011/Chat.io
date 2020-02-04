import {
  SET_DEFAULT_VIEW,
  SET_DM_VIEW,
  SET_SERVER_VIEW,
  SET_SEARCH_VIEW
} from "./types";

export const setDefaultView = () => dispatch => {
  dispatch({
    type: SET_DEFAULT_VIEW,
    payload: "default"
  });
};

export const setDMView = () => dispatch => {
  dispatch({
    type: SET_DM_VIEW,
    payload: "dm"
  });
};

export const setServerView = () => dispatch => {
  dispatch({
    type: SET_SERVER_VIEW,
    payload: "server"
  });
};

export const setSearchView = () => dispatch => {
  dispatch({
    type: SET_SEARCH_VIEW,
    payload: "search"
  });
};

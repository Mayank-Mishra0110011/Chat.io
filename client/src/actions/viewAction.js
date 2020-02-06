import {
  SET_DEFAULT_VIEW,
  SET_DM_VIEW,
  SET_SERVER_VIEW,
  SET_SEARCH_VIEW,
  SET_SETTINGS_VIEW,
  UNSET_SETTINGS_VIEW
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

export const setServerView = serverID => dispatch => {
  dispatch({
    type: SET_SERVER_VIEW,
    payload: {
      view: "server",
      id: serverID
    }
  });
};

export const setSearchView = () => dispatch => {
  dispatch({
    type: SET_SEARCH_VIEW,
    payload: "search"
  });
};

export const setSettingsView = () => dispatch => {
  dispatch({
    type: SET_SETTINGS_VIEW,
    payload: "settings"
  });
};

export const unsetSettingsView = () => dispatch => {
  dispatch({
    type: UNSET_SETTINGS_VIEW,
    payload: null
  });
};

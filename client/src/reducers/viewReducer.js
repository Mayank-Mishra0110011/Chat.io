import {
  SET_DEFAULT_VIEW,
  SET_DM_VIEW,
  SET_SERVER_VIEW,
  SET_SEARCH_VIEW,
  SET_SETTINGS_VIEW,
  UNSET_SETTINGS_VIEW
} from "../actions/types";

const initialState = {
  view: "default",
  previousView: null,
  selected: "0"
};

export default function(state = initialState, action) {
  if (action.type === SET_DM_VIEW || action.type === SET_SEARCH_VIEW) {
    return {
      ...state,
      view: action.payload
    };
  } else if (action.type === SET_SERVER_VIEW) {
    return {
      ...state,
      view: action.payload.view,
      selected: action.payload.id
    };
  } else if (action.type === SET_DEFAULT_VIEW) {
    return {
      ...state,
      view: action.payload,
      selected: "0"
    };
  } else if (action.type === SET_SETTINGS_VIEW) {
    return {
      ...state,
      view: action.payload,
      previousView: state.view
    };
  } else if (action.type === UNSET_SETTINGS_VIEW) {
    return {
      ...state,
      view: state.previousView,
      previousView: action.payload
    };
  }
  return state;
}

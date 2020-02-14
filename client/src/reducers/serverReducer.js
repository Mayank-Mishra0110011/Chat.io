import {
  GET_SERVERS,
  SERVERS_LOADING,
  SET_SELECTED_CHANNEL
} from "../actions/types";

const initialState = {
  servers: null,
  serversLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SERVERS_LOADING:
      return {
        ...state,
        serversLoading: true
      };
    case GET_SERVERS:
      return {
        ...state,
        servers: action.payload,
        serversLoading: false
      };
    case SET_SELECTED_CHANNEL:
      const index = action.payload.selectedServer;
      const channelID = action.payload.channelID;
      const newState = { ...state };
      newState.servers[index].selectedChannel = channelID;
      return newState;
    default:
      return state;
  }
}

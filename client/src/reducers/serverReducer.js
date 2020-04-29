import {
  GET_SERVERS,
  SERVERS_LOADING,
  SET_SELECTED_CHANNEL,
  UPDATE_USERS,
  SET_USER_STATUS,
  ADD_USER,
  SET_USER_PROFILE_PICTURE,
} from "../actions/types";

const initialState = {
  servers: null,
  serversLoading: false,
};

export default function (state = initialState, action) {
  let newState, user, servers;
  switch (action.type) {
    case SERVERS_LOADING:
      return {
        ...state,
        serversLoading: true,
      };
    case GET_SERVERS:
      return {
        ...state,
        servers: action.payload,
        serversLoading: false,
      };
    case SET_SELECTED_CHANNEL:
      let index = action.payload.selectedServer;
      let channelID = action.payload.channelID;
      newState = { ...state };
      newState.servers[index].selectedChannel = channelID;
      return newState;
    case ADD_USER:
      newState = { ...state };
      servers = newState.servers.filter(
        (server) => server._id === action.payload.serverID
      );
      servers.forEach((server) => {
        server.members.push(action.payload.userInfo);
      });
      return newState;
    case UPDATE_USERS:
      newState = { ...state };
      servers = newState.servers.filter(
        (server) => server._id === action.payload.serverID
      );
      servers.forEach((server) => {
        user = server.members.filter(
          (member) => member._id === action.payload.userID
        );
        if (user[0]) user[0].status = action.payload.userStatus;
      });
      return newState;
    case SET_USER_PROFILE_PICTURE:
      newState = { ...state };
      newState.servers.forEach((server) => {
        user = server.members.filter(
          (member) => member._id === action.payload.id
        );
        user[0].profilePicture = action.payload.img;
      });
      return newState;
    case SET_USER_STATUS:
      newState = { ...state };
      newState.servers.forEach((server) => {
        user = server.members.filter(
          (member) => member._id === action.payload.id
        );
        user[0].status = action.payload.status;
      });
      return newState;
    default:
      return state;
  }
}

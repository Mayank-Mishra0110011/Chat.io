import {
  GET_SERVERS,
  SERVERS_LOADING,
  SET_SELECTED_CHANNEL,
  UPDATE_USERS,
  SET_USER_STATUS,
  ADD_USER,
  SET_USER_PROFILE_PICTURE,
  CREATE_SERVER,
  DELETE_SERVER,
  CREATE_CHANNEL,
  DELETE_CHANNEL,
} from "../actions/types";

const initialState = {
  servers: null,
  serversLoading: false,
};

export default function (state = initialState, action) {
  let newState, user, servers, serverIndex;
  switch (action.type) {
    case DELETE_CHANNEL:
      newState = { ...state };
      serverIndex = newState.servers.findIndex(
        (server) => server._id === action.payload.server
      );
      let channelIndex = newState.servers[serverIndex].channels.findIndex(
        (channel) => channel._id === action.payload.channel
      );
      newState.servers[serverIndex].channels.splice(channelIndex, 1);
      return newState;
    case DELETE_SERVER:
      newState = { ...state };
      serverIndex = newState.servers.findIndex(
        (server) => server._id === action.payload
      );
      newState.servers.splice(serverIndex, 1);
      return newState;
    case SERVERS_LOADING:
      return {
        ...state,
        serversLoading: true,
      };
    case CREATE_CHANNEL:
      newState = { ...state };
      serverIndex = newState.servers.findIndex(
        (server) => server._id === action.payload.server
      );
      newState.servers[serverIndex].channels.push(action.payload.channel);
      return newState;
    case GET_SERVERS:
      return {
        ...state,
        servers: action.payload,
        serversLoading: false,
      };
    case CREATE_SERVER:
      newState = { ...state };
      if (action.payload.server)
        newState.servers.unshift(action.payload.server);
      return newState;
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

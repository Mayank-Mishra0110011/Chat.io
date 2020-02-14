import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import viewReducer from "./viewReducer";
import serverReducer from "./serverReducer";
import userReducer from "./userReducer";
import channelReducer from "./channelReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  currentView: viewReducer,
  servers: serverReducer,
  user: userReducer,
  channel: channelReducer
});

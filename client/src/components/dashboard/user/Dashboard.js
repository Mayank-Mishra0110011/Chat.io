import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getServers,
  updateUsers,
  addUser,
} from "../../../actions/serverAction";
import {
  getUserData,
  setStatus,
  setStatusOnLoad,
  setProfilePicture,
  addDMUser,
} from "../../../actions/userAction";
import {
  addMessage,
  addChannel,
  removeChannel,
} from "../../../actions/channelAction";

import Home from "./Home";
import Servers from "../server/Servers";
import DirectMessage from "../chat/DirectMessage";
import CreateServer from "../server/CreateServer";
import ComponentLoading from "../../layout/ComponentLoading";
import SearchServers from "../server/SearchServers";
import User from "./User";
import DMChat from "../chat/DMChat";
import FriendsStatus from "../Friend/FriendsStatus";
import SearchServersContent from "../server/SearchServersContent";
import Settings from "../settings/Settings";
import Chat from "../chat/Chat";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      modalFunc: null,
    };
    this.setFunctionReference = this.setFunctionReference.bind(this);
    this.removeFunctionReference = this.removeFunctionReference.bind(this);
    this.emit = this.emit.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }
  setFunctionReference(type, func) {
    this.setState({
      [type]: func,
    });
  }
  disconnect() {
    this.socket.disconnect();
  }
  removeFunctionReference(type, func = null) {
    if (this.state[type] && func) {
      if (func && this.state[type] === func) {
        this.setState({
          [type]: null,
        });
        return;
      }
      this.state[type]();
      this.setState({
        [type]: null,
      });
    }
  }
  componentDidUpdate() {
    if (
      this.props.currentView.view === "default" ||
      this.props.currentView.view === "search" ||
      this.props.currentView.view === "settings"
    ) {
      document.title = "Chat.io";
    } else if (this.props.currentView.view === "server") {
      document.title = "#ChannelName";
    } else {
      document.title = "@temp";
    }
    const home = document.getElementsByClassName("home")[0];
    if (home) {
      home.addEventListener("mouseover", serverHoverInHandler);
      home.addEventListener("mouseout", serverHoverOutHandler);
    }
    [...document.getElementsByClassName("server")].forEach((server) => {
      server.addEventListener("mouseover", serverHoverInHandler);
      server.addEventListener("mouseout", serverHoverOutHandler);
      server.addEventListener("click", function () {
        let selected = document.getElementsByClassName(
          "notification-selected"
        )[0];
        selected.nextElementSibling.addEventListener(
          "mouseover",
          serverHoverInHandler
        );
        selected.nextElementSibling.addEventListener(
          "mouseout",
          serverHoverOutHandler
        );
        if (this.id !== "createServer") {
          selected.classList.remove("notification");
          selected.classList.remove("notification-selected");
          selected.classList.add("notification-none");
          this.removeEventListener("mouseover", serverHoverInHandler);
          this.removeEventListener("mouseout", serverHoverOutHandler);
        }
        if (this.previousElementSibling) {
          this.previousElementSibling.classList.remove("notification-hover");
          this.previousElementSibling.classList.remove("notification-none");
          this.previousElementSibling.classList.add("notification");
          this.previousElementSibling.classList.add("notification-selected");
        } else {
          this.parentElement.previousElementSibling.classList.remove(
            "notification-hover"
          );
          this.parentElement.previousElementSibling.classList.remove(
            "notification-none"
          );
          this.parentElement.previousElementSibling.classList.add(
            "notification"
          );
          this.parentElement.previousElementSibling.classList.add(
            "notification-selected"
          );
        }
      });
    });
    function serverHoverInHandler() {
      if (this.previousElementSibling) {
        this.previousElementSibling.classList.add("notification-hover");
        if (
          this.previousElementSibling.className.includes("notification-none")
        ) {
          this.previousElementSibling.classList.add("notification-hover");
        }
      }
    }
    function serverHoverOutHandler() {
      if (this.previousElementSibling) {
        this.previousElementSibling.classList.remove("notification-hover");
      }
    }
  }
  componentDidMount() {
    this.socket = window.io.connect("http://localhost:5000");
    this.socket.emit("registerUser", this.props.auth.user.id);
    this.socket.on("profileUpdate", (data) => {
      const { id, profilePicture } = data;
      this.props.setProfilePicture(id, profilePicture, true);
    });
    this.socket.on("conversationCreated", (data) => {
      this.props.addDMUser(data);
    });
    this.socket.on("channelCreated", (data) => {
      this.props.addChannel(data);
    });
    this.socket.on("channelDeleted", (data) => {
      this.props.removeChannel(data);
    });
    this.socket.on("message", (data) => {
      const { id, username, profilePicture, message } = data;
      this.props.addMessage(id, username, profilePicture, message);
    });
    this.socket.on("userOnline", (data) => {
      this.props.updateUsers(data.server, data.user, "online");
      if (!this.props.user.statusIsSet) this.props.setStatusOnLoad();
    });
    this.socket.on("userOffline", (data) => {
      this.props.updateUsers(data.server, data.user, "offline");
      if (!this.props.user.statusIsSet) this.props.setStatusOnLoad();
    });
    this.socket.on("joinServer", (data) => {
      this.props.addUser(data.server, data.user);
    });
    this.socket.on("joinSuccess", () => {
      const state = { ...this.props.history.location.state };
      delete state.newMember;
      this.props.history.replace({
        ...this.props.history.location,
        state,
      });
    });
    this.socket.on("userBusy", (data) => {
      this.props.updateUsers(data.server, data.user, "busy");
      if (!this.props.user.statusIsSet) this.props.setStatusOnLoad();
    });
    this.socket.on("userDnd", (data) => {
      this.props.updateUsers(data.server, data.user, "dnd");
      if (!this.props.user.statusIsSet) this.props.setStatusOnLoad();
    });
    if (this.props.currentView !== "settings") {
      this.props.getServers();
      this.props.getUserData();
    }
    [...document.getElementsByClassName("server")].forEach((server) => {
      server.addEventListener("mouseover", serverHoverInHandler);
      server.addEventListener("mouseout", serverHoverOutHandler);
      server.addEventListener("click", function () {
        let selected = document.getElementsByClassName(
          "notification-selected"
        )[0];
        selected.nextElementSibling.addEventListener(
          "mouseover",
          serverHoverInHandler
        );
        selected.nextElementSibling.addEventListener(
          "mouseout",
          serverHoverOutHandler
        );
        if (this.id !== "createServer") {
          selected.classList.remove("notification");
          selected.classList.remove("notification-selected");
          selected.classList.add("notification-none");
          this.removeEventListener("mouseover", serverHoverInHandler);
          this.removeEventListener("mouseout", serverHoverOutHandler);
        }
        if (this.previousElementSibling) {
          this.previousElementSibling.classList.remove("notification-hover");
          this.previousElementSibling.classList.remove("notification-none");
          this.previousElementSibling.classList.add("notification");
          this.previousElementSibling.classList.add("notification-selected");
        } else {
          this.parentElement.previousElementSibling.classList.remove(
            "notification-hover"
          );
          this.parentElement.previousElementSibling.classList.remove(
            "notification-none"
          );
          this.parentElement.previousElementSibling.classList.add(
            "notification"
          );
          this.parentElement.previousElementSibling.classList.add(
            "notification-selected"
          );
        }
      });
    });
    function serverHoverInHandler() {
      if (this.previousElementSibling) {
        this.previousElementSibling.classList.add("notification-hover");
        if (
          this.previousElementSibling.className.includes("notification-none")
        ) {
          this.previousElementSibling.classList.add("notification-hover");
        }
      }
    }
    function serverHoverOutHandler() {
      if (this.previousElementSibling) {
        this.previousElementSibling.classList.remove("notification-hover");
      }
    }
  }
  emit(event, data) {
    if (this.socket) this.socket.emit(event, data);
  }
  render() {
    const { view } = this.props.currentView;
    const { servers, serversLoading } = this.props.servers;
    const { userDataLoading, userData, statusIsSet } = this.props.user;
    let serverList = [],
      serverIDs = [],
      userIDs = [];
    if (!serversLoading && servers) {
      for (let i = 0; i < servers.length; i++) {
        serverIDs.push(servers[i]._id);
        serverList.push(
          <Servers
            id={(i + 1).toString()}
            name={servers[i].name}
            image={servers[i].image}
            key={i}
            removeFunctionReference={this.removeFunctionReference}
          />
        );
      }
    }
    if (!statusIsSet && !userDataLoading && !serversLoading) {
      if (userData) {
        userIDs = userData.directMessages.map((dm) => dm.user._id);
        if (this.props.location.state && this.props.location.state.newMember) {
          this.emit("joinServer", {
            servers: serverIDs,
            user: this.props.auth.user.id,
          });
        }
        this.emit(`dmUser${userData.status}`, {
          userIDs: userIDs,
          userID: this.props.auth.user.id,
        });
        this.emit(userData.status, {
          servers: serverIDs,
          user: this.props.auth.user.id,
        });
      }
    }
    return (
      <div className="wrapper">
        {serversLoading || userDataLoading ? (
          <ComponentLoading />
        ) : view === "settings" ? (
          <Settings
            disconnect={this.disconnect}
            emit={this.emit}
            serverIDs={serverIDs}
          ></Settings>
        ) : (
          <>
            <div className="servers-home-wrapper">
              <Home removeFunctionReference={this.removeFunctionReference} />
              {serversLoading ? null : serverList}
              <CreateServer
                removeFunctionReference={this.removeFunctionReference}
              />
              <SearchServers />
            </div>
            {view === "search" ? (
              <div
                className="search-wrapper scrollable"
                style={{ position: "absolute", left: "5.5rem", top: "0" }}
              >
                <SearchServersContent />
              </div>
            ) : (
              <>
                <div
                  className="dm-channels-wrapper"
                  style={{ position: "absolute", left: "5.5rem", top: "0" }}
                >
                  <DirectMessage
                    setFunctionReference={this.setFunctionReference}
                    removeFunctionReference={this.removeFunctionReference}
                  />
                  <User
                    setFunctionReference={this.setFunctionReference}
                    removeFunctionReference={this.removeFunctionReference}
                    emit={this.emit}
                    serverIDs={serverIDs}
                    userIDs={userIDs}
                    userID={this.props.auth.user.id}
                  />
                </div>
                <div className="chat-dm-friends-wrapper">
                  {view === "default" ? (
                    <FriendsStatus />
                  ) : view === "server" ? (
                    <Chat
                      serverIDs={serverIDs}
                      userID={this.props.auth.user.id}
                      socket={this.socket}
                      removeFunctionReference={this.removeFunctionReference}
                    />
                  ) : (
                    <DMChat
                      socket={this.socket}
                      userID={this.props.auth.user.id}
                    />
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  currentView: PropTypes.object.isRequired,
  servers: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getServers: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  updateUsers: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setStatusOnLoad: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  setProfilePicture: PropTypes.func.isRequired,
  addChannel: PropTypes.func.isRequired,
  removeChannel: PropTypes.func.isRequired,
  addDMUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentView: state.currentView,
  user: state.user,
  servers: state.servers,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getServers,
  getUserData,
  updateUsers,
  setStatus,
  setStatusOnLoad,
  addUser,
  addMessage,
  setProfilePicture,
  addChannel,
  addDMUser,
  removeChannel,
})(Dashboard);

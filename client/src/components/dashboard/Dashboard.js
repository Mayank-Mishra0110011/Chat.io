import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getServers } from "../../actions/serverAction";
import { getUserData } from "../../actions/userAction";

import Home from "./Home";
import Servers from "./Servers";
import DirectMessage from "./DirectMessage";
import CreateServer from "./CreateServer";
import ComponentLoading from "./ComponentLoading";
import SearchServers from "./SearchServers";
import User from "./User";
import DMChat from "./DMChat";
import FriendsStatus from "./FriendsStatus";
import SearchServersContent from "./SearchServersContent";
import Settings from "./Settings";
import Chat from "./Chat";

class Dashboard extends Component {
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
      document.title = "@Username";
    }
    const home = document.getElementsByClassName("home")[0];
    if (home) {
      home.addEventListener("mouseover", serverHoverInHandler);
      home.addEventListener("mouseout", serverHoverOutHandler);
    }
    [...document.getElementsByClassName("server")].forEach(server => {
      server.addEventListener("mouseover", serverHoverInHandler);
      server.addEventListener("mouseout", serverHoverOutHandler);
      server.addEventListener("click", function() {
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
    if (this.props.currentView !== "settings") {
      this.props.getServers();
      this.props.getUserData();
    }
    [...document.getElementsByClassName("server")].forEach(server => {
      server.addEventListener("mouseover", serverHoverInHandler);
      server.addEventListener("mouseout", serverHoverOutHandler);
      server.addEventListener("click", function() {
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
  render() {
    const { view } = this.props.currentView;
    const { servers, serversLoading } = this.props.servers;
    const { userDataLoading } = this.props.user;
    const serverList = [];

    if (!serversLoading && servers) {
      for (let i = 0; i < servers.length; i++) {
        serverList.push(
          <Servers
            id={(i + 1).toString()}
            name={servers[i].name}
            image={servers[i].image}
            key={i}
          />
        );
      }
    }
    return (
      <div className="wrapper">
        {serversLoading || userDataLoading ? (
          <ComponentLoading />
        ) : view === "settings" ? (
          <Settings></Settings>
        ) : (
          <>
            <div className="servers-home-wrapper">
              <Home />
              {serversLoading ? null : serverList}
              <CreateServer />
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
                  <DirectMessage />
                  <User />
                </div>
                <div className="chat-dm-friends-wrapper">
                  {view === "default" ? (
                    <FriendsStatus />
                  ) : view === "server" ? (
                    <Chat />
                  ) : (
                    <DMChat />
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
  getUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentView: state.currentView,
  user: state.user,
  servers: state.servers
});

export default connect(mapStateToProps, { getServers, getUserData })(Dashboard);

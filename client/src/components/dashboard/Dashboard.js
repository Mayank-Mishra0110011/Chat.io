import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Home from "./Home";
import Servers from "./Servers";
import DirectMessage from "./DirectMessage";
import CreateServer from "./CreateServer";
import SearchServers from "./SearchServers";
import User from "./User";
import DMChat from "./DMChat";
import FriendsStatus from "./FriendsStatus";
import SearchServersContent from "./SearchServersContent";
import UserSettings from "./UserSettings";
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
    return (
      <div className="wrapper">
        {view === "settings" ? (
          <UserSettings></UserSettings>
        ) : (
          <>
            <div className="servers-home-wrapper">
              <Home />
              <Servers id="1" />
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
  currentView: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps)(Dashboard);

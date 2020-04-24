import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setSettingsView } from "../../../actions/viewAction";
import { setStatus } from "../../../actions/userAction";

class User extends Component {
  constructor() {
    super();
    this.showStatusOptions = this.showStatusOptions.bind(this);
    this.showUserSettings = this.showUserSettings.bind(this);
  }
  showUserSettings() {
    this.props.setSettingsView();
  }
  changeStatus(status) {
    let active = document.getElementsByClassName("activestatus")[0];
    active.classList.remove("activestatus");
    status.classList.add("activestatus");
    let currentStatus = document.getElementById("status");
    currentStatus.classList.remove(currentStatus.classList[1]);
    document.getElementById("statusTxt").innerText = status.id;
    currentStatus.classList.add(status.id);
    this.props.emit(status.id, {
      servers: this.props.serverIDs,
      user: this.props.userID,
    });
    this.props.setStatus(status.id, this.props.userID);
  }
  componentDidMount() {
    if (this.props.user.userData) {
      document
        .getElementById(this.props.user.userData.status)
        .classList.add("activestatus");
    }
    [...document.getElementsByClassName("status-option")].forEach((status) => {
      status.addEventListener("click", this.changeStatus.bind(this, status));
    });
    [...document.getElementsByClassName("options")].forEach((option) => {
      if (option.id === "settings") {
        option.addEventListener("click", this.showUserSettings);
      } else {
        option.addEventListener("click", function () {
          let audio;
          if (this.children[0].src.includes("unmute")) {
            let handler = (stream) => {
              this.children[0].src = this.children[0].src.replace(
                "unmute",
                "mute"
              );
              stream.getTracks().forEach((track) => {
                track.stop();
              });
              console.log("Mic off");
            };
            handler = handler.bind(this);
            audio = new Audio("./assets/sound/unselect.mp3");
            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then(handler)
              .catch((err) => {
                console.log(err);
              });
          } else if (this.children[0].src.includes("mute")) {
            let handler = () => {
              this.children[0].src = this.children[0].src.replace(
                "mute",
                "unmute"
              );
              console.log("Mic on");
            };
            handler = handler.bind(this);
            audio = new Audio("./assets/sound/select.mp3");
            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then(handler)
              .catch((err) => {
                console.log(err);
              });
          } else if (this.children[0].src.includes("headphones-on")) {
            audio = new Audio("./assets/sound/select.mp3");
            this.children[0].src = this.children[0].src.replace(
              "headphones-on",
              "headphones-off"
            );
          } else if (this.children[0].src.includes("headphones-off")) {
            audio = new Audio("./assets/sound/unselect.mp3");
            this.children[0].src = this.children[0].src.replace(
              "headphones-off",
              "headphones-on"
            );
          }
          audio.play();
        });
      }
    });
  }
  showStatusOptions() {
    this.props.removeFunctionReference("modalFunc", this.showStatusOptions);
    const div = document.getElementsByClassName("change-status")[0];
    if (div.style.height === "44vh") {
      div.style.zIndex = -10;
      window.TweenMax.to(div, 0.3, {
        height: "0",
        ease: window.Power0.easeOut,
      });
      window.TweenMax.to(div, 0.1, {
        autoAlpha: 0,
        ease: window.Power0.easeOut,
      });
    } else {
      this.props.setFunctionReference("modalFunc", this.showStatusOptions);
      div.style.zIndex = 10;
      window.TweenMax.to(div, 0.1, {
        height: "44vh",
        ease: window.Power0.easeIn,
      });
      window.TweenMax.to(div, 0.2, {
        autoAlpha: 1,
        ease: window.Power0.easeIn,
      });
    }
  }
  render() {
    const { userData } = this.props.user;
    return (
      <div id="user">
        <div className="userbox d-flex justify-content-center align-items-center">
          <div
            style={{ width: "20%", height: "100%" }}
            className="d-flex justify-content-center align-items-center"
            onClick={this.showStatusOptions}
          >
            <div className="friendPic">
              {userData ? (
                <img
                  src={userData.profilePicture}
                  alt="sp1"
                  className="img-fluid friendProfilePic"
                  id="profilepic"
                />
              ) : null}
            </div>
          </div>
          <div
            style={{ width: "30%", height: "100%" }}
            className="d-flex flex-column"
            onClick={this.showStatusOptions}
          >
            {userData ? (
              <>
                <p className="friendstext text-light">{userData.username}</p>
                <p
                  id="statusTxt"
                  className="mb-0"
                  style={{ color: "#8e9297", fontSize: "x-small" }}
                >
                  {userData.status}
                </p>
                <div className={"status " + userData.status} id="status" />{" "}
              </>
            ) : null}
            <div className="change-status">
              <div className="friends" style={{ height: "11vh" }}>
                <div
                  className={"status-option d-flex justify-content-center"}
                  id="online"
                >
                  <div
                    style={{ width: "20%", height: "100%" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div className="status online" />
                  </div>
                  <div
                    style={{ width: "80%", height: "100%" }}
                    className="d-flex align-items-center"
                  >
                    <p className="friendstext" style={{ fontSize: "small" }}>
                      Online
                    </p>
                  </div>
                </div>
              </div>
              <div className="friends" style={{ height: "11vh" }}>
                <div
                  className="status-option d-flex justify-content-center"
                  id="busy"
                >
                  <div
                    style={{ width: "20%", height: "100%" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div className="status busy" />
                  </div>
                  <div
                    style={{ width: "80%", height: "100%" }}
                    className="d-flex align-items-center"
                  >
                    <p className="friendstext" style={{ fontSize: "small" }}>
                      Busy
                    </p>
                  </div>
                </div>
              </div>
              <div className="friends" style={{ height: "11vh" }}>
                <div
                  className="status-option d-flex justify-content-center"
                  id="dnd"
                >
                  <div
                    style={{ width: "20%", height: "100%" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div className="status dnd" />
                  </div>
                  <div
                    style={{ width: "80%", height: "100%" }}
                    className="d-flex flex-column align-items-start justify-content-center"
                  >
                    <p className="friendstext" style={{ fontSize: "small" }}>
                      Do Not Disturb
                    </p>
                    <p
                      className="mb-0"
                      style={{ color: "#8e9297", fontSize: "xx-small" }}
                    >
                      You will not recieve any notifications
                    </p>
                  </div>
                </div>
              </div>
              <div className="friends" style={{ height: "11vh" }}>
                <div
                  className="status-option d-flex justify-content-center"
                  id="offline"
                >
                  <div
                    style={{ width: "20%", height: "100%" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div className="status offline" />
                  </div>
                  <div
                    style={{ width: "80%", height: "100%" }}
                    className="d-flex flex-column align-items-start justify-content-center"
                  >
                    <p className="friendstext" style={{ fontSize: "small" }}>
                      Offline
                    </p>
                    <p
                      className="mb-0"
                      style={{ color: "#8e9297", fontSize: "xx-small" }}
                    >
                      You will not appear online but will have full access to
                      chat.io
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ width: "50%", height: "200%" }}
            className="d-flex justify-content-around"
          >
            <div className="options d-flex justify-content-center align-items-center">
              <img
                src="./assets/image/mute.png"
                alt="sp1"
                className="img-fluid"
              />
            </div>
            <div className="options d-flex justify-content-center align-items-center">
              <img
                src="./assets/image/headphones-on.png"
                alt="sp1"
                className="img-fluid"
              />
            </div>
            <div
              className="options d-flex justify-content-center align-items-center"
              id="settings"
            >
              <img
                src="./assets/image/settings.svg"
                alt="sp1"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  setSettingsView: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  currentView: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  currentView: state.currentView,
});

export default connect(mapStateToProps, {
  setSettingsView,
  setStatus,
})(User);

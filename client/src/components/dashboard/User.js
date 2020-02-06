import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSettingsView } from "../../actions/viewAction";

class User extends Component {
  constructor() {
    super();
    this.showUserSettings = this.showUserSettings.bind(this);
  }
  showUserSettings() {
    this.props.setSettingsView();
  }
  componentDidMount() {
    [...document.getElementsByClassName("status-option")].forEach(status => {
      status.addEventListener("click", function() {
        let active = document.getElementsByClassName("activestatus")[0];
        active.classList.remove("activestatus");
        this.classList.add("activestatus");
        let currentStatus = document.getElementById("status");
        currentStatus.classList.remove(currentStatus.classList[1]);
        currentStatus.classList.add(this.id);
      });
    });
    [...document.getElementsByClassName("options")].forEach(option => {
      if (option.id === "settings") {
        option.addEventListener("click", this.showUserSettings);
      } else {
        option.addEventListener("click", function() {
          let audio;
          if (this.children[0].src.includes("unmute")) {
            let handler = stream => {
              this.children[0].src = this.children[0].src.replace(
                "unmute",
                "mute"
              );
              stream.getTracks().forEach(track => {
                track.stop();
              });
              console.log("Mic off");
            };
            handler = handler.bind(this);
            audio = new Audio("./assets/sound/unselect.mp3");
            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then(handler)
              .catch(err => {
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
              .catch(err => {
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
    let div = document.getElementsByClassName("change-status")[0];
    if (div.style.height === "44vh") {
      div.style.zIndex = -10;
      window.TweenMax.to(div, 0.3, {
        height: "0",
        ease: window.Power0.easeOut
      });
      window.TweenMax.to(div, 0.1, {
        autoAlpha: 0,
        ease: window.Power0.easeOut
      });
    } else {
      div.style.zIndex = 10;
      window.TweenMax.to(div, 0.1, {
        height: "44vh",
        ease: window.Power0.easeIn
      });
      window.TweenMax.to(div, 0.2, {
        autoAlpha: 1,
        ease: window.Power0.easeIn
      });
    }
  }
  render() {
    return (
      <div id="user">
        <div className="userbox d-flex justify-content-center align-items-center">
          <div
            style={{ width: "20%", height: "100%" }}
            className="d-flex justify-content-center align-items-center"
            onClick={this.showStatusOptions}
          >
            <div className="friendPic">
              <img
                src="./assets/image/def.png"
                alt="sp1"
                className="img-fluid friendProfilePic"
                id="profilepic"
              />
            </div>
          </div>
          <div
            style={{ width: "30%", height: "100%" }}
            className="d-flex flex-column"
            onClick={this.showStatusOptions}
          >
            <p className="friendstext">MainUser</p>
            <p
              className="mb-0"
              style={{ color: "#8e9297", fontSize: "x-small" }}
            >
              MainUserTag
            </p>
            <div className="status online" id="status" />
            <div className="change-status">
              <div className="friends" style={{ height: "11vh" }}>
                <div
                  className="status-option d-flex justify-content-center activestatus"
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
  setSettingsView: PropTypes.func.isRequired
};

export default connect(null, { setSettingsView })(User);

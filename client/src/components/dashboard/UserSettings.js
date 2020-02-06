import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { unsetSettingsView } from "../../actions/viewAction";

class UserSettings extends Component {
  constructor() {
    super();
    this.handleEsc = this.handleEsc.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleEsc);
  }
  handleEsc(event) {
    if (event.key === "Escape") {
      document.removeEventListener("keydown", this.handleEsc);
      this.props.unsetSettingsView();
    }
  }
  render() {
    return (
      <>
        <div
          className="servers-home-wrapper"
          style={{ width: "20rem", backgroundColor: "#2f3136" }}
        >
          <div className="d-flex justify-content-end mt-5">
            <div
              className="d-flex align-items-center"
              style={{
                width: "15rem",
                height: "2rem"
              }}
            >
              <p
                className="mb-0 ml-2"
                style={{
                  fontWeight: "bold",
                  color: "#8e9297",
                  fontSize: "0.8em",
                  letterSpacing: "1px"
                }}
              >
                User Settings
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-1">
            <div
              className="d-flex align-items-center justify-content-start"
              style={{
                width: "15rem",
                height: "2.5rem"
              }}
            >
              <div className="d-flex align-items-center activeSetting setting">
                <p className="mb-0 ml-2">My Account</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-1">
            <div
              className="d-flex align-items-center justify-content-start"
              style={{
                width: "15rem",
                height: "2.5rem"
              }}
            >
              <div className="d-flex align-items-center setting">
                <p className="mb-0 ml-2">Privacy & Safety</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-1">
            <div
              className="d-flex align-items-center justify-content-start"
              style={{
                width: "15rem",
                height: "2.5rem"
              }}
            >
              <div className="d-flex align-items-center setting">
                <p className="mb-0 ml-2">Connections</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-1">
            <div
              className="d-flex align-items-center justify-content-start"
              style={{
                width: "15rem",
                height: "1px",
                backgroundColor: "hsla(0, 0%, 100%, 0.06)"
              }}
            ></div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <div
              className="d-flex align-items-center"
              style={{
                width: "15rem",
                height: "2rem"
              }}
            >
              <p
                className="mb-0 ml-2"
                style={{
                  fontWeight: "bold",
                  color: "#8e9297",
                  fontSize: "0.8em",
                  letterSpacing: "1px"
                }}
              >
                App Settings
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-1">
            <div
              className="d-flex align-items-center justify-content-start"
              style={{
                width: "15rem",
                height: "2.5rem"
              }}
            >
              <div className="d-flex align-items-center setting">
                <p className="mb-0 ml-2">Voice & Video</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-1">
            <div
              className="d-flex align-items-center justify-content-start"
              style={{
                width: "15rem",
                height: "2.5rem"
              }}
            >
              <div className="d-flex align-items-center setting">
                <p className="mb-0 ml-2">Notifications</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-1">
            <div
              className="d-flex align-items-center justify-content-start"
              style={{
                width: "15rem",
                height: "2.5rem"
              }}
            >
              <div className="d-flex align-items-center setting">
                <p className="mb-0 ml-2">Text & Images</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-1">
            <div
              className="d-flex align-items-center justify-content-start"
              style={{
                width: "15rem",
                height: "1px",
                backgroundColor: "hsla(0, 0%, 100%, 0.06)"
              }}
            ></div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <div
              className="d-flex align-items-center justify-content-start"
              style={{
                width: "15rem",
                height: "2.5rem"
              }}
            >
              <div className="d-flex align-items-center setting" id="logout">
                <p className="mb-0 ml-2">Log Out</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <div
              className="d-flex align-items-center justify-content-start"
              style={{
                width: "15rem",
                height: "1px",
                backgroundColor: "hsla(0, 0%, 100%, 0.06)"
              }}
            ></div>
          </div>
        </div>
        <div className="esc d-flex flex-column justify-content-center align-items-center">
          <div
            className="d-flex close-settings"
            onClick={this.props.unsetSettingsView}
          >
            <svg
              name="close"
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 12 12"
            >
              <g fill="none" fillRule="evenodd" aria-hidden="true">
                <path d="M0 0h12v12H0"></path>
                <path
                  fill="#dcddde"
                  d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"
                ></path>
              </g>
            </svg>
          </div>
          <p
            className="mb-0"
            style={{
              color: "#72767d",
              fontWeight: "bold",
              letterSpacing: "1px"
            }}
          >
            Esc
          </p>
        </div>
        <div
          className="servers-home-wrapper scrollable"
          style={{
            width: "calc(100vw - 20rem)",
            backgroundColor: "transparent",
            top: "0",
            left: "20rem",
            position: "absolute"
          }}
        >
          {/* inner container */}
          {/* Yeet any added setting component in here */}
        </div>
      </>
    );
  }
}

UserSettings.propTypes = {
  unsetSettingsView: PropTypes.func.isRequired
};

export default connect(null, { unsetSettingsView })(UserSettings);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { unsetSettingsView } from "../../../actions/viewAction";
import { logoutUser } from "../../../actions/authAction";

class UserSettings extends Component {
  render() {
    return (
      <div
        className="servers-home-wrapper"
        style={{ width: "20rem", backgroundColor: "#2f3136" }}
      >
        <div className="d-flex justify-content-end mt-5">
          <div
            className="d-flex align-items-center"
            style={{
              width: "15rem",
              height: "2rem",
            }}
          >
            <p
              className="mb-0 ml-2"
              style={{
                fontWeight: "bold",
                color: "#8e9297",
                fontSize: "0.8em",
                letterSpacing: "1px",
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
              height: "2.5rem",
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
              height: "2.5rem",
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
              height: "2.5rem",
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
              backgroundColor: "hsla(0, 0%, 100%, 0.06)",
            }}
          ></div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <div
            className="d-flex align-items-center"
            style={{
              width: "15rem",
              height: "2rem",
            }}
          >
            <p
              className="mb-0 ml-2"
              style={{
                fontWeight: "bold",
                color: "#8e9297",
                fontSize: "0.8em",
                letterSpacing: "1px",
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
              height: "2.5rem",
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
              height: "2.5rem",
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
              height: "2.5rem",
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
              backgroundColor: "hsla(0, 0%, 100%, 0.06)",
            }}
          ></div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <div
            className="d-flex align-items-center justify-content-start"
            style={{
              width: "15rem",
              height: "2.5rem",
            }}
          >
            <div
              className="d-flex align-items-center setting danger-setting"
              onClick={() => {
                document.removeEventListener("keydown", this.handleEsc);
                this.props.unsetSettingsView();
                this.props.disconnect();
                this.props.logoutUser();
              }}
            >
              <p className="mb-0 ml-2">Log Out</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserSettings.propTypes = {
  unsetSettingsView: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { unsetSettingsView, logoutUser })(UserSettings);

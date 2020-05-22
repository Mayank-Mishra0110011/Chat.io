import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { unsetSettingsView } from "../../../actions/viewAction";

class ChannelSettings extends Component {
  constructor() {
    super();
    this.deleteChannel = this.deleteChannel.bind(this);
  }
  deleteChannel() {
    const { subViewData } = this.props.currentView;
    axios.post("http://localhost:5000/channel/delete", {
      serverID: subViewData.serverID,
      channelID: subViewData.id,
    });
    this.props.unsetSettingsView();
  }
  render() {
    const { subViewData } = this.props.currentView;
    let channelType, specifier;
    if (subViewData.type === "text") {
      specifier = (
        <span
          className="mr-1 font-italic pr-2"
          style={{ fontSize: "1.8em", color: "#8e9297" }}
        >
          #
        </span>
      );
      channelType = "TEXT CHANNELS";
    } else if (subViewData.type === "audio") {
      specifier = (
        <div className="o-options d-flex justify-content-center align-items-center not-option">
          <img
            src="./assets/image/unmute.png"
            alt="sp1"
            className="img-fluid"
          />
        </div>
      );
      channelType = "AUDIO CHANNELS";
    } else if (subViewData.type === "video") {
      specifier = (
        <div className="o-options d-flex justify-content-center align-items-center not-option">
          <img
            src="./assets/image/videoCall.png"
            alt="sp1"
            className="img-fluid"
          />
        </div>
      );
      channelType = "VIDEO CHANNELS";
    }
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
              height: "4rem",
            }}
          >
            <div className="d-flex align-items-center ml-2">
              {specifier}
              <p className="friendstext mb-0">
                {subViewData.name.toUpperCase()}
                <span style={{ fontSize: "xx-small" }} className="ml-2">
                  {channelType}
                </span>
              </p>
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
              <p className="mb-0 ml-2">Overview</p>
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
              <p className="mb-0 ml-2">Permissions</p>
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
              <p className="mb-0 ml-2">Invites</p>
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
              onClick={this.deleteChannel}
            >
              <p className="mb-0 ml-2">Delete Channel</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChannelSettings.propTypes = {
  currentView: PropTypes.object.isRequired,
  unsetSettingsView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentView: state.currentView,
});

export default connect(mapStateToProps, {
  unsetSettingsView,
})(ChannelSettings);

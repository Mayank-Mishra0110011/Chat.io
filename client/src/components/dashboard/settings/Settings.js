import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { unsetSettingsView, setSubView } from "../../../actions/viewAction";

import UserSettings from "./UserSettings";
import ChannelSettings from "./ChannelSettings";

class Settings extends Component {
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
      this.props.setSubView({
        subView: null,
        subViewData: null
      });
    }
  }
  render() {
    const { subView } = this.props.currentView;
    return (
      <>
        {subView === "channel" ? <ChannelSettings /> : <UserSettings />}
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

Settings.propTypes = {
  currentView: PropTypes.object.isRequired,
  unsetSettingsView: PropTypes.func.isRequired,
  setSubView: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps, { unsetSettingsView, setSubView })(
  Settings
);

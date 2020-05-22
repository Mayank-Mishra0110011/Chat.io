import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  unsetSettingsView,
  setSubView,
  setDefaultView,
} from "../../../actions/viewAction";
import { deleteServer } from "../../../actions/serverAction";

class ServerSettings extends Component {
  render() {
    const { servers } = this.props.servers;

    const thisServer = servers[this.props.selected];
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
              {thisServer.name}
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
              <p className="mb-0 ml-2">Roles</p>
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
              <p className="mb-0 ml-2">Moderation</p>
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
              <p className="mb-0 ml-2">Members</p>
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
                // emit event to server members
                this.props.deleteServer(thisServer._id);
                this.props.unsetSettingsView();
                this.props.setDefaultView();
                this.props.setSubView({
                  subView: null,
                  subViewData: null,
                });
              }}
            >
              <p className="mb-0 ml-2">Delete Server</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ServerSettings.propTypes = {
  servers: PropTypes.object.isRequired,
  unsetSettingsView: PropTypes.func.isRequired,
  setSubView: PropTypes.func.isRequired,
  setDefaultView: PropTypes.func.isRequired,
  deleteServer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  servers: state.servers,
});

export default connect(mapStateToProps, {
  deleteServer,
  unsetSettingsView,
  setSubView,
  setDefaultView,
})(ServerSettings);

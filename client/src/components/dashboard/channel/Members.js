import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Members extends Component {
  render() {
    const { selected } = this.props.currentView;
    const { servers } = this.props.servers;
    const online = [],
      offline = [],
      busy = [],
      dnd = [];
    let ref, status;
    for (let i = 0; i < servers[selected - 1].members.length; i++) {
      status = servers[selected - 1].members[i].status;
      if (status === "online") {
        ref = online;
      } else if (status === "busy") {
        ref = busy;
      } else if (status === "dnd") {
        ref = dnd;
      } else {
        ref = offline;
      }
      ref.push(
        <div className="d-flex mt-1" key={i}>
          <div
            className="d-flex align-items-center justify-content-start"
            style={{
              width: "15rem",
              height: "2.8rem",
            }}
          >
            <div className="d-flex align-items-center user">
              <div className="server member ml-2">
                <img
                  src={servers[selected - 1].members[i].profilePicture}
                  alt="logoico"
                  className="img-fluid"
                />
              </div>
              <div className="d-flex flex-column ml-2">
                <p className="mb-0">
                  {servers[selected - 1].members[i].username}
                </p>
                <div
                  className={
                    "status " + servers[selected - 1].members[i].status
                  }
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className="ml-2"
        style={{ width: "20rem", backgroundColor: "#2f3136" }}
      >
        {online.length !== 0 ? (
          <>
            <div className="d-flex mt-3">
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
                  ONLINE—{online.length}
                </p>
              </div>
            </div>{" "}
            {online}
          </>
        ) : null}
        {busy.length !== 0 ? (
          <>
            <div className="d-flex mt-3">
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
                  BUSY—{busy.length}
                </p>
              </div>
            </div>{" "}
            {busy}
          </>
        ) : null}
        {dnd.length !== 0 ? (
          <>
            <div className="d-flex mt-3">
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
                  DND—{dnd.length}
                </p>
              </div>
            </div>{" "}
            {dnd}
          </>
        ) : null}
        {offline.length !== 0 ? (
          <>
            <div className="d-flex mt-3">
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
                  OFFLINE—{offline.length}
                </p>
              </div>
            </div>{" "}
            {offline}
          </>
        ) : null}
      </div>
    );
  }
}

Members.propTypes = {
  servers: PropTypes.object.isRequired,
  currentView: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  servers: state.servers,
  currentView: state.currentView,
});

export default connect(mapStateToProps)(Members);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Members extends Component {
  constructor() {
    super();
    this.hideContextMenu = this.hideContextMenu.bind(this);
  }
  hideContextMenu(event) {
    const menu = document.querySelector(".member-options");
    if (menu && !menu.contains(event.target)) {
      menu.style.zIndex = -100;
      menu.style.visibility = "hidden";
      document.removeEventListener("click", this.hideContextMenu);
    }
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.hideContextMenu);
  }
  showContextMenu(event, type, userData) {
    event.preventDefault();
    this.props.setMenuOptions(type, userData);
    const menu = document.querySelector(".member-options");
    menu.style.top = `${event.pageY}px`;
    menu.style.zIndex = 100;
    menu.style.visibility = "visible";
    document.addEventListener("click", this.hideContextMenu);
  }
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
        <div
          className="d-flex mt-1"
          key={i}
          onContextMenu={(event) => {
            let type;
            if (
              this.props.auth.user.id === servers[selected - 1].members[i]._id
            ) {
              type = "self";
            } else {
              type = "other";
            }
            if (
              servers[selected - 1].creator !==
              servers[selected - 1].members[i]._id
            ) {
              type += "Member";
            } else if (
              servers[selected - 1].creator ===
              servers[selected - 1].members[i]._id
            ) {
              type = "Owner";
            }
            this.showContextMenu.call(this, event, type, {
              profilePicture: servers[selected - 1].members[i].profilePicture,
              username: servers[selected - 1].members[i].username,
              status: servers[selected - 1].members[i].status,
              id: servers[selected - 1].members[i]._id,
            });
          }}
        >
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
        style={{
          width: "20rem",
          backgroundColor: "#2f3136",
          position: "relative",
        }}
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  servers: state.servers,
  currentView: state.currentView,
  auth: state.auth,
});

export default connect(mapStateToProps)(Members);

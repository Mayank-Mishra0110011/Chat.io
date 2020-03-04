import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ServerChatHeader extends Component {
  constructor() {
    super();
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.clickListener = this.clickListener.bind(this);
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") this.modalClose();
    });
  }
  clickListener(event) {
    if (event.target.id === "aboutModal") this.modalClose();
  }
  modalOpen() {
    let modal = document.getElementById("aboutModal");
    modal.classList.add("show");
    modal.style.display = "block";
    modal.style.opacity = "1";
    document.addEventListener("click", this.clickListener);
  }
  modalClose() {
    let modal = document.getElementById("aboutModal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.style.opacity = "0";
      document.removeEventListener("click", this.clickListener);
    }
  }
  render() {
    const selectedServer = parseInt(this.props.currentView.selected) - 1;
    const { servers } = this.props.servers;
    let channelName, channelType;
    for (let i = 0; i < servers[selectedServer].channels.length; i++) {
      if (
        servers[selectedServer].selectedChannel ===
        servers[selectedServer].channels[i]._id
      ) {
        channelName = servers[selectedServer].channels[i].name;
        channelType = servers[selectedServer].channels[i].type;
      }
    }
    let specifier;
    if (channelType === "text") {
      specifier = (
        <span
          className="mr-1 font-italic pr-2"
          style={{ fontSize: "1.8em", color: "#8e9297" }}
        >
          #
        </span>
      );
    } else if (channelType === "audio") {
      specifier = (
        <div className="o-options d-flex justify-content-center align-items-center not-option">
          <img
            src="./assets/image/unmute.png"
            alt="sp1"
            className="img-fluid"
          />
        </div>
      );
    } else if (channelType === "video") {
      specifier = (
        <div className="o-options d-flex justify-content-center align-items-center not-option">
          <img
            src="./assets/image/videoCall.png"
            alt="sp1"
            className="img-fluid"
          />
        </div>
      );
    }
    return (
      <div className="friend-status-options d-flex align-items-center">
        <div
          style={{
            width: "100%",
            height: "80%",
            borderBottom: "1px solid #2a2c31"
          }}
        >
          <div style={{ width: "60rem", height: "100%", position: "relative" }}>
            <div style={{ width: "15rem", height: "100%" }} className="d-flex">
              <div
                style={{ width: "70%", height: "100%" }}
                className="d-flex justify-content-around align-items-center"
              >
                <div className="d-flex align-items-center">
                  {specifier}
                  <p className="text-light mb-0">{channelName}</p>
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "70%",
                    backgroundColor: "#8e9297"
                  }}
                  className="ml-2"
                />
              </div>
            </div>
            <div
              style={{
                width: "35rem",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "10rem"
              }}
              className="d-flex  align-items-center py-1 ml-2"
            >
              <div
                className="w-100"
                style={{
                  cursor: "pointer"
                }}
                onClick={this.modalOpen}
              >
                <p className="friendstext">about</p>
              </div>
            </div>
            <div
              className="modal fade"
              id="aboutModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      #ServerName
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={this.modalClose}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">about</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ServerChatHeader.propTypes = {
  currentView: PropTypes.object.isRequired,
  servers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentView: state.currentView,
  servers: state.servers
});

export default connect(mapStateToProps)(ServerChatHeader);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addMessage, sendMessage } from "../../../actions/channelAction";

class DMChatInput extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.state.message.trim().length > 0) {
      const { username, profilePicture } = this.props.user;
      const { id } = this.props.auth.user;
      const selectedServer = parseInt(this.props.currentView.selected) - 1;
      const { servers } = this.props.servers;
      this.props.addMessage(id, username, profilePicture, this.state.message);
      this.props.emit("message", {
        servers: this.props.serverIDs,
        userID: this.props.userID,
        username: username,
        profilePicture: profilePicture,
        message: this.state.message,
      });
      this.props.sendMessage(
        servers[selectedServer].selectedChannel,
        this.state.message
      );
      this.setState({ message: "" });
    }
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { view } = this.props.currentView;
    let ph;
    if (view === "server") {
      ph = "Message #ChannelName";
    } else {
      ph = "Message @Username";
    }
    return (
      <div style={{ maxWidth: "98%" }}>
        <form
          onSubmit={this.onSubmit}
          noValidate
          className="message-input-form mx-3 d-flex"
          autoComplete="off"
        >
          <div
            className="scrollable mt-2"
            style={{
              backgroundColor: "#40444b",
              maxHeight: "144px",
              borderRadius: "8px",
              width: "98%",
            }}
          >
            <div className="d-flex">
              <div style={{ width: "0", height: "0", position: "relative" }}>
                <input
                  type="file"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    opacity: "0",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                  multiple
                  id="chatUpload"
                  tabIndex="-1"
                />
              </div>
              <div className="upload-btn-wrapper">
                <button
                  type="button"
                  className="chat-btn d-flex"
                  onClick={() => {
                    document.getElementById("chatUpload").click();
                  }}
                >
                  <img
                    src="./assets/image/plus.png"
                    style={{ maxHeight: "1rem" }}
                    alt="plus"
                  />
                </button>
              </div>
              <input
                type="textarea"
                placeholder={ph}
                style={{
                  height: "44px",
                  width: "90%",
                  background: "transparent",
                  borderRadius: "8px",
                }}
                id="message"
                name="message"
                onChange={this.onChange}
                value={this.state.message}
                className="d-flex align-items-center pl-2"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

DMChatInput.propTypes = {
  currentView: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentView: state.currentView,
  user: state.user.userData,
  auth: state.auth,
  servers: state.servers,
});

export default connect(mapStateToProps, { addMessage, sendMessage })(
  DMChatInput
);

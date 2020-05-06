import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addMessage, sendMessage } from "../../../actions/channelAction";

class ChatInput extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      image: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clickListener = this.clickListener.bind(this);
    this.stoppedTyping = this.stoppedTyping.bind(this);
    this.previewUpload = this.previewUpload.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    document.addEventListener("keydown", this.handleEsc);
  }
  handleEsc(event) {
    if (event.key === "Escape") this.modalClose();
  }
  clickListener(event) {
    if (event.target.id === "uploadImageModal") this.modalClose();
  }
  previewUpload(event) {
    event.persist();
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector("#uploadImage").src = e.target.result;
        document.querySelector("#fileName").innerText =
          event.target.files[0].name;
        const modal = document.getElementById("uploadImageModal");
        modal.classList.add("show");
        modal.style.display = "block";
        modal.style.opacity = "1";
        document.addEventListener("click", this.clickListener);
        this.setState({ image: e.target.result });
        document.getElementById("chatUpload").value = "";
      };
      reader.onload = reader.onload.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  uploadImage() {
    const { username, profilePicture } = this.props.user;
    const { id } = this.props.auth.user;
    const selectedServer = parseInt(this.props.currentView.selected) - 1;
    const { servers } = this.props.servers;
    this.props.addMessage(id, username, profilePicture, this.state.image);
    this.props.socket.emit("message", {
      servers: this.props.serverIDs,
      userID: this.props.userID,
      username: username,
      profilePicture: profilePicture,
      message: this.state.image,
    });
    this.props.sendMessage(
      servers[selectedServer].selectedChannel,
      this.state.image
    );
    this.modalClose();
  }
  modalClose() {
    const modal = document.getElementById("uploadImageModal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.style.opacity = "0";
      document.removeEventListener("click", this.clickListener);
      this.setState({ image: null });
    }
  }
  onSubmit(event) {
    event.preventDefault();
    this.stoppedTyping();
    if (this.state.message.trim().length > 0) {
      const { username, profilePicture } = this.props.user;
      const { id } = this.props.auth.user;
      const selectedServer = parseInt(this.props.currentView.selected) - 1;
      const { servers } = this.props.servers;
      this.props.addMessage(id, username, profilePicture, this.state.message);
      this.props.socket.emit("message", {
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
    const { username } = this.props.user;
    this.props.socket.emit("typing", {
      servers: this.props.serverIDs,
      userID: this.props.userID,
      username: username,
    });
    this.setState({ [event.target.name]: event.target.value });
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEsc);
    this.stoppedTyping();
  }
  stoppedTyping() {
    const { username } = this.props.user;
    this.props.socket.emit("notTyping", {
      servers: this.props.serverIDs,
      userID: this.props.userID,
      username: username,
    });
  }
  componentDidMount() {
    this.usersTyping = [];
    this.props.socket.on("typing", (data) => {
      const { username } = data;
      if (!this.usersTyping.includes(username) && this.usersTyping.length < 8)
        this.usersTyping.push(username);
      if (this.usersTyping.length === 1) this.showTyping();
      const text = document.querySelector(".typing").firstChild;
      let innerText =
        this.usersTyping.join(" is typing..., ") + " is typing...";
      if (innerText.length > 138) {
        text.innerText = "several people are typing...";
      } else {
        text.innerText = innerText;
      }
    });
    this.props.socket.on("notTyping", (data) => {
      const { username } = data;
      this.usersTyping.splice(this.usersTyping.indexOf(username), 1);
      if (this.usersTyping.length === 0) this.hideTyping();
    });
  }
  hideTyping() {
    window.TweenMax.to(".typing", 0, {
      autoAlpha: 0,
      height: "0",
      ease: window.Power0.easeOut,
    });
  }
  showTyping() {
    window.TweenMax.to(".typing", 0.1, {
      autoAlpha: 1,
      height: "26px",
      ease: window.Power0.easeIn,
    });
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
      <div style={{ maxWidth: "98%", position: "relative" }}>
        <div className="typing">
          <p
            className="text-light py-1 ml-3"
            style={{ fontSize: "smaller" }}
          ></p>
        </div>
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
                  accept="image/*"
                  id="chatUpload"
                  onChange={this.previewUpload}
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
        <div
          className="modal fade"
          id="uploadImageModal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content text-light">
              <div className="modal-body d-flex justify-content-start flex-column pb-0">
                <div className="row pt-3 justify-content-center align-items-center px-2">
                  <img
                    id="uploadImage"
                    alt="uploadimg"
                    className="img-fluid"
                    style={{ borderRadius: "3px" }}
                    src=""
                  ></img>
                </div>
                <div className="row justify-content-center align-items-center pt-2">
                  <p id="fileName" className="mb-0 text-light"></p>
                </div>
                <div
                  className="row py-3 mt-3"
                  style={{ backgroundColor: "#2f3136" }}
                >
                  <div
                    className="col-12 d-flex justify-content-between"
                    style={{ height: "2.5rem" }}
                  >
                    <button
                      className="btn btn-secondary px-3"
                      type="button"
                      onClick={this.modalClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn px-4"
                      type="button"
                      style={{ backgroundColor: "#7289da", color: "white" }}
                      onClick={this.uploadImage}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChatInput.propTypes = {
  currentView: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  servers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentView: state.currentView,
  user: state.user.userData,
  auth: state.auth,
  servers: state.servers,
});

export default connect(mapStateToProps, { addMessage, sendMessage })(ChatInput);

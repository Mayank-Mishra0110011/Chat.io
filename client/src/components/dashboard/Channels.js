import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import { setSelectedChannel, getServers } from "../../actions/serverAction";
import { createChannel } from "../../actions/channelAction";

class Channels extends Component {
  constructor() {
    super();
    this.state = {
      channelType: "text",
      channelName: ""
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.createChannel = this.createChannel.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.clickListener = this.clickListener.bind(this);
    this.selectOption = this.selectOption.bind(this);
    document.addEventListener("keydown", this.handleEsc);
  }
  createChannel() {
    const selectedServer = parseInt(this.props.selectedServer) - 1;
    const { servers } = this.props.servers;
    const thisServer = servers[selectedServer]._id;
    this.props
      .createChannel({
        channelName: this.state.channelName,
        channelType: this.state.channelType,
        serverID: thisServer
      })
      .then(() => {
        this.props.getServers();
      })
      .catch(() => {});
  }
  modalOpen(type) {
    document.getElementById("channel-type").innerText = type;
    let modal = document.getElementById("createChannelModal");
    modal.classList.add("show");
    modal.style.display = "block";
    modal.style.opacity = "1";
    document.addEventListener("click", this.clickListener);
  }
  modalClose() {
    let modal = document.getElementById("createChannelModal");
    this.setState({ channelType: "text", channelName: "" });
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.style.opacity = "0";
      document.removeEventListener("click", this.clickListener);
    }
  }
  selectOption(type) {
    this.setState({ channelType: type });
  }
  clickListener(event) {
    if (event.target.id === "createChannelModal") this.modalClose();
  }
  componentDidMount() {
    [...document.getElementsByClassName("cb-wrapper")].forEach(cb => {
      cb.addEventListener("click", function() {
        const checkedElement = document.getElementsByClassName("cb-checked")[0];
        checkedElement.getElementsByTagName("polyline")[0].style.stroke =
          "transparent";
        checkedElement.classList.remove("cb-checked");
        checkedElement.classList.add("cb-unchecked");
        checkedElement.parentElement.classList.remove("cb-selected");
        const thisElement = this.getElementsByClassName("cb")[0];
        thisElement.classList.remove("cb-unchecked");
        thisElement.classList.add("cb-checked");
        thisElement.parentElement.classList.add("cb-selected");
        thisElement.getElementsByTagName("polyline")[0].style.stroke =
          "#7289da";
      });
    });
    [...document.getElementsByClassName("friendsbox")].forEach(box => {
      box.addEventListener("click", function() {
        document
          .getElementsByClassName("foactive")[0]
          .classList.remove("foactive");
        this.classList.add("foactive");
      });
    });
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEsc);
  }
  handleEsc(event) {
    if (event.key === "Escape") this.modalClose();
  }
  clickHandler(id) {
    const selectedServer = parseInt(this.props.selectedServer) - 1;
    const { servers } = this.props.servers;
    this.props.setSelectedChannel(
      {
        serverID: servers[selectedServer]._id,
        channelID: id
      },
      selectedServer
    );
  }
  render() {
    const selectedServer = parseInt(this.props.selectedServer) - 1;
    const { servers } = this.props.servers;
    const textChannels = [];
    const audioChannels = [];
    const videoChannels = [];
    for (let i = 0; i < servers[selectedServer].channels.length; i++) {
      if (
        servers[selectedServer].selectedChannel ===
        servers[selectedServer].channels[i]._id
      ) {
        document.title = "#" + servers[selectedServer].channels[i].name;
      }
      switch (servers[selectedServer].channels[i].type) {
        case "text":
          textChannels.push(
            <div className="d-flex" key={i}>
              <div
                style={{ width: "100%", height: "100%" }}
                className="d-flex align-items-center"
              >
                <div className="notification mr-2" />
                <div
                  className={classnames(
                    "friendsbox d-flex align-items-center mt-1",
                    {
                      "friendsbox d-flex align-items-center foactive mt-1":
                        servers[selectedServer].selectedChannel ===
                        servers[selectedServer].channels[i]._id
                    }
                  )}
                  onClick={this.clickHandler.bind(
                    this,
                    servers[selectedServer].channels[i]._id
                  )}
                  style={{ height: "100%", borderRadius: "2px", width: "90%" }}
                >
                  <div className="d-flex align-items-center ml-2">
                    <span
                      className="mr-1 font-italic pr-2"
                      style={{ fontSize: "1.8em", color: "#8e9297" }}
                    >
                      #
                    </span>
                    <p className="text-light mb-0">
                      {servers[selectedServer].channels[i].name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
          break;
        case "audio":
          audioChannels.push(
            <div className="d-flex" key={i}>
              <div
                style={{ width: "100%", height: "100%" }}
                className="d-flex align-items-center"
              >
                <div className="notification mr-2" />
                <div
                  className={classnames(
                    "friendsbox d-flex align-items-center mt-1",
                    {
                      "friendsbox d-flex align-items-center foactive mt-1":
                        servers[selectedServer].selectedChannel ===
                        servers[selectedServer].channels[i]._id
                    }
                  )}
                  onClick={this.clickHandler.bind(
                    this,
                    servers[selectedServer].channels[i]._id
                  )}
                  style={{ height: "100%", borderRadius: "2px", width: "90%" }}
                >
                  <div className="d-flex align-items-center ml-2">
                    <div className="options d-flex justify-content-center align-items-center not-option">
                      <img
                        src="./assets/image/unmute.png"
                        alt="sp1"
                        className="img-fluid"
                      />
                    </div>
                    <p className="text-light mb-0">
                      {servers[selectedServer].channels[i].name}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
          break;
        case "video":
          videoChannels.push(
            <div className="d-flex" key={i}>
              <div
                style={{ width: "100%", height: "100%" }}
                className="d-flex align-items-center"
              >
                <div className="notification mr-2" />
                <div
                  className={classnames(
                    "friendsbox d-flex align-items-center mt-1",
                    {
                      "friendsbox d-flex align-items-center foactive mt-1":
                        servers[selectedServer].selectedChannel ===
                        servers[selectedServer].channels[i]._id
                    }
                  )}
                  onClick={this.clickHandler.bind(
                    this,
                    servers[selectedServer].channels[i]._id
                  )}
                  style={{ height: "100%", borderRadius: "2px", width: "90%" }}
                >
                  <div className="d-flex align-items-center ml-2">
                    <div className="options d-flex justify-content-center align-items-center not-option">
                      <img
                        src="./assets/image/videoCall.png"
                        alt="sp1"
                        className="img-fluid"
                      />
                    </div>
                    <p className="text-light mb-0">
                      {servers[selectedServer].channels[i].name}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
          break;
        default:
          break;
      }
    }
    const { errors } = this.props;
    return (
      <div>
        <div className="friends" style={{ height: "8vh", width: "100%" }}>
          <div
            className="d-flex align-items-start"
            style={{ height: "80%", width: "100%" }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex align-items-center flex-wrap"
            >
              <div
                className="d-flex align-items-center add"
                style={{ cursor: "pointer" }}
              >
                <div className="options d-flex justify-content-center align-items-center not-option">
                  <img
                    src="./assets/image/caretDown.png"
                    alt="sp1"
                    className="img-fluid"
                  />
                </div>
                <p className="friendstext">Text Channels</p>
              </div>
              <div className="d-flex justify-content-end" style={{ flex: "1" }}>
                <div
                  className="options d-flex align-items-center not-option add"
                  onClick={this.modalOpen.bind(this, "Text")}
                >
                  <img
                    src="./assets/image/add.png"
                    alt="sp1"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {textChannels}
        <div className="friends" style={{ height: "8vh", width: "100%" }}>
          <div
            className="d-flex align-items-start"
            style={{ height: "80%", width: "100%" }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex align-items-center"
            >
              <div
                className="d-flex align-items-center add"
                style={{ cursor: "pointer" }}
              >
                <div className="options d-flex justify-content-center align-items-center not-option">
                  <img
                    src="./assets/image/caretDown.png"
                    alt="sp1"
                    className="img-fluid"
                  />
                </div>
                <p className="friendstext">Audio Channels</p>
              </div>
              <div className="d-flex justify-content-end" style={{ flex: "1" }}>
                <div
                  className="options d-flex align-items-center not-option add"
                  onClick={this.modalOpen.bind(this, "Audio")}
                >
                  <img
                    src="./assets/image/add.png"
                    alt="sp1"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {audioChannels}
        <div className="friends" style={{ height: "8vh", width: "100%" }}>
          <div
            className="d-flex align-items-start"
            style={{ height: "80%", width: "100%" }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex align-items-center"
            >
              <div
                className="d-flex align-items-center add"
                style={{ cursor: "pointer" }}
              >
                <div className="options d-flex justify-content-center align-items-center not-option">
                  <img
                    src="./assets/image/caretDown.png"
                    alt="sp1"
                    className="img-fluid"
                  />
                </div>
                <p className="friendstext">Video Channels</p>
              </div>
              <div className="d-flex justify-content-end" style={{ flex: "1" }}>
                <div
                  className="options d-flex align-items-center not-option add"
                  onClick={this.modalOpen.bind(this, "Video")}
                >
                  <img
                    src="./assets/image/add.png"
                    alt="sp1"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {videoChannels}
        <div
          className="modal fade"
          id="createChannelModal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content text-light"
              style={{ backgroundColor: "#36393f" }}
            >
              <div className="modal-header pb-0">
                <div
                  className="d-flex justify-content-start ml-2 flex-column"
                  style={{ width: "100%" }}
                >
                  <p className="modal-title" style={{ fontWeight: "bold" }}>
                    CREATE TEXT CHANNEL
                  </p>
                  <p className="friendstext" style={{ fontSize: "small" }}>
                    in <span id="channel-type"></span> Channels
                  </p>
                </div>
              </div>
              <div className="modal-body d-flex justify-content-start flex-column pb-0">
                <p
                  className="friendstext mb-2"
                  style={{ fontSize: "medium", fontWeight: "bold" }}
                >
                  CHANNEL TYPE
                </p>
                <div
                  className="d-flex form-control align-items-center py-4 cb-wrapper cb-selected"
                  style={{ overflow: "hidden" }}
                  onClick={this.selectOption.bind(this, "text")}
                >
                  <div className="cb d-flex justify-content-center align-items-center cb-checked">
                    <svg
                      name="Checkmark"
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <polyline
                          stroke="#7289da"
                          strokeWidth="2"
                          points="3.5 9.5 7 13 15 5"
                        ></polyline>
                      </g>
                    </svg>
                  </div>
                  <span
                    className="font-italic pr-2 ml-2"
                    style={{ fontSize: "1.8em", color: "#737476" }}
                  >
                    #
                  </span>
                  <p className="text-light mb-0" style={{ fontSize: "1.3em" }}>
                    Text Channel
                  </p>
                </div>
                <div
                  className="d-flex form-control align-items-center py-4 cb-wrapper mt-2"
                  style={{ overflow: "hidden" }}
                  onClick={this.selectOption.bind(this, "audio")}
                >
                  <div className="cb d-flex justify-content-center align-items-center cb-unchecked">
                    <svg
                      name="Checkmark"
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <polyline
                          stroke="transparent"
                          strokeWidth="2"
                          points="3.5 9.5 7 13 15 5"
                        ></polyline>
                      </g>
                    </svg>
                  </div>
                  <div className="options d-flex justify-content-center align-items-center not-option">
                    <img
                      src="./assets/image/unmute.png"
                      alt="sp1"
                      className="img-fluid"
                    />
                  </div>
                  <p className="text-light mb-0" style={{ fontSize: "1.3em" }}>
                    Audio Channel
                  </p>
                </div>
                <div
                  className="d-flex form-control align-items-center py-4 cb-wrapper mt-2"
                  style={{ overflow: "hidden" }}
                  onClick={this.selectOption.bind(this, "video")}
                >
                  <div className="cb d-flex justify-content-center align-items-center cb-unchecked">
                    <svg
                      name="Checkmark"
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <polyline
                          stroke="transparent"
                          strokeWidth="2"
                          points="3.5 9.5 7 13 15 5"
                        ></polyline>
                      </g>
                    </svg>
                  </div>
                  <div className="options d-flex justify-content-center align-items-center not-option">
                    <img
                      src="./assets/image/videoCall.png"
                      alt="sp1"
                      className="img-fluid"
                    />
                  </div>
                  <p className="text-light mb-0" style={{ fontSize: "1.3em" }}>
                    Video Channel
                  </p>
                </div>
                <p
                  className="friendstext my-2"
                  style={{ fontSize: "medium", fontWeight: "bold" }}
                >
                  CHANNEL NAME
                </p>
                <input
                  className={classnames("form-control finput", {
                    "is-invalid": errors.channel
                  })}
                  autoComplete="off"
                  type="text"
                  name="channelName"
                  id="channelName"
                  aria-describedby="channelName"
                  value={this.state.channelName}
                  onChange={event => {
                    this.setState({ channelName: event.target.value });
                  }}
                />
                {errors.channel && (
                  <div className="invalid-feedback">{errors.channel}</div>
                )}
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
                      onClick={this.createChannel}
                    >
                      Create
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

Channels.propTypes = {
  servers: PropTypes.object.isRequired,
  setSelectedChannel: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  createChannel: PropTypes.func.isRequired,
  getServers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  servers: state.servers,
  errors: state.errors
});

export default connect(mapStateToProps, {
  setSelectedChannel,
  createChannel,
  getServers
})(Channels);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import moment from "moment";

import { getMessages } from "../../../actions/channelAction";

import ComponentLoading from "../../layout/ComponentLoading";

class DMChatContent extends Component {
  componentDidMount() {
    const selectedServer = parseInt(this.props.currentView.selected) - 1;
    const { servers } = this.props.servers;
    this.props.getMessages(servers[selectedServer].selectedChannel);
  }
  componentDidUpdate() {
    if (this.refs.lastMessage)
      this.refs.lastMessage.scrollIntoView({ behavior: "smooth" });
  }
  render() {
    const { view } = this.props.currentView;
    const { messagesLoading, messages } = this.props.channel;
    const messageArr = [];
    if (!messagesLoading && messages) {
      for (let i = 0; i < messages.length; i++) {
        let props = {
          key: i,
        };
        if (i === messages.length - 1) {
          props.ref = "lastMessage";
        }
        messageArr.push(
          <div className="col-12 pt-3 message" {...props}>
            <div
              className="d-flex flex-column"
              style={{ position: "relative", minHeight: "5rem" }}
            >
              <div className="chat-user d-flex justify-content-center align-items-start">
                <div className="box">
                  <div className="server" style={{ position: "relative" }}>
                    <img
                      src={messages[i].sender.profilePicture}
                      className="img-fluid"
                      alt="profilePic"
                    />
                  </div>
                </div>
              </div>
              <div className="chat-message">
                <p
                  style={{
                    color: "#8e9297",
                    fontWeight: "bolder",
                  }}
                  className="text-light mb-0"
                >
                  {messages[i].sender.username}{" "}
                  <span
                    style={{
                      color: "#8e9297",
                      fontWeight: "normal",
                      fontSize: "x-small",
                    }}
                    className="ml-1"
                  >
                    {moment(messages[i].createdAt).fromNow()}
                  </span>
                </p>
              </div>
              <div className="chat-message">
                <p className="text-light mb-0">{messages[i].content}</p>
              </div>
            </div>
            {i < messages.length - 1 &&
            Date.now() - Date.parse(messages[i].createdAt > 86400000) ? (
              <span className="divider">
                {moment(messages[i].createdAt).fromNow()}
              </span>
            ) : null}
          </div>
        );
      }
    }
    return (
      <div
        style={{ height: "80vh", maxWidth: "99%" }}
        className="scrollable"
        id="currentChannel"
      >
        {messagesLoading ? (
          <ComponentLoading />
        ) : (
          <div className="container pt-4 ml-0">
            <div className="row">
              <div className="col-12">
                {view === "server" ? (
                  <p className="text-light">
                    Welcome to the begining of
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      #ChannelName
                    </span>{" "}
                    channel.
                  </p>
                ) : (
                  <div>
                    <div className="box">
                      <div className="server">
                        <img
                          src="./assets/image/samplepic1.jpg"
                          className="img-fluid"
                          alt="profilePic"
                        />
                      </div>
                    </div>
                    <h1
                      className="text-light py-2"
                      style={{ fontWeight: "bold" }}
                    >
                      Username 1
                    </h1>
                    <p style={{ color: "#8e9297" }}>
                      This is the begining of your direct message history with{" "}
                      <span style={{ fontWeight: "bold" }}>@Username 1.</span>
                    </p>
                  </div>
                )}
                <span className="divider pt-3">January 21, 2020</span>
              </div>
              {messageArr}
            </div>
          </div>
        )}
      </div>
    );
  }
}

DMChatContent.propTypes = {
  currentView: PropTypes.object.isRequired,
  servers: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentView: state.currentView,
  servers: state.servers,
  channel: state.channel,
});

export default connect(mapStateToProps, { getMessages })(DMChatContent);

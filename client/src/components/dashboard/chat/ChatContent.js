import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classnames from "classnames";

import moment from "moment";

import { getMessages } from "../../../actions/channelAction";

import ComponentLoading from "../../layout/ComponentLoading";
import UrlEmbed from "./UrlEmbed";
import ImageEmbed from "./ImageEmbed";

class ChatContent extends Component {
  constructor() {
    super();
    this.scroll = this.scroll.bind(this);
  }
  componentDidMount() {
    const selectedServer = parseInt(this.props.currentView.selected) - 1;
    const { servers } = this.props.servers;
    this.props.getMessages(servers[selectedServer].selectedChannel);
  }
  isValidURL(url) {
    let pattern = /(ftp|http|https):(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(|([\w#!:.?+=&%@!-]))?/;
    return pattern.test(url);
  }
  scroll() {
    if (this.refs.lastMessage)
      this.refs.lastMessage.scrollIntoView({ behavior: "smooth" });
  }
  componentDidUpdate() {
    this.scroll();
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
        let validURL, isImage;
        if (this.isValidURL(messages[i].content)) {
          validURL = true;
        }
        if (messages[i].content.substr(0, 5) === "data:") isImage = true;
        messageArr.push(
          <div
            className={classnames("col-12 pt-3 message", {
              "pb-3": i === messages.length - 1,
            })}
            {...props}
            data-toggle="tooltip"
            data-placement="top"
            title={moment(messages[i].createdAt).format(
              "dddd, MMMM, YYYY h:mm A"
            )}
          >
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
                    {moment().diff(messages[i].createdAt) > 172800000
                      ? moment().format("MM/DD/YYYY")
                      : moment(messages[i].createdAt).calendar()}
                  </span>
                </p>
              </div>
              <div className="chat-message">
                {validURL ? (
                  <>
                    <a href={messages[i].content}>{messages[i].content}</a>
                    <UrlEmbed
                      url={messages[i].content}
                      scroll={this.scroll}
                    ></UrlEmbed>
                  </>
                ) : isImage ? (
                  <ImageEmbed data={messages[i].content} />
                ) : (
                  <p className="text-light mb-0">{messages[i].content}</p>
                )}
              </div>
            </div>
            {i < messages.length - 1 &&
            moment(messages[i + 1].createdAt).diff(
              moment(messages[i].createdAt)
            ) > 86400000 ? (
              <span className="divider">
                {moment(messages[i + 1].createdAt).format("MMMM D, YYYY")}
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
          <div className="container pt-4 ml-0" style={{ position: "relative" }}>
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

ChatContent.propTypes = {
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

export default connect(mapStateToProps, { getMessages })(ChatContent);

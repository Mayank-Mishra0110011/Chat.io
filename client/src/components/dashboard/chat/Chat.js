import React, { Component } from "react";

import DMChat from "./DMChat";
import Members from "../channel/Members";

import MemberOptions from "../channel/MemberOptions";

class Chat extends Component {
  constructor() {
    super();
    this.state = { menuType: null, menuUserData: null };
    this.setMenuOptions = this.setMenuOptions.bind(this);
  }
  setMenuOptions(type, userData) {
    this.setState({ menuType: type, menuUserData: userData });
  }
  render() {
    return (
      <div>
        <div
          className="server-chat-wrapper"
          style={{ position: "absolute", top: "0", overflowX: "auto" }}
        >
          <DMChat
            serverIDs={this.props.serverIDs}
            userID={this.props.userID}
            socket={this.props.socket}
            removeFunctionReference={this.props.removeFunctionReference}
          />
        </div>
        <div
          className="server-member-wrapper scrollable"
          style={{ position: "absolute", left: "47rem", top: "0" }}
        >
          <div
            className="member-options d-flex flex-column align-items-center"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            <MemberOptions
              type={this.state.menuType}
              userData={this.state.menuUserData}
            />
          </div>
          <Members setMenuOptions={this.setMenuOptions} />
        </div>
      </div>
    );
  }
}

export default Chat;

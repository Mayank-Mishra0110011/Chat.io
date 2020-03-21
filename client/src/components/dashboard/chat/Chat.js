import React, { Component } from "react";

import DMChat from "./DMChat";
import Members from "../channel/Members";

class Chat extends Component {
  render() {
    return (
      <div>
        <div
          className="server-chat-wrapper"
          style={{ position: "absolute", top: "0", overflowX: "auto" }}
        >
          <DMChat />
        </div>
        <div
          className="server-member-wrapper scrollable"
          style={{ position: "absolute", left: "47rem", top: "0" }}
        >
          <Members />
        </div>
      </div>
    );
  }
}

export default Chat;

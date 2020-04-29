import React, { Component } from "react";

class Chat extends Component {
  render() {
    return (
      <div
        className="w-100 h-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#302c2d", overflow: "hidden" }}
      >
        <img src="/assets/image/loading.gif" alt="loading" />
      </div>
    );
  }
}

export default Chat;

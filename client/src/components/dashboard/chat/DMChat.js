import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DMChatHeader from "./DMChatHeader";
import ServerChatContent from "./ServerChatContent";
import ServerChatInput from "./ServerChatInput";
import ServerChatHeader from "./ServerChatHeader";

class DMChat extends Component {
  render() {
    const { view } = this.props.currentView;
    return (
      <div>
        {view === "server" ? (
          <>
            <ServerChatHeader
              removeFunctionReference={this.props.removeFunctionReference}
            />
            <ServerChatContent />
            <ServerChatInput
              socket={this.props.socket}
              serverIDs={this.props.serverIDs}
              userID={this.props.userID}
            />
          </>
        ) : (
          <DMChatHeader />
        )}
      </div>
    );
  }
}

DMChat.propTypes = {
  currentView: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentView: state.currentView,
});

export default connect(mapStateToProps)(DMChat);

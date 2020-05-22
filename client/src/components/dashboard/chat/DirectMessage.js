import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setDMView, setSubView } from "../../../actions/viewAction";
import { getMessages } from "../../../actions/userAction";

import Friends from "../Friend/Friends";
import Channels from "../channel/Channels";

class DirectMessage extends Component {
  render() {
    const { view, selected } = this.props.currentView;
    const { userData, userDataLoading } = this.props.user;
    const directMessages = [];
    if (!userDataLoading && userData) {
      for (let i = 0; i < userData.directMessages.length; i++) {
        directMessages.push(
          <div
            className="friends"
            onClick={() => {
              this.props.setSubView({
                subView: null,
                subViewData: {
                  selectedDM: i,
                },
              });
              this.props.getMessages(userData.directMessages[i].conversation);
              this.props.setDMView();
            }}
            key={userData.directMessages[i].conversation}
          >
            <div className="friendsbox d-flex justify-content-center">
              <div
                style={{ width: "25%", height: "100%" }}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="friendPic">
                  <img
                    src={userData.directMessages[i].user.profilePicture}
                    alt="sp1"
                    className="img-fluid friendProfilePic"
                  />
                </div>
              </div>
              <div
                style={{ width: "70%", height: "100%" }}
                className="d-flex align-items-center pl-2"
              >
                <p className="friendstext">
                  {userData.directMessages[i].user.username}
                </p>
              </div>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="dm scrollable">
        {view === "server" ? (
          <Channels
            selectedServer={selected}
            setFunctionReference={this.props.setFunctionReference}
            removeFunctionReference={this.props.removeFunctionReference}
          />
        ) : (
          <div>
            <Friends />
            {directMessages}
          </div>
        )}
      </div>
    );
  }
}

DirectMessage.propTypes = {
  currentView: PropTypes.object.isRequired,
  setDMView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
  setSubView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentView: state.currentView,
  user: state.user,
});

export default connect(mapStateToProps, {
  setDMView,
  getMessages,
  setSubView,
})(DirectMessage);

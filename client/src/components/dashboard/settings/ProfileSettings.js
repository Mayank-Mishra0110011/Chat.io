import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileDisplayable from "../user/ProfileDisplayable";
import ProfileEditable from "../user/ProfileEditable";

class ProfileSettings extends Component {
  constructor() {
    super();
    this.state = {
      profileEditing: false,
    };
    this.editProfile = this.editProfile.bind(this);
  }
  editProfile(value) {
    this.setState({ profileEditing: value });
  }
  render() {
    const { userDataLoading, userData } = this.props.user;
    let profilePicture, email, username;
    if (!userDataLoading && userData) {
      email = userData.email;
      username = userData.username;
      profilePicture = userData.profilePicture;
    }
    return (
      <div className="container py-5 mt-4">
        {!this.state.profileEditing ? (
          <ProfileDisplayable
            username={username}
            profilePicture={profilePicture}
            email={email}
            editProfile={this.editProfile}
          />
        ) : (
          <ProfileEditable
            username={username}
            profilePicture={profilePicture}
            email={email}
            editProfile={this.editProfile}
            emit={this.props.emit}
            serverIDs={this.props.serverIDs}
          />
        )}
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfileSettings);

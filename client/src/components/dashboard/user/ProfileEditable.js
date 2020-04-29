import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import classnames from "classnames";

import { setProfilePicture, updateProfile } from "../../../actions/userAction";

class ProfileEditable extends Component {
  constructor() {
    super();
    this.state = {
      changePassword: false,
    };
    this.onChange = this.onChange.bind(this);
    this.previewProfile = this.previewProfile.bind(this);
    this.save = this.save.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (state.profilePicture) {
      return {
        profilePicture: state.profilePicture,
        username: props.username,
        email: props.email,
      };
    }
    return {
      profilePicture: props.profilePicture,
      username: props.username,
      email: props.email,
    };
  }
  previewProfile() {
    const profile = document.querySelector(".profile");
    if (profile.classList.contains("remove")) {
      this.setState({ profilePicture: this.props.profilePicture });
      const profilePicture = document.getElementById("profilePicture");
      const item = document.querySelector(".avatar-set");
      profilePicture.src = this.props.profilePicture;
      profilePicture.classList.remove("profile-set");
      profile.title = "No file chosen";
      profile.classList.remove("remove");
      item.classList.add("avatar-not-set");
      item.classList.remove("avatar-set");
      item.innerText = "CHANGE AVATAR";
      document.getElementById("profileBtn").value = "";
    } else {
      document.getElementById("profileBtn").click();
    }
  }
  save() {
    if (this.props.profilePicture !== this.state.profilePicture) {
      this.props.updateProfile(this.state.profilePicture);
      this.props.emit("profileUpdate", {
        userID: this.props.auth.user.id,
        servers: this.props.serverIDs,
        profilePicture: this.state.profilePicture,
      });
      this.props.setProfilePicture(
        this.props.auth.user.id,
        this.state.profilePicture
      );
    }
    this.props.editProfile(false);
  }
  onChange(event) {
    if (event.target.id === "profileBtn") {
      const reader = new FileReader();
      reader.onload = function (e) {
        this.setState({ profilePicture: e.target.result });
      };
      reader.onload = reader.onload.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }
  componentDidMount() {
    document
      .getElementById("profileBtn")
      .addEventListener("change", (event) => {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const profilePicture = document.getElementById("profilePicture");
            const item = document.querySelector(".avatar-not-set");
            profilePicture.parentElement.classList.add("remove");
            profilePicture.parentElement.title = event.target.files[0].name;
            profilePicture.src = e.target.result;
            profilePicture.classList.add("profile-set");
            item.classList.add("avatar-set");
            item.classList.remove("avatar-not-set");
            item.innerText = "REMOVE";
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      });
  }
  render() {
    // might need this later
    // const { errors } = this.props.errors;
    // console.log(this.props.errors);
    return (
      <div>
        <div className="ml-5 mt-2" style={{ width: "8rem" }}>
          <h5 className="text-light py-2">My Account</h5>
        </div>
        <div
          className="d-flex ml-5"
          style={{
            backgroundColor: "rgba(32, 34, 37, 0.3)",
            borderRadius: "5px",
            width: "45rem",
          }}
        >
          <div style={{ width: "11rem" }}>
            <div className="w-100 justify-content-center d-flex py-4">
              <div
                className="profile d-flex"
                data-toggle="tooltip"
                data-placement="bottom"
                title="No file chosen"
                onClick={this.previewProfile}
              >
                <img
                  src={this.state.profilePicture}
                  alt="logoico"
                  id="profilePicture"
                  className="img-fluid"
                />
                <input
                  type="file"
                  className="form-control-file"
                  id="profileBtn"
                  name="profileBtn"
                  accept="image/*"
                  onChange={this.onChange}
                />
                <div className="change-avatar avatar-not-set text-light">
                  CHANGE AVATAR
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4" style={{ width: "34rem" }}>
            <div className="row pb-2 ml-1">
              <p
                className="mb-0"
                style={{
                  color: "#797d82",
                  fontWeight: "bold",
                  fontSize: "small",
                }}
              >
                USERNAME <span className="text-danger">*</span>
              </p>
            </div>
            <div className="row pb-3 ml-1">
              <div className="col-11 pl-0">
                <input
                  className="form-control finput"
                  autoComplete="off"
                  type="text"
                  name="username"
                  id="username"
                  aria-describedby="username"
                  autoFocus
                  value={this.state.username}
                  onChange={this.onChange}
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="row pb-2 ml-1">
              <p
                className="mb-0"
                style={{
                  color: "#797d82",
                  fontWeight: "bold",
                  fontSize: "small",
                }}
              >
                EMAIL <span className="text-danger">*</span>
              </p>
            </div>
            <div className="row pb-3 ml-1">
              <div className="col-11 pl-0">
                <input
                  className="form-control finput"
                  autoComplete="off"
                  type="text"
                  name="email"
                  id="email"
                  aria-describedby="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="row pb-2 ml-1">
              <p
                className="mb-0"
                style={{
                  color: "#797d82",
                  fontWeight: "bold",
                  fontSize: "small",
                }}
              >
                CURRENT PASSWORD <span className="text-danger">*</span>
              </p>
            </div>
            <div className="row pb-3 ml-1">
              <div className="col-11 pl-0">
                <input
                  className="form-control finput"
                  autoComplete="off"
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  aria-describedby="currentPassword"
                  onChange={this.onChange}
                />
              </div>
            </div>
            {this.state.changePassword ? (
              <>
                <div className="row pb-2 ml-1">
                  <p
                    className="mb-0"
                    style={{
                      color: "#797d82",
                      fontWeight: "bold",
                      fontSize: "small",
                    }}
                  >
                    NEW PASSWORD <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="row pb-3 ml-1">
                  <div className="col-11 pl-0">
                    <input
                      className="form-control finput"
                      autoComplete="off"
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      aria-describedby="newPassword"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="row pb-3 ml-1">
                <p
                  className="mb-0 text-light cp-link"
                  onClick={() => {
                    this.setState({
                      changePassword: !this.state.changePassword,
                    });
                  }}
                >
                  Change Password?
                </p>
              </div>
            )}
            <div style={{ width: "95%" }}>
              <div className="d-flex w-100 justify-content-center">
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                  }}
                ></div>
              </div>
            </div>
            <div className="row pt-3 pb-4">
              <div className="col-7">
                <button className="btn btn-outline-danger py-1">
                  Delete Account
                </button>
              </div>
              <div className="col-2 align-items-center d-flex justify-content-center">
                <p
                  className="mb-0 text-light cp-link"
                  onClick={() => {
                    this.props.editProfile(false);
                  }}
                >
                  Cancel
                </p>
              </div>
              <div className="col-2">
                <button className="btn btn-success py-1" onClick={this.save}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileEditable.propTypes = {
  setProfilePicture: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { setProfilePicture, updateProfile })(
  ProfileEditable
);

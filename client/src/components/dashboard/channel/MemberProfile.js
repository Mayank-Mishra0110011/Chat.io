import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { setDefaultView } from "../../../actions/viewAction";

class MemberProfile extends Component {
  constructor() {
    super();
    this.clickListener = this.clickListener.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentDidUpdate() {
    if (this.props.show) {
      const modal = document.getElementById("memberProfileModal");
      modal.classList.add("show");
      modal.style.display = "block";
      modal.style.opacity = "1";
      document.addEventListener("click", this.clickListener);
    }
  }
  sendMessage() {
    const { userData } = this.props.user;
    if (
      userData.directMessages.filter(
        (dm) => dm.user._id === this.props.userData.id
      ).length === 0
    ) {
      axios.post("http://localhost:5000/user/dm/add", {
        receiverID: this.props.userData.id,
      });
    }
    this.props.setDefaultView();
  }
  modalClose() {
    const modal = document.getElementById("memberProfileModal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.style.opacity = "0";
      this.props.showMemberProfile(false);
      document.removeEventListener("click", this.clickListener);
    }
  }
  clickListener(event) {
    if (event.target.id === "memberProfileModal") this.modalClose();
  }
  render() {
    let profilePicture, status, username;
    if (this.props.userData) {
      profilePicture = this.props.userData.profilePicture;
      status = this.props.userData.status;
      username = this.props.userData.username;
    }
    return (
      <div
        className="modal fade"
        id="memberProfileModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content text-light"
            style={{ backgroundColor: "#36393f" }}
          >
            <div className="modal-body d-flex align-items-center flex-column pb-0">
              <div className="profile d-flex">
                <img
                  src={profilePicture}
                  alt="logoico"
                  id="profilePicture"
                  className="img-fluid"
                />
              </div>
              <h5
                className="text-muted py-2 mb-0"
                style={{ fontWeight: "bold" }}
              >
                {username}
              </h5>
              <div className="row w-100 justify-content-center align-items-center">
                <div className={"status " + status} />
                <p className="text-muted mb-0 ml-1">{status}</p>
              </div>
              <div className="row py-3">
                <div
                  className="col-12 d-flex justify-content-center"
                  style={{ height: "2.5rem" }}
                >
                  <button
                    className="btn btn-secondary px-3"
                    type="button"
                    style={{ backgroundColor: "#43b581" }}
                    onClick={this.sendMessage}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MemberProfile.propTypes = {
  user: PropTypes.object.isRequired,
  setDefaultView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { setDefaultView })(MemberProfile);

import React, { Component } from "react";

import MemberProfile from "./MemberProfile";

class MemberOptions extends Component {
  constructor() {
    super();
    this.state = {
      showProfile: false,
    };
    this.showMemberProfile = this.showMemberProfile.bind(this);
  }
  showMemberProfile(value) {
    this.setState({ showProfile: value });
  }
  volumeHandler() {}
  render() {
    return (
      <>
        <div
          className="d-flex align-items-center justify-content-start mt-1 member-option"
          onClick={this.showMemberProfile.bind(this, true)}
        >
          <div
            style={{ width: "100%", height: "100%" }}
            className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center ml-2">
              <p className="friendstext">Profile</p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-start mt-1 member-option">
          <div
            style={{ width: "100%", height: "100%" }}
            className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center ml-2">
              <p className="friendstext">Mention</p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-start mt-1 member-option">
          <div
            style={{ width: "100%", height: "100%" }}
            className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center ml-2">
              <p className="friendstext">Message</p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-start mt-1 member-option">
          <div
            style={{ width: "100%", height: "100%" }}
            className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center ml-2">
              <p className="friendstext">Call</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-1 w-100">
          <div
            className="d-flex align-items-center justify-content-start"
            style={{
              width: "90%",
              height: "1px",
              backgroundColor: "hsla(0, 0%, 100%, 0.06)",
            }}
          ></div>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-content-start mt-1 member-option"
          style={{ height: "3.5rem" }}
        >
          <div
            style={{ width: "100%", height: "100%" }}
            className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center ml-2">
              <p className="friendstext">User Volume</p>
            </div>
          </div>
          <div
            style={{ width: "100%", height: "100%" }}
            className="d-flex align-items-center"
          >
            <input
              type="range"
              min="0"
              max="100"
              value="100"
              className="slider ml-2"
              onChange={this.volumeHandler}
              id="volume"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-1 w-100">
          <div
            className="d-flex align-items-center justify-content-start"
            style={{
              width: "90%",
              height: "1px",
              backgroundColor: "hsla(0, 0%, 100%, 0.06)",
            }}
          ></div>
        </div>
        <div className="d-flex align-items-center justify-content-start mt-1 member-option">
          <div
            style={{ width: "100%", height: "100%" }}
            className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center ml-2">
              <p className="friendstext">Mute</p>
            </div>
            <div
              className="d-flex justify-content-end align-items-center"
              style={{
                flex: "1",
                height: "100%",
              }}
            >
              <div className="o-options d-flex justify-content-end align-items-center not-option mr-2">
                <div className="cb d-flex justify-content-center align-items-center cb-unchecked">
                  <svg
                    name="Checkmark"
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <polyline
                        stroke="transparent"
                        strokeWidth="2"
                        points="3.5 9.5 7 13 15 5"
                      ></polyline>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-start mt-1 member-option">
          <div
            style={{ width: "100%", height: "100%" }}
            className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center ml-2">
              <p className="friendstext">Block</p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-start mt-1 member-option danger-setting">
          <div
            style={{ width: "100%", height: "100%" }}
            className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center ml-2">
              <p
                className="mb-0"
                style={{ fontWeight: "bold", color: "#f04747" }}
              >
                Kick Username
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-1 w-100">
          <div
            className="d-flex align-items-center justify-content-start"
            style={{
              width: "90%",
              height: "1px",
              backgroundColor: "hsla(0, 0%, 100%, 0.06)",
            }}
          ></div>
        </div>
        <div className="d-flex align-items-center justify-content-start mt-1 member-option mb-1">
          <div
            style={{ width: "100%", height: "100%" }}
            className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center ml-2">
              <p className="friendstext">Role</p>
            </div>
            <div
              className="d-flex justify-content-end align-items-center"
              style={{
                flex: "1",
                height: "100%",
              }}
            >
              <div className="o-options d-flex justify-content-end align-items-center not-option mr-2">
                <svg
                  className="caret text-muted"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <MemberProfile
          show={this.state.showProfile}
          userData={this.props.userData}
          showMemberProfile={this.showMemberProfile}
        />
      </>
    );
  }
}

export default MemberOptions;

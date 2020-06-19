import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import ComponentLoading from "../layout/ComponentLoading";

class Invite extends Component {
  constructor() {
    super();
    this.state = {
      inviteStatusLoading: true,
      inviteValid: false,
      serverData: null,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    if (this.state.inviteValid) {
      this.setState({ inviteStatusLoading: true });
      const location = this.props.location.pathname.split("/");
      const id = location[location.length - 1];
      axios
        .post("http://localhost:5000/server/join", { id: id })
        .then((join) => {
          if (join.data.success) {
            this.props.history.push({
              pathname: "/dashboard",
              state: {
                newMember: true,
              },
            });
          } else {
            console.log(join);

            this.props.history.push("/dashboard");
          }
        });
    } else {
      console.log("yeee");

      this.props.history.push("/dashboard");
    }
  }
  componentDidMount() {
    const location = this.props.location.pathname.split("/");
    const id = location[location.length - 1];
    axios
      .post("http://localhost:5000/server/invite/validate", { id: id })
      .then((res) => {
        if (res.data.valid) {
          axios
            .post("http://localhost:5000/server/info", { id: id })
            .then((res) => {
              this.setState({ serverData: res.data });
              this.setState({ inviteStatusLoading: false });
              this.setState({ inviteValid: true });
            });
        } else {
          this.setState({ inviteStatusLoading: false });
        }
      });
  }
  render() {
    const image = this.state.inviteValid ? (
      <img
        className="img-fluid"
        src={this.state.serverData.serverImage}
        alt="valid"
        style={{
          height: "5rem",
          width: "5rem",
          borderRadius: "5rem",
        }}
      />
    ) : (
      <img
        className="img-fluid"
        src="/assets/image/invalid.webp"
        alt="invalid"
        style={{
          height: "5rem",
        }}
      />
    );
    const text = this.state.inviteValid ? (
      <span>
        <h2 className="text-light py-2 mb-2">
          {this.state.serverData.serverName}
        </h2>
        <div className="row justify-content-center mb-3">
          <div
            className="mx-1 px-4 d-flex justify-content-center align-items-center"
            style={{
              height: "2.5rem",
              borderRadius: "5rem",
              backgroundColor: "#202225",
            }}
          >
            <div className="status online"></div>
            <p className="mb-0 ml-2" style={{ color: "#b9bbbe" }}>
              {this.state.serverData.onlineMembers} Online
            </p>
          </div>
          <div
            className="mx-1 px-4 d-flex justify-content-center align-items-center"
            style={{
              height: "2.5rem",
              borderRadius: "5rem",
              backgroundColor: "#202225",
            }}
          >
            <div className="status offline"></div>
            <p className="mb-0 ml-2" style={{ color: "#b9bbbe" }}>
              {this.state.serverData.members}
              {this.state.serverData.members > 1 ? " Members" : " Member"}
            </p>
          </div>
        </div>
        <p className="mb-2 pb-4" style={{ color: "#b9bbbe" }}>
          You have been invited to join.
        </p>
      </span>
    ) : (
      <span>
        <h2 className="text-light py-2 mb-2">Invalid Invite</h2>
        <p className="mb-2 pb-4" style={{ color: "#b9bbbe" }}>
          This invite link is invalid, it may have expired or you might not have
          permission to join.
        </p>
      </span>
    );
    return (
      <div className="wrapper">
        {this.state.inviteStatusLoading ? (
          <ComponentLoading />
        ) : (
          <div
            className="container-fluid pt-5 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "#202225",
              position: "relative",
              height: "100vh",
            }}
          >
            <Link to="/" style={{ position: "absolute", top: "2rem" }}>
              <img
                src="/assets/image/logo.png"
                style={{ height: "5rem" }}
                alt="logo"
                className="img-fluid"
              />
            </Link>
            <div className="container py-4 my-5">
              <div className="row justify-content-center">
                <div
                  className="card mx-3"
                  style={{
                    width: "35rem",
                    cursor: "pointer",
                    backgroundColor: "#36393f",
                  }}
                >
                  <div className="card-body text-center py-5">
                    <div className="pb-3">{image}</div>
                    {text}
                    <button
                      type="submit"
                      className="btn text-light click"
                      style={{ backgroundColor: "#7289DA", width: "18rem" }}
                      onClick={this.clickHandler}
                    >
                      {this.state.inviteValid
                        ? "Continue"
                        : "Continue to Chat.io"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Invite;

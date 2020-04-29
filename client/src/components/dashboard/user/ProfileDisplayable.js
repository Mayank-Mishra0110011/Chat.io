import React, { Component } from "react";

class ProfileDisplayable extends Component {
  render() {
    return (
      <div>
        <div className="ml-5 mt-2" style={{ width: "8rem" }}>
          <h5 className="text-light py-2">My Account</h5>
        </div>
        <div
          className="d-flex ml-5"
          style={{
            backgroundColor: "#292b2f",
            borderRadius: "5px",
            width: "45rem",
          }}
        >
          <div style={{ width: "8rem" }}>
            <div className="w-100 justify-content-center d-flex py-4">
              <div
                className="sample"
                data-toggle="tooltip"
                data-placement="right"
              >
                <img
                  src={this.props.profilePicture}
                  alt="logoico"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="pt-4" style={{ width: "25rem" }}>
            <div className="row ml-1">
              <p
                className="mb-0"
                style={{
                  color: "#797d82",
                  fontWeight: "bold",
                  fontSize: "small",
                }}
              >
                USERNAME
              </p>
            </div>
            <div className="row pb-4 ml-1">
              <p className="mb-0 text-light">{this.props.username}</p>
            </div>
            <div className="row ml-1">
              <p
                className="mb-0"
                style={{
                  color: "#797d82",
                  fontWeight: "bold",
                  fontSize: "small",
                }}
              >
                EMAIL
              </p>
            </div>
            <div className="row ml-1 mb-4">
              <p className="mb-0 text-light">{this.props.email}</p>
            </div>
          </div>
          <div
            className="pt-4 d-flex justify-content-end"
            style={{ width: "10rem", height: "3.7rem" }}
          >
            <button
              type="button"
              className="btn text-light py-1 edit"
              onClick={() => {
                this.props.editProfile(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileDisplayable;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Overview extends Component {
  render() {
    const { servers } = this.props.servers;
    const thisServer = servers[this.props.selected];
    return (
      <div>
        <div className="row ml-5 mt-5" style={{ width: "10rem" }}>
          <h5 className="text-light py-2">Server Overview</h5>
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
              >
                <img
                  src={thisServer.image}
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
                />
                <div className="change-avatar avatar-not-set text-light">
                  CHANGE ICON
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
                Server Name
              </p>
            </div>
            <div className="row pb-3 ml-1">
              <div className="col-11 pl-0">
                <input
                  className="form-control finput"
                  autoComplete="off"
                  type="text"
                  name="servername"
                  id="servername"
                  aria-describedby="servername"
                  autoFocus
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="row pt-3 pb-4">
              <div className="col-2">
                <button className="btn btn-success py-1">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  servers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  servers: state.servers,
});

export default connect(mapStateToProps, {})(Overview);

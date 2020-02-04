import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setServerView } from "../../actions/viewAction";

class Servers extends Component {
  render() {
    return (
      <div className="box">
        <div className="notification" />
        <div
          className="server hover-border"
          data-toggle="tooltip"
          data-placement="right"
          title="serverName"
          onClick={this.props.setServerView}
        >
          <img
            src="./assets/image/sample1.jpg"
            alt="logoico"
            className="img-fluid"
          />
        </div>
      </div>
    );
  }
}

Servers.propTypes = {
  currentView: PropTypes.object.isRequired,
  setServerView: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps, { setServerView })(Servers);

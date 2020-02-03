import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setDefaultView } from "../../actions/viewAction";

class Home extends Component {
  render() {
    return (
      <div className="box">
        <div className="notification notification-selected" />
        <div className="home">
          <div
            className="server"
            data-toggle="tooltip"
            data-placement="right"
            title="Home"
            onClick={this.props.setDefaultView}
          >
            <img src="./favicon.ico" alt="logoico" className="img-fluid" />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  currentView: PropTypes.object.isRequired,
  setDefaultView: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps, { setDefaultView })(Home);

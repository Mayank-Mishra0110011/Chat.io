import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  setServerView,
  setModalOrDropdownClose
} from "../../../actions/viewAction";

class Servers extends Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    const func = this.props.currentView.funcRefs
      .modalOrDropdownFunctionReference;
    if (func) {
      func();
      this.props.setModalOrDropdownClose();
    }
    this.props.setServerView(this.props.id);
  }
  render() {
    const { selected } = this.props.currentView;
    return (
      <div className="box">
        {selected === this.props.id ? (
          <div className="notification notification-selected" />
        ) : (
          <div className="notification" />
        )}
        <div
          className="server hover-border"
          data-toggle="tooltip"
          data-placement="right"
          title={this.props.name}
          onClick={this.clickHandler}
        >
          <img src={this.props.image} alt="logoico" className="img-fluid" />
        </div>
      </div>
    );
  }
}

Servers.propTypes = {
  currentView: PropTypes.object.isRequired,
  setServerView: PropTypes.func.isRequired,
  setModalOrDropdownClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps, {
  setServerView,
  setModalOrDropdownClose
})(Servers);

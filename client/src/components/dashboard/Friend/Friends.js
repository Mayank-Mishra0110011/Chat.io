import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setDefaultView, setSubView } from "../../../actions/viewAction";

class Friends extends Component {
  componentDidMount() {
    [...document.getElementsByClassName("friendsbox")].forEach((friend) => {
      friend.addEventListener("click", function () {
        let active = document.getElementsByClassName("activetab")[0];
        active.classList.remove("activetab");
        this.classList.add("activetab");
      });
    });
  }
  render() {
    return (
      <div
        className="friends"
        onClick={() => {
          this.props.setSubView({
            subView: null,
            subViewData: null,
          });
          this.props.setDefaultView();
        }}
      >
        <div className="friendsbox d-flex justify-content-center align-items-center activetab">
          <p className="friendstext">Direct Messages</p>
        </div>
      </div>
    );
  }
}

Friends.propTypes = {
  currentView: PropTypes.object.isRequired,
  setDefaultView: PropTypes.func.isRequired,
  setSubView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentView: state.currentView,
});

export default connect(mapStateToProps, { setDefaultView, setSubView })(
  Friends
);

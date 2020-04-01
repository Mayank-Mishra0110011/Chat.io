import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setSearchView } from "../../../actions/viewAction";

class SearchServers extends Component {
  render() {
    return (
      <div className="box">
        <div className="notification-none" />
        <div
          className="server d-flex justify-content-center align-items-center anim-serv hover-border"
          data-toggle="tooltip"
          data-placement="right"
          title="Create a Server"
          onClick={this.props.setSearchView}
        >
          <svg aria-hidden="false" width="24" height="24" viewBox="0 0 18 18">
            <path
              fill="#007bff"
              d="M3.60091481,7.20297313 C3.60091481,5.20983419 5.20983419,3.60091481 7.20297313,3.60091481 C9.19611206,3.60091481 10.8050314,5.20983419 10.8050314,7.20297313 C10.8050314,9.19611206 9.19611206,10.8050314 7.20297313,10.8050314 C5.20983419,10.8050314 3.60091481,9.19611206 3.60091481,7.20297313 Z M12.0057176,10.8050314 L11.3733562,10.8050314 L11.1492281,10.5889079 C11.9336764,9.67638651 12.4059463,8.49170955 12.4059463,7.20297313 C12.4059463,4.32933105 10.0766152,2 7.20297313,2 C4.32933105,2 2,4.32933105 2,7.20297313 C2,10.0766152 4.32933105,12.4059463 7.20297313,12.4059463 C8.49170955,12.4059463 9.67638651,11.9336764 10.5889079,11.1492281 L10.8050314,11.3733562 L10.8050314,12.0057176 L14.8073185,16 L16,14.8073185 L12.2102538,11.0099776 L12.0057176,10.8050314 Z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }
}

SearchServers.propTypes = {
  currentView: PropTypes.object.isRequired,
  setSearchView: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps, {
  setSearchView
})(SearchServers);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DMChatContent extends Component {
  render() {
    const { view } = this.props.currentView;
    return (
      <div style={{ height: "80vh", maxWidth: "99%" }} className="scrollable">
        <div className="container py-4 ml-0">
          <div className="row">
            <div className="col-12">
              {view === "server" ? (
                <p className="text-light">
                  Welcome to the begining of
                  <span style={{ fontWeight: "bold" }}> #ChannelName</span>{" "}
                  channel.
                </p>
              ) : (
                <div>
                  <div className="box">
                    <div className="server">
                      <img
                        src="./assets/image/samplepic1.jpg"
                        className="img-fluid"
                        alt="profilePic"
                      />
                    </div>
                  </div>
                  <h1
                    className="text-light py-2"
                    style={{ fontWeight: "bold" }}
                  >
                    Username 1
                  </h1>
                  <p style={{ color: "#8e9297" }}>
                    This is the begining of your direct message history with{" "}
                    <span style={{ fontWeight: "bold" }}>@Username 1.</span>
                  </p>
                </div>
              )}
              <span className="divider py-3">January 21, 2020</span>
            </div>
            <div className="col-12">
              <div
                className="d-flex flex-column"
                style={{ position: "relative", minHeight: "5rem" }}
              >
                <div className="chat-user d-flex justify-content-center align-items-start">
                  <div className="box">
                    <div className="server" style={{ position: "relative" }}>
                      <img
                        src="./assets/image/samplepic1.jpg"
                        className="img-fluid"
                        alt="profilePic"
                      />
                    </div>
                  </div>
                </div>
                <div className="chat-message">
                  <p
                    style={{
                      color: "#8e9297",
                      fontWeight: "bolder"
                    }}
                    className="text-light mb-0"
                  >
                    Username 1{" "}
                    <span
                      style={{
                        color: "#8e9297",
                        fontWeight: "normal",
                        fontSize: "x-small"
                      }}
                      className="ml-1"
                    >
                      Today at 12:10 AM
                    </span>
                  </p>
                </div>
                <div className="chat-message">
                  <p className="text-light mb-0">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur repudiandae, eaque aut cupiditate, magnam
                    consequatur consectetur totam fuga fugiat voluptas deleniti
                    nobis veritatis iure accusamus architecto optio beatae quos
                    iusto?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DMChatContent.propTypes = {
  currentView: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps)(DMChatContent);

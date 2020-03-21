import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DMChatInput extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    const message = this.state.message;
    console.log(message);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { view } = this.props.currentView;
    let ph;
    if (view === "server") {
      ph = "Message #ChannelName";
    } else {
      ph = "Message @Username";
    }
    return (
      <div style={{ maxWidth: "98%" }}>
        <form
          onSubmit={this.onSubmit}
          noValidate
          className="message-input-form mx-3 d-flex"
        >
          <div
            className="scrollable mt-2"
            style={{
              backgroundColor: "#40444b",
              maxHeight: "144px",
              borderRadius: "8px",
              width: "98%"
            }}
          >
            <div className="d-flex">
              <div style={{ width: "0", height: "0", position: "relative" }}>
                <input
                  type="file"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    opacity: "0",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer"
                  }}
                  multiple
                  id="chatUpload"
                  tabIndex="-1"
                />
              </div>
              <div className="upload-btn-wrapper">
                <button
                  type="button"
                  className="chat-btn d-flex"
                  onClick={() => {
                    document.getElementById("chatUpload").click();
                  }}
                >
                  <img
                    src="./assets/image/plus.png"
                    style={{ maxHeight: "1rem" }}
                    alt="plus"
                  />
                </button>
              </div>
              <input
                type="textarea"
                placeholder={ph}
                style={{
                  height: "44px",
                  width: "90%",
                  background: "transparent",
                  borderRadius: "8px"
                }}
                id="message"
                name="message"
                onChange={this.onChange}
                className="d-flex align-items-center pl-2"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

DMChatInput.propTypes = {
  currentView: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentView: state.currentView
});

export default connect(mapStateToProps)(DMChatInput);

import React, { Component } from "react";

class ImageEmbed extends Component {
  render() {
    return (
      <div className="mt-2 embed d-flex px-2">
        <div className="py-2" style={{ maxWidth: "25rem" }}>
          <img
            className="img-fluid"
            style={{ borderRadius: "3px" }}
            src={this.props.data}
            alt="messageImage"
          ></img>
        </div>
      </div>
    );
  }
}

export default ImageEmbed;

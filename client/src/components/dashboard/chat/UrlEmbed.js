import React, { Component } from "react";
import classnames from "classnames";

import ComponentLoading from "../../layout/ComponentLoading";

import axios from "axios";

class UrlEmbed extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      image: null,
      description: null,
      title: null,
      siteName: null,
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:5000/channel/message/meta", {
        url: this.props.url,
      })
      .then((res) => {
        const { title, image, description, siteName } = res.data;
        this.setState({
          loaded: true,
          title: title,
          image: image,
          description: description,
          siteName: siteName,
        });
      });
  }
  componentDidUpdate() {
    this.props.scroll();
  }
  render() {
    return (
      <div
        className={classnames("mt-2 embed d-flex px-2", {
          "embed-loading": !this.state.loaded,
        })}
      >
        {this.state.loaded ? (
          <>
            <div
              className="d-flex flex-column px-2 py-2"
              style={{ width: "70%" }}
            >
              <p className="text-muted">{this.state.siteName}</p>
              <a href={this.props.url}>{this.state.title}</a>
              <p className="text-muted pt-2">
                {this.state.description.length > 138
                  ? this.state.description.slice(0, 138) + "..."
                  : this.state.description}
              </p>
            </div>
            <div className="py-2" style={{ width: "30%" }}>
              <img
                className="img-fluid"
                style={{ borderRadius: "3px" }}
                src={this.state.image}
                alt="previewImage"
              ></img>
            </div>
          </>
        ) : (
          <ComponentLoading />
        )}
      </div>
    );
  }
}

export default UrlEmbed;

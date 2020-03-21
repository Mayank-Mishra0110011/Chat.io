import React, { Component } from "react";

class SearchServersContent extends Component {
  constructor() {
    super();
    this.state = {
      searchServer: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    document
      .getElementById("searchServer")
      .addEventListener("keydown", event => {
        if (event.key === "Enter") {
          // xhr request to the server
          console.log(event.target.value);
        }
      });
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const searchText = this.state.searchServer;
    return (
      <div className="container-fluid text-light">
        <div className="row justify-content-center pt-5">
          <div className="col-lg-11 col-md-11 col-sm-10 col-12 text-center pb-3">
            <h1 className="py-2">Find new communities</h1>
          </div>
          <div className="col-lg-10 col-md-11 col-sm-10 col-12">
            <div className="form-group">
              <input
                className="form-control finput"
                autoComplete="off"
                type="text"
                name="searchServer"
                id="searchServer"
                aria-describedby="searchServer"
                autoFocus
                placeholder="Try Searching a community"
                onChange={this.onChange}
              />
            </div>
          </div>
          {searchText.length > 0 ? (
            <div className="col-lg-10 col-md-11 col-sm-10 col-12">
              <p style={{ color: "#4f545c" }}>
                Press{" "}
                <span style={{ fontWeight: "bolder", fontSize: "large" }}>
                  Enter
                </span>{" "}
                to search
              </p>
            </div>
          ) : null}
          <div className="col-lg-10 col-md-11 col-sm-10 col-12">
            <p style={{ fontWeight: "bold" }}>20 Results for "Fortnite"</p>
          </div>
        </div>
        <div className="row justify-content-center">
          {/* Yeet card divs below from search results */}
          <div className="col-lg-4 col-md-5 col-sm-7 col-10 px-2 py-2">
            <div className="card mx-3 my-4 server-card">
              <div className="w-100">
                <img
                  src="https://wallpapercave.com/wp/3JYJQMC.jpg"
                  alt="community"
                  style={{ width: "100%", maxHeight: "10rem" }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title text-light pb-1 mb-1">Server Name</h5>
                <div style={{ height: "7rem" }}>
                  <p
                    className="card-text"
                    style={{ color: "#99aab5", fontSize: "small" }}
                  >
                    Server Description
                  </p>
                </div>
                <div
                  className="d-flex w-100 justify-content-between"
                  style={{ fontSize: "small" }}
                >
                  <div className="d-flex align-items-center">
                    <div className="status online mr-1" /> 12230 online
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="status offline mr-1" /> 54903 Members
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchServersContent;

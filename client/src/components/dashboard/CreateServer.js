import React, { Component } from "react";

class CreateServer extends Component {
  constructor() {
    super();
    this.state = {
      view: "default",
      serverIcon: "",
      serverName: "",
      invite: ""
    };
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.clickListener = this.clickListener.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
    document.addEventListener("keydown", this.handleEsc);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEsc);
  }
  handleEsc(event) {
    if (event.key === "Escape") this.modalClose();
  }
  onChange(event) {
    if (event.target.id === "serverIcon") {
      const reader = new FileReader();
      reader.fileName = event.target.files[0];
      reader.onload = function(e) {
        document.getElementById("serverIconPreview").src = e.target.result;
        document.getElementById("fileTitle").title = e.target.fileName.name;
        this.setState({ serverIcon: e.target.result });
      };
      reader.onload = reader.onload.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }
  handleClick(key, value) {
    if (key === "serverIcon") {
      document.getElementById("serverIconPreview").src = "";
      document.getElementById("fileTitle").title = "No File Chosen";
    }
    this.setState({ [key]: value });
  }
  clickListener(event) {
    if (event.target.id === "createServerModal") this.modalClose();
  }
  modalOpen() {
    let modal = document.getElementById("createServerModal");
    modal.classList.add("show");
    modal.style.display = "block";
    modal.style.opacity = "1";
    document.addEventListener("click", this.clickListener);
  }
  modalClose() {
    this.setState({
      view: "default",
      serverIcon: "",
      invite: "",
      serverName: ""
    });
    let modal = document.getElementById("createServerModal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.style.opacity = "0";
      document.removeEventListener("click", this.clickListener);
      const thisElement = document.getElementById("createServer")
        .previousElementSibling;
      thisElement.classList.remove("notification");
      thisElement.classList.remove("notification-selected");
      thisElement.classList.add("notification-none");
    }
  }
  render() {
    const { view, serverIcon } = this.state;
    return (
      <div>
        <div className="box">
          <div className="notification-none" />
          <div
            className="server d-flex justify-content-center align-items-center anim-serv hover-border"
            data-toggle="tooltip"
            data-placement="right"
            id="createServer"
            title="Create a Server"
            onClick={this.modalOpen}
          >
            <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#007bff"
                d="M21 11.001H13V3.00098H11V11.001H3V13.001H11V21.001H13V13.001H21V11.001Z"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className="modal fade"
          id="createServerModal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content cs-content text-primary">
              <div className="modal-header">
                <div
                  className="d-flex justify-content-center"
                  style={{ width: "100%" }}
                >
                  {view === "default" ? (
                    <h5 className="modal-title text-center">
                      Create Another Server?
                    </h5>
                  ) : view === "create" ? (
                    <div className="d-flex flex-column">
                      <h5 className="modal-title text-center">
                        CREATE YOUR SERVER
                      </h5>
                      <p
                        className="modal-title pt-2 text-center"
                        style={{ color: "#99aab5" }}
                      >
                        By creating a server you will have access to voice and
                        text chat to use amongst your friends.
                      </p>
                    </div>
                  ) : (
                    <div className="d-flex flex-column">
                      <h5 className="modal-title text-success text-center">
                        JOIN A SERVER
                      </h5>
                      <p
                        className="modal-title pt-2 text-center"
                        style={{ color: "#99aab5" }}
                      >
                        Enter an invite below to join an existing server. The
                        invite will look something like these:
                      </p>
                      <p
                        className="modal-title pt-1 text-center"
                        style={{ color: "#7289da" }}
                      >
                        hTKzmak
                      </p>
                      <p
                        className="modal-title pt-1 text-center pb-0"
                        style={{ color: "#7289da" }}
                      >
                        chat.io/hTKzmak
                      </p>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="close text-primary"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.modalClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body d-flex">
                {view === "default" ? (
                  <>
                    <div
                      className="card mx-3"
                      style={{ width: "15rem", cursor: "pointer" }}
                      onClick={this.handleClick.bind(this, "view", "create")}
                    >
                      <div className="card-body text-center">
                        <h5 className="card-title text-primary py-1">Create</h5>
                        <p className="card-text" style={{ color: "#99aab5" }}>
                          Create a new server and invite your friends.
                        </p>
                        <div className="pb-3">
                          <img
                            className="img-fluid"
                            src="https://freepngimg.com/download/social_media/63004-icons-media-myspace-computer-design-social-icon.png"
                            alt="community"
                            style={{ maxHeight: "5rem" }}
                          />
                        </div>
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                        >
                          Create a server
                        </button>
                      </div>
                    </div>
                    <div
                      className="card mx-3"
                      style={{ width: "15rem", cursor: "pointer" }}
                      onClick={this.handleClick.bind(this, "view", "join")}
                    >
                      <div className="card-body text-center">
                        <h5 className="card-title text-success py-1">Join</h5>
                        <p className="card-text" style={{ color: "#99aab5" }}>
                          Enter an invite and join your friend's server.
                        </p>
                        <div className="pb-3">
                          <img
                            className="img-fluid"
                            src="https://i.pinimg.com/originals/2c/c8/64/2cc864751ff78d3129a4baf740468704.png"
                            alt="community"
                            style={{ maxHeight: "5rem" }}
                          />
                        </div>
                        <button
                          className="btn btn-outline-success"
                          type="button"
                        >
                          Join a server
                        </button>
                      </div>
                    </div>
                  </>
                ) : view === "create" ? (
                  <div className="container">
                    <div className="row">
                      <div className="col-6" style={{ height: "15rem" }}>
                        <div className="form-group pb-2">
                          <label
                            htmlFor="serverName"
                            className="text-muted"
                            style={{ fontWeight: "bold" }}
                          >
                            SERVER NAME
                          </label>
                          <input
                            className="form-control finput text-dark"
                            autoComplete="off"
                            type="text"
                            name="serverName"
                            id="serverName"
                            aria-describedby="serverName"
                            value={this.state.serverName}
                            onChange={this.onChange}
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="col-6" style={{ height: "15rem" }}>
                        <div
                          className="box d-flex justify-content-center flex-column"
                          style={{ height: "15rem" }}
                        >
                          <p
                            className="text-muted"
                            style={{ fontWeight: "bold" }}
                          >
                            SERVER ICON
                          </p>
                          <input
                            type="file"
                            className="form-control-file"
                            id="serverIcon"
                            name="serverIcon"
                            accept="image/*"
                            style={{
                              width: "0",
                              height: "0",
                              visibility: "hidden"
                            }}
                            onChange={this.onChange}
                          />
                          <div
                            className="server cs-server"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="No File Chosen"
                            id="fileTitle"
                            style={{
                              width: "8rem",
                              height: "8rem",
                              border: "5px solid #ebebeb",
                              backgroundColor: "rgb(114, 137, 218)"
                            }}
                            onClick={() =>
                              document.getElementById("serverIcon").click()
                            }
                          >
                            <img
                              src={serverIcon}
                              alt=""
                              className="img-fluid"
                              id="serverIconPreview"
                            />
                          </div>
                          {serverIcon === "" ? null : (
                            <p
                              className="pt-1"
                              style={{
                                fontWeight: "bold",
                                cursor: "pointer",
                                color: "#b9bbbe"
                              }}
                              onClick={this.handleClick.bind(
                                this,
                                "serverIcon",
                                ""
                              )}
                            >
                              Remove
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-12 d-flex justify-content-between"
                        style={{ height: "2.5rem" }}
                      >
                        <button
                          className="btn btn-secondary px-3"
                          type="button"
                          onClick={this.handleClick.bind(
                            this,
                            "view",
                            "default"
                          )}
                        >
                          Back
                        </button>
                        <button className="btn btn-primary px-4" type="button">
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="container">
                    <div className="row">
                      <div className="col-12" style={{ height: "7rem" }}>
                        <div className="form-group pb-2">
                          <input
                            className="form-control finput text-dark"
                            autoComplete="off"
                            type="text"
                            name="invite"
                            id="invite"
                            aria-describedby="invite"
                            autoFocus
                            value={this.state.invite}
                            onChange={this.onChange}
                          />
                          <label
                            htmlFor="invite"
                            className="text-muted"
                            style={{ fontWeight: "bold", fontSize: "x-small" }}
                          >
                            Enter an invite
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-12 d-flex justify-content-between"
                        style={{ height: "2.5rem" }}
                      >
                        <button
                          className="btn btn-secondary px-3"
                          type="button"
                          onClick={this.handleClick.bind(
                            this,
                            "view",
                            "default"
                          )}
                        >
                          Back
                        </button>
                        <button className="btn btn-success px-4" type="button">
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateServer;

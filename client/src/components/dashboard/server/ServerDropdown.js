import React, { Component } from "react";

class ServerDropdown extends Component {
  constructor() {
    super();
    this.openInviteModal = this.openInviteModal.bind(this);
    this.closeInviteModal = this.closeInviteModal.bind(this);
    this.clickListener = this.clickListener.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
    document.addEventListener("keydown", this.handleEsc);
  }
  openInviteModal() {
    this.props.removeFunctionReference("modalFunc");
    const modal = document.getElementById("inviteModal");
    modal.classList.add("show");
    modal.style.display = "block";
    modal.style.opacity = "1";
    document.addEventListener("click", this.clickListener);
  }
  clickListener(event) {
    if (event.target.id === "inviteModal") this.closeInviteModal();
  }
  closeInviteModal() {
    const modal = document.getElementById("inviteModal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.style.opacity = "0";
      document.removeEventListener("click", this.clickListener);
    }
  }
  handleEsc(event) {
    if (event.key === "Escape") this.closeInviteModal();
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEsc);
  }
  render() {
    return (
      <div className="server-setting-dropdown">
        <div className="friends" style={{ height: "7vh" }}>
          <div
            className={"server-option d-flex mt-1"}
            style={{ borderRadius: "3px" }}
            onClick={this.openInviteModal}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex align-items-center"
            >
              <div className="d-flex align-items-center ml-2">
                <p className="friendstext" style={{ color: "#7289da" }}>
                  Invite People
                </p>
              </div>
              <div
                className="d-flex justify-content-end align-items-center"
                style={{
                  flex: "1",
                  height: "100%",
                }}
              >
                <div className="o-options d-flex justify-content-end align-items-center not-option mr-2">
                  <svg
                    aria-hidden="false"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#7289da"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="friends" style={{ height: "7vh" }}>
          <div
            className={"server-option d-flex mt-1"}
            style={{ borderRadius: "3px" }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex align-items-center"
            >
              <div className="d-flex align-items-center ml-2">
                <p className="friendstext">Server Settings</p>
              </div>
              <div
                className="d-flex justify-content-end align-items-center"
                style={{
                  flex: "1",
                  height: "100%",
                }}
              >
                <div className="o-options d-flex justify-content-end align-items-center not-option mr-2">
                  <img
                    src="./assets/image/settings.svg"
                    alt="sp1"
                    className="img-fluid channel-settings"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="friends" style={{ height: "7vh" }}>
          <div
            className={"server-option d-flex mt-1"}
            style={{ borderRadius: "3px" }}
            onClick={() => {
              document.getElementById("dropref").click();
            }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex align-items-center"
            >
              <div className="d-flex align-items-center ml-2">
                <p className="friendstext">Create Channel</p>
              </div>
              <div
                className="d-flex justify-content-end align-items-center"
                style={{
                  flex: "1",
                  height: "100%",
                }}
              >
                <div className="o-options d-flex justify-content-end align-items-center not-option mr-2">
                  <img
                    src="./assets/image/plus.png"
                    alt="sp1"
                    className="img-fluid channel-settings"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-1">
          <div
            className="d-flex align-items-center justify-content-start"
            style={{
              width: "90%",
              height: "1px",
              backgroundColor: "hsla(0, 0%, 100%, 0.06)",
            }}
          ></div>
        </div>
        <div className="friends" style={{ height: "7vh" }}>
          <div
            className={"server-option d-flex mt-1"}
            style={{ borderRadius: "3px" }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex align-items-center"
            >
              <div className="d-flex align-items-center ml-2">
                <p className="friendstext">Notification Settings</p>
              </div>
              <div
                className="d-flex justify-content-end align-items-center"
                style={{
                  flex: "1",
                  height: "100%",
                }}
              >
                <div className="o-options d-flex justify-content-end align-items-center not-option mr-2">
                  <svg
                    aria-hidden="false"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill="#8e9297"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18 9V14C18 15.657 19.344 17 21 17V18H3V17C4.656 17 6 15.657 6 14V9C6 5.686 8.686 3 12 3C15.314 3 18 5.686 18 9ZM11.9999 21C10.5239 21 9.24793 20.19 8.55493 19H15.4449C14.7519 20.19 13.4759 21 11.9999 21Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="friends" style={{ height: "7vh" }}>
          <div
            className={"server-option d-flex mt-1"}
            style={{ borderRadius: "3px" }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex align-items-center"
            >
              <div className="d-flex align-items-center ml-2">
                <p className="friendstext">Privacy Settings</p>
              </div>
              <div
                className="d-flex justify-content-end align-items-center"
                style={{
                  flex: "1",
                  height: "100%",
                }}
              >
                <div className="o-options d-flex justify-content-end align-items-center not-option mr-2">
                  <svg
                    aria-hidden="false"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#8e9297"
                      d="M19 6.00001C15.56 6.00001 12.826 2.43501 12.799 2.39801C12.421 1.89801 11.579 1.89801 11.201 2.39801C11.174 2.43501 8.44 6.00001 5 6.00001C4.447 6.00001 4 6.44801 4 7.00001V14C4 17.807 10.764 21.478 11.534 21.884C11.68 21.961 11.84 21.998 12 21.998C12.16 21.998 12.32 21.96 12.466 21.884C13.236 21.478 20 17.807 20 14V7.00001C20 6.44801 19.553 6.00001 19 6.00001ZM15 16L12 14L9 16L10 13L8 11H11L12 8.00001L13 11H16L14 13L15 16Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-1">
          <div
            className="d-flex align-items-center justify-content-start"
            style={{
              width: "90%",
              height: "1px",
              backgroundColor: "hsla(0, 0%, 100%, 0.06)",
            }}
          ></div>
        </div>
        <div className="friends" style={{ height: "7vh" }}>
          <div
            className={"server-option d-flex mt-1"}
            style={{ borderRadius: "3px" }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex align-items-center"
            >
              <div className="d-flex align-items-center ml-2">
                <p className="friendstext">Hide Muted Channels</p>
              </div>
              <div
                className="d-flex justify-content-end align-items-center"
                style={{
                  flex: "1",
                  height: "100%",
                }}
              >
                <div className="o-options d-flex justify-content-end align-items-center not-option mr-2">
                  <div className="cb d-flex justify-content-center align-items-center cb-unchecked">
                    <svg
                      name="Checkmark"
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <polyline
                          stroke="transparent"
                          strokeWidth="2"
                          points="3.5 9.5 7 13 15 5"
                        ></polyline>
                      </g>
                    </svg>
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

export default ServerDropdown;

import React, { Component } from "react";

class ServerDropdown extends Component {
  render() {
    return (
      <div className="server-setting-dropdown">
        <div className="friends" style={{ height: "7vh" }}>
          <div
            className={"status-option d-flex mt-1"}
            style={{ borderRadius: "3px" }}
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
                  height: "100%"
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
            className={"status-option d-flex mt-1"}
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
                  height: "100%"
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
            className={"status-option d-flex mt-1"}
            style={{ borderRadius: "3px" }}
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
                  height: "100%"
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
        <div className="friends" style={{ height: "7vh" }}>
          <div
            className={"status-option d-flex mt-1"}
            style={{ borderRadius: "3px" }}
          >
            <div
              style={{ width: "100%", height: "100%" }}
              className="d-flex align-items-center"
            >
              <div className="d-flex align-items-center ml-2">
                <p className="friendstext">Create Category</p>
              </div>
              <div
                className="d-flex justify-content-end align-items-center"
                style={{
                  flex: "1",
                  height: "100%"
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
                      d="M20 7H12L10.553 5.106C10.214 4.428 9.521 4 8.764 4H3C2.447 4 2 4.447 2 5V19C2 20.104 2.895 21 4 21H20C21.104 21 22 20.104 22 19V9C22 7.896 21.104 7 20 7ZM16 15H13V18H11V15H8V13H11V10H13V13H16V15Z"
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
              backgroundColor: "hsla(0, 0%, 100%, 0.06)"
            }}
          ></div>
        </div>
        <div className="friends" style={{ height: "7vh" }}>
          <div
            className={"status-option d-flex mt-1"}
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
                  height: "100%"
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
            className={"status-option d-flex mt-1"}
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
                  height: "100%"
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
              backgroundColor: "hsla(0, 0%, 100%, 0.06)"
            }}
          ></div>
        </div>
        <div className="friends" style={{ height: "7vh" }}>
          <div
            className={"status-option d-flex mt-1"}
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
                  height: "100%"
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
      </div>
    );
  }
}

export default ServerDropdown;

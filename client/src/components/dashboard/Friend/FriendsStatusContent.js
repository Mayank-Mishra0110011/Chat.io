import React, { Component } from "react";

class FriendsStatusContent extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "80vh" }} className="scrollable">
        <div className="friend-status-options d-flex align-items-center">
          <div
            style={{
              width: "100%",
              height: "80%",
              borderBottom: "1px solid #42454b"
            }}
          >
            <div
              style={{ width: "60rem", height: "100%", position: "relative" }}
            >
              <div
                style={{ width: "15rem", height: "100%" }}
                className="d-flex justify-content-around align-items-center"
              >
                <div
                  style={{ width: "23%", height: "100%" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div className="friendPic">
                    <img
                      src="./assets/image/samplePic6.jpeg"
                      alt="sp1"
                      className="img-fluid friendProfilePic"
                    />
                  </div>
                </div>
                <div
                  style={{ width: "70%", height: "100%" }}
                  className="d-flex align-items-center pl-2"
                >
                  <p className="friendstext">Username 1</p>
                </div>
              </div>
              <div
                style={{
                  width: "15rem",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "15rem"
                }}
                className="d-flex justify-content-around align-items-center"
              >
                <div
                  style={{ width: "20%", height: "100%" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div className="status dnd" />
                </div>
                <div
                  style={{ width: "80%", height: "100%" }}
                  className="d-flex flex-column align-items-start justify-content-center"
                >
                  <p className="friendstext" style={{ fontSize: "small" }}>
                    Do Not Disturb
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "30rem",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "30rem"
                }}
                className="d-flex justify-content center align-items-center"
              >
                <div
                  style={{ width: "11%", height: "100%" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div className="friendPic">
                    <img
                      src="./assets/image/sample6.jpg"
                      alt="s6"
                      className="img-fluid friendProfilePic"
                    />
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

export default FriendsStatusContent;

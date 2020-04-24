import React, { Component } from "react";

class Invite extends Component {
  render() {
    return (
      <div
        className="modal fade"
        id="inviteModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content text-light"
            style={{ backgroundColor: "#36393f" }}
          >
            <div className="modal-header pb-0">
              <div style={{ width: "100%" }}>
                <p className="modal-title" style={{ fontWeight: "bold" }}>
                  INVITE FRIENDS TO SERVERNAME
                </p>
              </div>
            </div>
            <div className="modal-body d-flex justify-content-start flex-column pb-0">
              <p className="friendstext" style={{ fontSize: "small" }}>
                INVITE LINK
              </p>
              <div
                className="d-flex justify-content-around align-items-center"
                style={{
                  height: "4rem",
                  width: "100%",
                }}
              >
                <input
                  className="form-control invite mr-2"
                  autoComplete="off"
                  type="text"
                  readOnly
                  id="inviteLink"
                  name="inviteLink"
                  value={
                    "localhost:3000/invite/" +
                    this.props.servers[this.props.selectedServer]._id
                  }
                  aria-describedby="inviteLink"
                  onClick={() => {
                    const elm = document.getElementById("inviteLink");
                    elm.select();
                    elm.setSelectionRange(0, elm.value.length);
                  }}
                />
                <button
                  className="btn px-4"
                  type="button"
                  id="cpybtn"
                  style={{ backgroundColor: "#7289da", color: "white" }}
                  onClick={() => {
                    const inviteLink = document.getElementById("inviteLink");
                    inviteLink.click();
                    document.execCommand("copy");
                    const cpyBtn = document.getElementById("cpybtn");
                    inviteLink.style.borderColor = "#3ca374";
                    cpyBtn.style.backgroundColor = "#3ca374";
                    cpyBtn.innerText = "Copied";
                    const interval = setInterval(changeColor, 1000);
                    function changeColor() {
                      inviteLink.style.borderColor = "#000000";
                      cpyBtn.style.backgroundColor = "#7289da";
                      cpyBtn.innerText = "Copy";
                      clearInterval(interval);
                    }
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Invite;

import React, { Component } from "react";

class ChatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg_list: [],
      user_list: [],
      active_user: [],
    };
    this.handleEve = this.handleEve.bind(this);
    this.subscribeToPusher = this.subscribeToPusher.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.loadChats = this.loadChats.bind(this);
    this.getActiveUser = this.getActiveUser.bind(this);
  }

  componentDidMount() {
    this.loadUsers();
    this.subscribeToPusher();
  }

  getActiveUser() {
    if (this.state.active_user.length === 0) {
      return null;
    } else {
      return this.state.active_user[0];
    }
  }

  loadUsers() {
    let tok = document.querySelector('meta[name="csrf-token"]').content;
    fetch("http://127.0.0.1:8000/fetchUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        X_CSRF_TOKEN: tok,
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((dat) => {
        this.setState((prevState) => ({
          user_list: prevState.user_list.concat(dat),
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadChats(event) {
    let clicked_user_id = event.target.id;
    clicked_user_id = clicked_user_id.substr(5, clicked_user_id.length);

    for (var eu = 0; eu < this.state.user_list.length; eu++) {
      if (this.state.user_list[eu].id === clicked_user_id) {
        this.setState({
          active_user: [this.state.user_list[eu]],
        });
        break;
      }
    }
    let tok = document.querySelector('meta[name="csrf-token"]').content;

    fetch("http://127.0.0.1:8000/fetchmessages?rec_id=" + clicked_user_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        X_CSRF_TOKEN: tok,
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((dat) => {
        this.setState({ msg_list: dat });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleEve() {
    let msg = document.getElementById("chat_tbox").value;
    let tok = document.querySelector('meta[name="csrf-token"]').content;
    let activeUserId = this.getActiveUser().id;

    fetch(
      "http://127.0.0.1:8000/messages?message=" +
        msg +
        "&rec_id=" +
        activeUserId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": tok,
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((dat) => {
        console.log("from handleve : " + JSON.stringify(dat));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  subscribeToPusher() {
    var new_msg = [];
    var channel = pusher.subscribe("private-chat-" + user.id);
    channel.bind("App\\Events\\MessageEvent", (d) => {
      //checking sent message from sender side
      if (d.sender_id === user.id) {
        if (this.state.active_user[0].id === d.rec_id) {
          this.setState((prevState) => ({
            msg_list: prevState.msg_list.concat(d),
          }));
        }
      }

      //checking message has been received or not
      if (d.sender_id !== user.id) {
        if (this.state.active_user.length !== 0) {
          if (this.state.active_user[0].id === d.sender_id) {
            this.setState((prevState) => ({
              msg_list: prevState.msg_list.concat(d),
            }));
          } else {
            var id_to_notify = document.getElementById("user_" + d.sender_id);
          }
        } else {
          alert("no active user, you got a new message : " + d.message);
        }
      }
    });
  }

  render() {
    let isAnyUserActive = this.state.active_user.length !== 0;
    let activeUserName = isAnyUserActive
      ? this.state.active_user[0].name
      : "no active";

    return (
      <>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-3">
              <div className="card">
                <div className="card-header">card header</div>
                <div className="card-body">
                  <ul id="user_list" className="user_list list-group">
                    {this.state.user_list.map((number) => (
                      <a href="#" key={"user_" + number.id}>
                        <li
                          id={"user_" + number.id}
                          onClick={this.loadChats}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {number.name}
                          <span className="badge badge-primary badge-pill">
                            14
                          </span>
                        </li>
                      </a>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-header">{activeUserName}</div>
                <div className="card-body">
                  <ul id="chat_list" className="chat_list">
                    {this.state.msg_list.map((msgs) =>
                      msgs.sender_id === user.id ? (
                        <div className="sent" id={msgs.id} key={msgs.id}>
                          {msgs.message}
                        </div>
                      ) : (
                        <div className="replies" id={msgs.id} key={msgs.id}>
                          {msgs.message}
                        </div>
                      )
                    )}
                  </ul>
                </div>
                <div className="card-footer">
                  <input
                    type="text"
                    id="chat_tbox"
                    className="form-control"
                    placeholder="Enter message..."
                  />
                  <input
                    type="submit"
                    className="btn btn-primary btn-sm"
                    value="GO"
                    onClick={this.handleEve}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ChatPanel;

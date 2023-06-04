import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../../context/useStateContext";

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let allMessages = [];
  const { user } = useStateContext();

  useEffect(() => {
    // Pusher.logToConsole = true;

    const pusher = new Pusher("95a4e02b51b0197bd931", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      allMessages.push(data);
      setMessages(allMessages);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    axiosClient
      .post("messages", {
        username: user.name,
        message,
      })
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <input
            className="fs-5 fw-semibold"
            disabled
            value={user.name} // Display the value of username
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="list-group list-group-flush border-bottom">
          {messages.map((message) => {
            return (
              <div
                className="list-group-item list-group-item-action py-3 lh-tight"
                key={message.id}
              >
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <strong className="mb-1">{message.username}</strong>
                </div>
                <div className="col-10 mb-1 small">{message.message}</div>
              </div>
            );
          })}
        </div>
      </div>
      <form onSubmit={(e) => submit(e)}>
        <input
          className="form-control"
          placeholder="Write a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;

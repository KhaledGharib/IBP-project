import Pusher from "pusher-js";
import { useEffect, useState, useRef } from "react";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesContainerRef = useRef(null);
  const { user } = useStateContext();

  useEffect(() => {
    const pusher = new Pusher("95a4e02b51b0197bd931", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
      <div className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center p-3">
          <input
            className="fs-5 fw-semibold"
            disabled
            value={user.name}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div
          className="list-group list-group-flush border-bottom overflow-auto"
          style={{ maxHeight: "400px" }}
          ref={messagesContainerRef}
        >
          {messages.map((message) => (
            <div
              className="list-group-item list-group-item-action py-3 lh-tight"
              key={message.id}
            >
              <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1">{message.username}</strong>
              </div>
              <div className="col-10 mb-1 small">{message.message}</div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={submit} className="mt-5">
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

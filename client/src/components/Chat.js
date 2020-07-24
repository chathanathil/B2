import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

let socket;

const Chat = ({ location }) => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:8000/";

  useEffect(() => {
    socket = io(ENDPOINT);
    // This api will fetch all messages from db, not it will give err bz not connected to any db
    axios
      .get("http://localhost:8000/company/messages")
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));

    socket.on("message", (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit(
        "sendMessage",
        {
          message,
          sender: "23", // Specify sender id here,
          receiver: "11", // Specify reciever id here
        },
        () => setMessage("")
      );
      setMessages([...messages, { sender: "23", reciever: "11", message }]);
    }
  };

  return (
    <div>
      {messages.map((item, index) => (
        <p key={index}>{item.message}</p>
      ))}
      <input
        className="input"
        type="text"
        placeholder="Text here"
        required
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={(event) => sendMessage(event)}>Send</button>
    </div>
  );
};

export default Chat;

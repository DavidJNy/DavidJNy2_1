import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const Chatroom = ({ chatroomId, username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = io("http://localhost:3005"); // Correct the URL to match the server

    ws.current.on("connect", () => {
      console.log("Connected to WebSocket server");
      ws.current.emit("joinRoom", chatroomId);
    });

    ws.current.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    ws.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    ws.current.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    return () => {
      ws.current.disconnect();
    };
  }, [chatroomId, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const message = {
        chatroomId,
        sender: username,
        text: input,
      };
      ws.current.emit("chatMessage", message);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chatroom</h2>
      <div>
        <h3>Messages</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}:</strong> {msg.text}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatroom;

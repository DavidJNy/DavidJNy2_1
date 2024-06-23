import React, { useEffect, useState, useRef } from "react";

const Chatroom = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3001");

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: "new_user", username }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "message":
          setMessages((prevMessages) => [
            ...prevMessages,
            { username: data.username, message: data.message },
          ]);
          break;
        case "users":
          setUsers(data.users);
          break;
        default:
          break;
      }
    };

    return () => {
      ws.current.close();
    };
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ws.current.send(
      JSON.stringify({ type: "message", username, message: input })
    );
    setInput("");
  };

  return (
    <div>
      <h2>Chatroom</h2>
      <div>
        <h3>Users</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Messages</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.username}:</strong> {msg.message}
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

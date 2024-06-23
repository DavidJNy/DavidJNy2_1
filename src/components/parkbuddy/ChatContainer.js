// App.js
import React, { useState } from "react";
import Chatroom from "./Chatroom";

const App = () => {
  const [currentChatroom, setCurrentChatroom] = useState(null);
  const [username, setUsername] = useState("");

  const chatrooms = [
    { id: 1, name: "Chatroom 1" },
    { id: 2, name: "Chatroom 2" },
    { id: 3, name: "Chatroom 3" },
    { id: 4, name: "Chatroom 4" },
    { id: 5, name: "Chatroom 5" },
    { id: 6, name: "Chatroom 6" },
    { id: 7, name: "Chatroom 7" },
    { id: 8, name: "Chatroom 8" },
  ];

  return (
    <div className="app-container">
      <div className="chatrooms-list">
        {chatrooms.map((chatroom) => (
          <button
            key={chatroom.id}
            onClick={() => setCurrentChatroom(chatroom.id)}
          >
            {chatroom.name}
          </button>
        ))}
      </div>
      {currentChatroom ? (
        <Chatroom chatroomId={currentChatroom} username={username} />
      ) : (
        <p>Select a chatroom</p>
      )}
    </div>
  );
};

export default App;

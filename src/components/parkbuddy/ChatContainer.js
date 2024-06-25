import React, { useState, useEffect } from "react";
import Chatroom from "./Chatroom";

const ChatContainer = ({ username, chatroomId, roomName }) => {
  const [currentChatroom, setCurrentChatroom] = useState(chatroomId);

  useEffect(() => {
    setCurrentChatroom(chatroomId);
  }, [chatroomId]);

  return (
    <div className="app-container">
      {currentChatroom ? (
        <Chatroom
          chatroomId={chatroomId}
          username={username}
          roomName={roomName}
        />
      ) : (
        <p>Select a chatroom, Find a park to enter the chat</p>
      )}
    </div>
  );
};

export default ChatContainer;

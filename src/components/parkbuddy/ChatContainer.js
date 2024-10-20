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
        <div className="p-5">
          <Chatroom
            chatroomId={chatroomId}
            username={username}
            roomName={roomName}
          />
        </div>
      ) : (
        <div className="container p-5 ">
          <h1 className="text-center">Select a location pin to see the names of the park you wish to chat. Then click to open the chatroom.</h1>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;

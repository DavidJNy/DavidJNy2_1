import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WebSocketComponent = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Connect to WebSocket server
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://192.168.50.8:8001/ws",
    {
      shouldReconnect: () => true, // Auto-reconnect on disconnect
      reconnectInterval: 3000, // Try reconnecting every 3 seconds
    }
  );

  // Add new message when received
  React.useEffect(() => {
    if (lastMessage !== null) {
      setMessages((prev) => [lastMessage.data, ...prev]);
    }
  }, [lastMessage]);

  const handleSend = () => {
    if (input.trim() !== "") {
      sendMessage(input);
      setInput("");
    }
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting...",
    [ReadyState.OPEN]: "Connected",
    [ReadyState.CLOSING]: "Closing...",
    [ReadyState.CLOSED]: "Disconnected",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div id="DeepValueTrade" className="justify-content-center container">
      <h3>WebSocket Chat</h3>
      <p>Status: {connectionStatus}</p>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Type a message" 
      />
      <button onClick={handleSend} disabled={readyState !== ReadyState.OPEN}>
        Send
      </button>
      <div style={{ marginTop: "10px", maxHeight: "200px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;

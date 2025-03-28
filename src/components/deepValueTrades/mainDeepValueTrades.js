import React from "react";
import useWebSocket from "react-use-websocket";
import { useState, useEffect } from "react";

const WebSocketComponent = ({ endpoint, title }) => {
  const [updates, setUpdates] = useState([]);

  // WebSocket URL (Replace with your server's IP)
  const WS_URL = `${process.env.REACT_APP_WS_URL}/ws/${endpoint}`;
  
  // const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
  const { lastJsonMessage } = useWebSocket(WS_URL, {
  shouldReconnect: () => true,  // Automatically reconnect on disconnect
  reconnectAttempts: 10,        // Retry up to 10 times
  reconnectInterval: 3000,      // Reconnect every 3 seconds
  onOpen: () => console.log('WebSocket connected!'),   // Called when WebSocket opens
  onClose: () => console.log('WebSocket connection closed'), // Called when WebSocket closes
  onError: (error) => console.error('WebSocket error:', error), // Called when there’s an error
  onmessage: (event) => {
    const data = JSON.parse(event.data);
    console.log("Received WebSocket Data:", data);
  },  // Called when a message is received
  pingInterval: 30000,          // Send a ping every 30 seconds
  });
  // console.log(lastJsonMessage)
  // console.log(lastJsonMessage)
  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastJsonMessage) {
      setUpdates((prevUpdates) => [lastJsonMessage, ...prevUpdates.slice(0, 49)]);
    }
  }, [lastJsonMessage]);

  return (
    <div style={{ maxHeight: "400px", overflowY: "scroll", border: "1px solid black", margin: "10px" }}>
      <h3>{title}</h3>
      {updates.map((update, index) => (
        <div key={index} style={{ padding: "10px" }}>
          <pre>{JSON.stringify(update, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

function MainDeepValueTrades() {
  const scanners = [
    { endpoint: "big_volume_pump", title: "big_volume_pump" },
    { endpoint: "big_percent_increase", title: "Big Percent Increase Scanner" },
    { endpoint: "relative_volume_spikes", title: "Relative Volume Spikes Scanner" },
    { endpoint: "sudden_volume_spikes", title: "Sudden Volume Spikes Scanner" },
    { endpoint: "z_scores", title: "Z-Scores Scanner" },
    { endpoint: "minute_volume_spikes", title: "Minute Volume Spikes" },
    { endpoint: "unusual_activity", title: "Unusual Activity" },
    { endpoint: "roc_stocks", title: "Rate of Change" },
    { endpoint: "percent_increases", title: "Percent Increases Scanner" },
    { endpoint: "stock_halts", title: "Stock Halts" },
  ];

  return (
    <div id="DeepValueTrade" className="justify-content-center container">
      <div className="text-center pt-3 fs-1">Deep Value Trades</div>
      <h2>Stock Data WebSocket Updates</h2>
      {scanners.map(({ endpoint, title }) => (
        <WebSocketComponent key={endpoint} endpoint={endpoint} title={title} />
      ))}
    </div>
  );
}

export default MainDeepValueTrades;


import React from 'react'
import { useEffect, useState } from "react";

// Component to handle WebSocket connections
const WebSocketComponent = ({ endpoint, title }) => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8001/ws/${endpoint}`);

    socket.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setUpdates((prevUpdates) => [update, ...prevUpdates]); // Add new updates at the top
    };

    return () => socket.close(); // Close the socket when the component is unmounted
  }, [endpoint]);

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

function mainDeepValueTrades() {

  return (
    <div id="DeepValueTrade" className="justify-content-center container">
      <div>
        <div className="text-center pt-3 fs-1">Deep Value Trades</div>
      </div>
      <div>
        <h2>Stock Data WebSocket Updates</h2>
        <WebSocketComponent endpoint="hundredthousand" title="Hundred Thousand Stock Scanner" />
        <WebSocketComponent endpoint="big_percent_increase" title="Big Percent Increase Scanner" />
        <WebSocketComponent endpoint="relative_volume_spikes" title="Relative Volume Spikes Scanner" />
        <WebSocketComponent endpoint="sudden_volume_spikes" title="Sudden Volume Spikes Scanner" />
        <WebSocketComponent endpoint="z_scores" title="Z-Scores Scanner" />
        <WebSocketComponent endpoint="minute_volume_spikes" title="Minute Volume Spikes" />
        <WebSocketComponent endpoint="unusual_activity" title="Unusual Activity" />
        <WebSocketComponent endpoint="roc_stocks" title="Rate of Change" />
        <WebSocketComponent endpoint="percent_increases" title="Percent Increases Scanner" />
        <WebSocketComponent endpoint="stock_halts" title="Stock Halts" />
      </div>
    </div>
  );
}

export default mainDeepValueTrades

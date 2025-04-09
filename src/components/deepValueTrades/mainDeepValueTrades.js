import React from "react";
import useWebSocket from "react-use-websocket";
import { useState, useEffect } from "react";

const WebSocketComponent = ({ endpoint, title }) => {
  const [updates, setUpdates] = useState([]);
  const [columns, setColumns] = useState([]);
  const [flashingRows, setFlashingRows] = useState(new Set());

  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = window.location.hostname;

  // WebSocket URL (Replace with your server's IP)
  const WS_URL = `${protocol}://${host}/ws/${endpoint}`;
  
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
    // const jsonStringPretty = JSON.stringify(lastJsonMessage, null, 2); // Indent with 2 spaces
    // console.log(lastJsonMessage)

    // Handle incoming WebSocket messages
useEffect(() => {
  if (lastJsonMessage && lastJsonMessage.data) {
    const newData = lastJsonMessage.data;

    // Ensure newData is an array
    if (Array.isArray(newData)) {
      setColumns(Object.keys(newData[0] || {})); // Extract columns from the first object

      setUpdates((prevUpdates) => {
        const newRows = new Set(newData.map(item => item.symbol)); // Track new entries
        setFlashingRows(newRows);

        setTimeout(() => setFlashingRows(new Set()), 500); // Remove flash after 500ms
        return [...newData, ...prevUpdates]; // Limit to 50 rows
      });
    } else {
      console.error("Received data is not an array:", newData);
    }
  }
}, [lastJsonMessage]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", { hour12: false });
  };

  return (
    <div className="">
      <h3>{title}</h3>
      <div style={{ overflowX: "auto" }}>
        <table className="table table-dark">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} className="col">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {updates.map((item, index) => (
              <tr key={index} style={{ backgroundColor: flashingRows.has(item.symbol) ? "white" : "inherit", transition: "background-color 0.5s" }}>
                {columns.map((col) => (
                  <td key={col} style={{ border: "1px solid #ddd", padding: "5px" }}>
                    {col.includes("timestamp") ? formatTime(item[col]) : item[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function MainDeepValueTrades() {
  const scanners = [
    { endpoint: "percent_increases", title: "Percent Increases Scanner" },
    { endpoint: "stock_halts", title: "Stock Halts" },
    { endpoint: "big_percent_increase", title: "Big Percent Increase Scanner" },
    { endpoint: "big_volume_pump", title: "Big Volume Pump" },
    { endpoint: "roc_stocks", title: "Rate of Change" },
    { endpoint: "relative_volume_spikes", title: "Relative Volume Spikes Scanner" },
    { endpoint: "sudden_volume_spikes", title: "Sudden Volume Spikes Scanner" },
    { endpoint: "z_scores", title: "Z-Scores Scanner" },
    { endpoint: "minute_volume_spikes", title: "Minute Volume Spikes" },
    { endpoint: "unusual_activity", title: "Unusual Activity" },
  ];

  const [visibleScanners, setVisibleScanners] = useState(
    scanners.reduce((acc, { endpoint }) => ({ ...acc, [endpoint]: true }), {})
  );

  const toggleVisibility = (endpoint) => {
    setVisibleScanners((prev) => ({ ...prev, [endpoint]: !prev[endpoint] }));
  };

  return (
    <div id="DeepValueTrade" className="justify-content-center container">
      <div className="header">
        <div className="text-center pt-3 fs-1">Deep Value Trades</div>
      <h2>Stock Data WebSocket Updates</h2>
        {/* <div className="options">
          {scanners.map(({ endpoint, title }) => (
            <label key={endpoint}>
              <input
                type="checkbox"
                checked={visibleScanners[endpoint]}
                onChange={() => toggleVisibility(endpoint)}
              />
              {title}
            </label>
          ))}
        </div> */}
        <div>
          {scanners.map(({ endpoint, title }) => (
            <WebSocketComponent key={endpoint} endpoint={endpoint} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainDeepValueTrades;

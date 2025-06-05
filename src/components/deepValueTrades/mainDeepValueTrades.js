import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

const WebSocketComponent = ({ endpoint, title }) => {
  const [updates, setUpdates] = useState([]);
  const [columns, setColumns] = useState([]);
  const [flashingRows, setFlashingRows] = useState(new Set());

  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

  // const WS_URL = `wss://www.davidjny.com/ws/${endpoint}`;
  const WS_URL = `${protocol}://www.davidjny.com/ws/${endpoint}`;

  const { lastJsonMessage } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,  // Automatically reconnect on disconnect
    reconnectAttempts: 10,        // Retry up to 10 times
    reconnectInterval: 3000,      // Reconnect every 3 seconds
    onOpen: () => console.log('WebSocket connected!'),   // Called when WebSocket opens
    onClose: () => console.log('WebSocket connection closed'), // Called when WebSocket closes
    onError: (error) => console.error('WebSocket error:', error), // Called when there’s an error
    onmessage: (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Parsed WebSocket data:", data);
        console.log("Raw WebSocket event string:", event.data);
      } catch (err) {
        console.error("Failed to parse WebSocket data:", event.data, err);
      }
    },  // Called when a message is received
    pingInterval: 30000,          // Send a ping every 30 seconds
    });
    
    // Handle incoming WebSocket messages
    useEffect(() => {
      if (lastJsonMessage?.data) {
        const newData = lastJsonMessage.data;
    
        if (Array.isArray(newData)) {
          setColumns(Object.keys(newData[0] || {}).filter(col => col !== "timestamp" && col !== "time_of_trigger"));
    
          // Identify symbols in this update to flash
          const newSymbols = new Set(newData.map(item => item.symbol));
          setFlashingRows(newSymbols);
    
          // Remove flash state after 500ms
          setTimeout(() => setFlashingRows(new Set()), 500);
    
          setUpdates((prevUpdates) => {
            const combined = [...newData, ...prevUpdates];
    
            // Remove duplicates by symbol (or symbol+timestamp if needed)
            const unique = Array.from(
              new Map(combined.map(item => [`${item.symbol}-${item.timestamp}`, item])).values()
            );
    
            return unique.slice(0, 1000); // Keep most recent # unique entries
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
    <div className="col-12 col-sm-6 mb-4">
      <h3 className="mb-2">{title}</h3>
      <div className="table-responsive fixed-table-container">
        <table className="table table-dark table-bordered table-sm mb-0">
          <thead className="table-light sticky-top">
            <tr>
              {columns.map((col) => (
                <th key={col} className="text-nowrap p-1 m-0">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {updates.map((item, index) => (
              <tr key={index} className={flashingRows.has(item.symbol) ? "table-flash" : ""}>
                {columns.map((col) => (
                  <td key={col} className="">
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
    { endpoint: "relative_volume_spikes", title: "Relative Volume Spikes Scanner" },
    { endpoint: "big_volume_pump", title: "Big Volume Pump" },
    { endpoint: "big_percent_increase", title: "Big Percent Increase Scanner" }
    // { endpoint: "sudden_volume_spikes", title: "Sudden Volume Spikes Scanner" },
    // { endpoint: "z_scores", title: "Z-Scores Scanner" },
    // { endpoint: "unusual_activity", title: "Unusual Activity" },
    // { endpoint: "minute_volume_spikes", title: "Minute Volume Spikes" },
    // { endpoint: "roc_stocks", title: "Rate of Change" },
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
          <div className="options d-flex flex-wrap justify-content-center py-2">
            {scanners.map(({ endpoint, title }) => (
              <label key={endpoint} className="mx-3">
                <input
                  type="checkbox"
                  checked={visibleScanners[endpoint]}
                  onChange={() => toggleVisibility(endpoint)}
                />{" "}
                {title}
              </label>
            ))}
          </div>
        <div className="row">
          {scanners.map(({ endpoint, title }) =>
            visibleScanners[endpoint] ? (
              <WebSocketComponent key={endpoint} endpoint={endpoint} title={title} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default MainDeepValueTrades;

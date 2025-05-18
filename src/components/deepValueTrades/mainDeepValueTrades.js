import React from "react";
import useWebSocket from "react-use-websocket";
import { useState, useEffect } from "react";

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
    
        if (Array.isArray(newData)) {
          setColumns(Object.keys(newData[0] || {}));
    
          // Identify symbols in this update to flash
          const newSymbols = new Set(newData.map(item => item.symbol));
          setFlashingRows(newSymbols);
    
          // Remove flash state after 500ms
          setTimeout(() => {
            setFlashingRows(new Set());
          }, 500);
    
          setUpdates((prevUpdates) => {
            const combined = [...newData, ...prevUpdates];
    
            // Remove duplicates by symbol (or symbol+timestamp if needed)
            const unique = Array.from(
              new Map(combined.map(item => [item.symbol, item])).values()
            );
    
            return unique.slice(0, 50); // Keep most recent 50 unique entries
          });
        } else {
          console.error("Received data is not an array:", newData);
        }
      }
    }, [lastJsonMessage]);

// const formattedData = Array.isArray(newData) ? newData : [newData];

// setColumns(Object.keys(formattedData[0] || {}));

// setUpdates((prevUpdates) => {
//   const newRows = new Set(formattedData.map(item => item.symbol));
//   setFlashingRows(newRows);
//   setTimeout(() => setFlashingRows(new Set()), 500);
//   return [...formattedData, ...prevUpdates.slice(0, 49)];
// });


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
    { endpoint: "big_percent_increase", title: "Big Percent Increase Scanner" },
    { endpoint: "big_volume_pump", title: "Big Volume Pump" },
    { endpoint: "relative_volume_spikes", title: "Relative Volume Spikes Scanner" },
    { endpoint: "sudden_volume_spikes", title: "Sudden Volume Spikes Scanner" },
    { endpoint: "z_scores", title: "Z-Scores Scanner" },
    { endpoint: "unusual_activity", title: "Unusual Activity" },
    { endpoint: "minute_volume_spikes", title: "Minute Volume Spikes" },
    { endpoint: "roc_stocks", title: "Rate of Change" },
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
        <div className="row">
          {scanners.map(({ endpoint, title }) => (
            <WebSocketComponent key={endpoint} endpoint={endpoint} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainDeepValueTrades;

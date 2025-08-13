import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

const WebSocketComponent = ({ endpoint, title }) => {
  const [updates, setUpdates] = useState([]);
  const [columns, setColumns] = useState([]);
  const [flashingRow, setFlashingRow] = useState(new Set());

  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

  // const WS_URL = `wss://www.davidjny.com/ws/${endpoint}`;
  const WS_URL = `${protocol}://www.davidjny.com/ws/${endpoint}`;

  const { lastJsonMessage } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    onOpen: () => console.log('WebSocket connected!'),
    onClose: () => console.log('WebSocket connection closed'),
    onError: (error) => console.error('WebSocket error:', error),
    pingInterval: 30000,
  });

  useEffect(() => {
    if (!lastJsonMessage) return;

    // Handle JSON messages
    if (typeof lastJsonMessage === "object" && lastJsonMessage.data) {
      const newData = lastJsonMessage.data;

      if (Array.isArray(newData)) {
        if (newData.length > 0) {
          const keys = Object.keys(newData[0]);
          const filteredKeys = keys.filter(
            (col) => col !== "timestamp" && col !== "time_of_trigger"
          );

          // Sort to ensure 'symbol' is first, and the rest are alphabetical
          filteredKeys.sort((a, b) => {
            if (a === "symbol") return -1;
            if (b === "symbol") return 1;
            return a.localeCompare(b);
          });
          setColumns(filteredKeys);
        }
        setFlashingRow(true);
        setTimeout(() => setFlashingRow(false), 500);

        setUpdates((prevUpdates) => {
          const combined = [...newData, ...prevUpdates];
          const unique = Array.from(
            new Map(
              combined.map((item) => [`${item.symbol}-${item.timestamp}`, item])
            ).values()
          );
          return unique.slice(0, 1000);
        });
      } else {
        console.error("Expected an array in lastJsonMessage.data, got:", newData);
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
          <tbody className={flashingRow ? "table-flash" : ""}>
            {updates.map((item, index) => (
              <tr key={index} >
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
    { endpoint: "relative_volume_spike", title: "Relative Volume Spikes Scanner" },
    { endpoint: "big_volume_pump", title: "Big Volume Pump" },
    { endpoint: "big_percent_increase", title: "Big Percent Increase Scanner" },
    { endpoint: "stock_halts", title: "Stock Halts" }
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

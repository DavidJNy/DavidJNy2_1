import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

// ---------------- WebSocket Table Component ----------------
const WebSocketComponent = ({ endpoint, title }) => {
  const [updates, setUpdates] = useState([]);
  const [columns, setColumns] = useState([]);
  const [flashingRow, setFlashingRow] = useState(false);
  const [hiddenCols, setHiddenCols] = useState(new Set());
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const WS_URL = `wss://www.davidjny.com/ws/${endpoint}`;

  // Desired column order
  const columnOrder = [
    "symbol",
    "human_time_pst",
    "mark",
    "percent_change",
    "spike_ratio",
    "current_change",
    "current_volume",
    // add more keys as needed
  ];

  // Map backend keys to user-friendly names
  const columnNameMap = {
    symbol: "Symbol",
    human_time_pst: "Time (PST)",
    mark: "Mark",
    percent_change: "% Δ",
    current_change: "Current Δ",
    current_volume: "Current Vol",
    threshold: "Threshold",
    spike_ratio: "Spike Ratio",
    max_past_change: "Max Δ",
    latest_price: "Last $",
    previous_price: "Prev $",
    volume_increase: "Vol Increase",
    average_volume: "Avg Vol",
    increase_percentage: "Increase %",
    latest_volume: "Latest Vol",
    halt_time_est: "Halt Time (EST)",
    halt_date: "Halt Date",
    reason_code: "Reason Code",
    resumption_time: "Resume Time (EST)",
    checked_at: "Checked At (EST)"
  };

  const { lastJsonMessage } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    onOpen: () => console.log(`WebSocket connected: ${endpoint}`),
    onClose: () => console.log(`WebSocket closed: ${endpoint}`),
    onError: (err) => console.error("WebSocket error:", err),
    pingInterval: 30000,
  });

  useEffect(() => {
    if (!lastJsonMessage?.data || !Array.isArray(lastJsonMessage.data)) return;

    // Remove unwanted keys
    const filteredData = lastJsonMessage.data.map(item => {
      const newItem = { ...item };
      delete newItem.timestamp;
      delete newItem.time_of_trigger;
      return newItem;
    });

    // Update columns based on filtered data
    if (filteredData.length > 0) {
      const keys = Object.keys(filteredData[0]); 
      const sortedKeys = columnOrder.filter(k => keys.includes(k))
        .concat(keys.filter(k => !columnOrder.includes(k)));
      setColumns(sortedKeys);
    }

    // Flash row animation
    setFlashingRow(true);
    setTimeout(() => setFlashingRow(false), 500);

    // Merge with previous updates and deduplicate by symbol+timestamp
    setUpdates(prev => {
      const combined = [...filteredData, ...prev];
      const unique = Array.from(
        new Map(combined.map(item => [`${item.symbol}-${item.timestamp ?? ""}`, item])).values()
      );
      return unique.slice(0, 1000);
    });

    // Voice alert for first symbol
    if (voiceEnabled && filteredData[0]?.symbol) {
      const msg = new SpeechSynthesisUtterance(filteredData[0].symbol.split("").join(" "));
      msg.rate = 1.6;
      msg.volume = 0.9;
      msg.pitch = 1;
      window.speechSynthesis.speak(msg);
    }

  }, [lastJsonMessage, voiceEnabled]);

  const formatValue = (col, value) => {
    if (value == null) return "";

    // Format numeric/volume-like columns
    if (col.toLowerCase().includes("volume") && !isNaN(value)) {
      return Number(value).toLocaleString();
    }

    // Format time/date columns
    if (col.toLowerCase().includes("time") || col.toLowerCase().includes("date")) {
      return new Date(value).toLocaleString("en-US", { hour12: false });
    }

    return value;
  };

  const toggleColumn = (col) => {
    setHiddenCols(prev => {
      const newSet = new Set(prev);
      if (newSet.has(col)) newSet.delete(col);
      else newSet.add(col);
      return newSet;
    });
  };

  return (
    <div className="col-12 col-sm-6 mb-4">
      <h3 className="mb-2 text-nowrap">{title}</h3>

      {/* Controls: Column toggle + Voice */}
      <div className="mb-2 d-flex flex-wrap align-items-center">
        {columns.map(col => (
          <button
            key={col}
            className={`btn btn-sm mx-1 mb-1 ${hiddenCols.has(col) ? "btn-secondary" : "btn-primary"}`}
            onClick={() => toggleColumn(col)}
          >
            {columnNameMap[col] ?? col}
          </button>
        ))}
        <button
          className={`btn btn-sm mx-1 mb-1 ${voiceEnabled ? "btn-success" : "btn-outline-light"}`}
          onClick={() => setVoiceEnabled(!voiceEnabled)}
        >
          Voice Alerts
        </button>
      </div>

      <div className="table-responsive fixed-table-container" style={{ maxHeight: "400px", overflow: "auto" }}>
        <table className="table table-dark table-bordered table-sm mb-0">
          <thead className="table-light sticky-top">
            <tr>
              {columns.filter(col => !hiddenCols.has(col)).map(col => (
                <th key={col} className="text-nowrap p-1">{columnNameMap[col] ?? col}</th>
              ))}
            </tr>
          </thead>
          <tbody className={flashingRow ? "table-flash" : ""}>
            {updates.map((item, idx) => (
              <tr key={idx}>
                {columns.filter(col => !hiddenCols.has(col)).map(col => (
                  <td key={col}>{formatValue(col, item[col])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ---------------- Parent Component ----------------
function MainDeepValueTrades() {
  const scanners = [
    { endpoint: "percent_increases", title: "Percent Increases Scanner" },
    { endpoint: "relative_volume_spike", title: "Relative Volume Spikes Scanner" },
    { endpoint: "big_volume_pump", title: "Big Volume Pump" },
    { endpoint: "big_percent_increase", title: "Big Percent Increase Scanner" },
    { endpoint: "stock_halts", title: "Stock Halts" }
  ];

  const [visibleScanners, setVisibleScanners] = useState(
    scanners.reduce((acc, { endpoint }) => ({ ...acc, [endpoint]: true }), {})
  );

  const toggleVisibility = (endpoint) => {
    setVisibleScanners(prev => ({ ...prev, [endpoint]: !prev[endpoint] }));
  };

  return (
    <div id="DeepValueTrade" className="justify-content-center container-lg">
      <div className="header">
        <div className="text-center pt-3 fs-1">Deep Value Trades</div>

        {/* Scanner visibility toggles */}
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
              <WebSocketComponent
                key={endpoint}
                endpoint={endpoint}
                title={title}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default MainDeepValueTrades;

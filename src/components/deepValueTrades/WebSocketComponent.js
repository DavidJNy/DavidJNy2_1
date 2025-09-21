import React, { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";

export const WebSocketComponent = ({ endpoint, title, settings, setSettings }) => {
  const [updates, setUpdates] = useState([]);
  const [columns, setColumns] = useState([]);
  const [flashingRow, setFlashingRow] = useState(false);

  const WS_URL = `wss://www.davidjny.com/ws/${endpoint}`;

  const columnOrderRef = useRef([
    "symbol", "human_time_pst", "mark", "percent_change",
    "spike_ratio", "current_change", "current_volume",
  ]);

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
    checked_at: "Checked At (EST)",
  };

  const scannerSettings = settings.scanners?.[endpoint] || {
    visible: true, hiddenCols: [], voiceEnabled: false
  };

  const hiddenCols = new Set(scannerSettings.hiddenCols);
  const voiceEnabled = scannerSettings.voiceEnabled;

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

    const filteredData = lastJsonMessage.data.map(item => {
      const newItem = { ...item };
      delete newItem.timestamp;
      delete newItem.time_of_trigger;
      return newItem;
    });

    if (filteredData.length > 0) {
      const keys = Object.keys(filteredData[0]);
      const sortedKeys = columnOrderRef.current
        .filter(k => keys.includes(k))
        .concat(keys.filter(k => !columnOrderRef.current.includes(k)));
      setColumns(sortedKeys);
    }

    setFlashingRow(true);
    setTimeout(() => setFlashingRow(false), 500);

    setUpdates(prev => {
      const combined = [...filteredData, ...prev];
      const unique = Array.from(
        new Map(combined.map(item => [`${item.symbol}-${item.timestamp ?? ""}`, item]))
      .values());
      return unique.slice(0, 1000);
    });

    if (voiceEnabled && filteredData[0]?.symbol) {
      const msg = new SpeechSynthesisUtterance(filteredData[0].symbol.split("").join(" "));
      msg.rate = 1.3; msg.volume = 0.9; msg.pitch = 1;
      window.speechSynthesis.speak(msg);
    }
  }, [lastJsonMessage, voiceEnabled]);

  const formatValue = (col, value) => {
    if (value == null) return "";
    if (col.toLowerCase().includes("volume") && !isNaN(value)) return Number(value).toLocaleString();
    if (col.toLowerCase().includes("time") || col.toLowerCase().includes("date")) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) return date.toLocaleString("en-US", { hour12: false });
      return value;
    }
    return value;
  };

  const toggleColumn = (col) => {
    const newHiddenCols = hiddenCols.has(col)
      ? scannerSettings.hiddenCols.filter(c => c !== col)
      : [...scannerSettings.hiddenCols, col];
    setSettings(prev => ({
      ...prev,
      scanners: { ...prev.scanners, [endpoint]: { ...scannerSettings, hiddenCols: newHiddenCols } }
    }));
  };

  const toggleVoice = () => {
    setSettings(prev => ({
      ...prev,
      scanners: { ...prev.scanners, [endpoint]: { ...scannerSettings, voiceEnabled: !voiceEnabled } }
    }));
  };

  return (
    <div className="col-12 col-sm-6 mb-4 ">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="mb-0 text-truncate">{title}</h3>
        <div className="dropdown">
          <button className="btn btn-sm btn-outline-light" type="button" id={`dropdown-${endpoint}`} data-bs-toggle="dropdown" data-bs-auto-close="outside">
            ⚙️
          </button>
          <ul className="dropdown-menu dropdown-menu-end p-2 slide-down" aria-labelledby={`dropdown-${endpoint}`}>
            {columns.map(col => (
              <li key={col} className="mb-1">
                <button className={`btn btn-sm w-100 text-start ${hiddenCols.has(col) ? "btn-secondary" : "btn-primary"}`}
                        onClick={e => { e.stopPropagation(); toggleColumn(col); }}>
                  {columnNameMap[col] ?? col}
                </button>
              </li>
            ))}
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className={`btn btn-sm w-100 text-start ${voiceEnabled ? "btn-success" : "btn-outline-light"}`}
                      onClick={e => { e.stopPropagation(); toggleVoice(); }}>
                Voice Alerts
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="table-responsive fixed-table-container">
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

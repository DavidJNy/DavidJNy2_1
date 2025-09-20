import React, { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";

// ----------------- Helpers for LocalStorage -----------------
const loadSettings = () => {
  const saved = localStorage.getItem("deepValueSettings");
  return saved ? JSON.parse(saved) : { scanners: {} };
};

const saveSettings = (settings) => {
  localStorage.setItem("deepValueSettings", JSON.stringify(settings));
};

// ----------------- WebSocket Table Component -----------------
const WebSocketComponent = ({ endpoint, title, settings, setSettings }) => {
  const [updates, setUpdates] = useState([]);
  const [columns, setColumns] = useState([]);
  const [flashingRow, setFlashingRow] = useState(false);

  const WS_URL = `wss://www.davidjny.com/ws/${endpoint}`;

  // Desired column order
  const columnOrderRef = useRef([
    "symbol",
    "human_time_pst",
    "mark",
    "percent_change",
    "spike_ratio",
    "current_change",
    "current_volume",
  ]);

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
    checked_at: "Checked At (EST)",
  };

  // Load per-scanner settings (defaults if not set yet)
  const scannerSettings = settings.scanners?.[endpoint] || {
    visible: true,
    hiddenCols: [],
    voiceEnabled: false,
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

    // Remove unwanted keys
    const filteredData = lastJsonMessage.data.map((item) => {
      const newItem = { ...item };
      delete newItem.timestamp;
      delete newItem.time_of_trigger;
      return newItem;
    });

    // Update columns based on filtered data
    if (filteredData.length > 0) {
      const keys = Object.keys(filteredData[0]);
      const sortedKeys = columnOrderRef.current
        .filter((k) => keys.includes(k))
        .concat(keys.filter((k) => !columnOrderRef.current.includes(k)));

      setColumns(sortedKeys);
    }

    // Flash row animation
    setFlashingRow(true);
    setTimeout(() => setFlashingRow(false), 500);

    // Merge with previous updates and deduplicate by symbol+timestamp
    setUpdates((prev) => {
      const combined = [...filteredData, ...prev];
      const unique = Array.from(
        new Map(
          combined.map((item) => [`${item.symbol}-${item.timestamp ?? ""}`, item])
        ).values()
      );
      return unique.slice(0, 1000);
    });

    // Voice alert for first symbol
    if (voiceEnabled && filteredData[0]?.symbol) {
      const msg = new SpeechSynthesisUtterance(
        filteredData[0].symbol.split("").join(" ")
      );
      msg.rate = 1.3;
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
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString("en-US", { hour12: false });
      }
      return value; // fallback to original string if not a valid date
    }

    return value;
  };

  const toggleColumn = (col) => {
    const newHiddenCols = hiddenCols.has(col)
      ? scannerSettings.hiddenCols.filter((c) => c !== col)
      : [...scannerSettings.hiddenCols, col];

    setSettings((prev) => ({
      ...prev,
      scanners: {
        ...prev.scanners,
        [endpoint]: {
          ...scannerSettings,
          hiddenCols: newHiddenCols,
        },
      },
    }));
  };

  const toggleVoice = () => {
    setSettings((prev) => ({
      ...prev,
      scanners: {
        ...prev.scanners,
        [endpoint]: {
          ...scannerSettings,
          voiceEnabled: !voiceEnabled,
        },
      },
    }));
  };

  return (
    <div className="col-12 col-sm-6 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="mb-0 text-truncate">{title}</h3>

        {/* Cog wheel dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-sm btn-outline-light"
            type="button"
            id={`dropdownMenuButton-${endpoint}`}
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            ⚙️
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end p-2 slide-down"
            aria-labelledby={`dropdownMenuButton-${endpoint}`}
          >
            {columns.map((col) => (
              <li key={col} className="mb-1">
                <button
                  className={`btn btn-sm w-100 text-start ${
                    hiddenCols.has(col) ? "btn-secondary" : "btn-primary"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleColumn(col);
                  }}
                >
                  {columnNameMap[col] ?? col}
                </button>
              </li>
            ))}
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className={`btn btn-sm w-100 text-start ${
                  voiceEnabled ? "btn-success" : "btn-outline-light"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVoice();
                }}
              >
                Voice Alerts
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="table-responsive fixed-table-container"
      >
        <table className="table table-dark table-bordered table-sm mb-0">
          <thead className="table-light sticky-top">
            <tr>
              {columns
                .filter((col) => !hiddenCols.has(col))
                .map((col) => (
                  <th key={col} className="text-nowrap p-1">
                    {columnNameMap[col] ?? col}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className={flashingRow ? "table-flash" : ""}>
            {updates.map((item, idx) => (
              <tr key={idx}>
                {columns
                  .filter((col) => !hiddenCols.has(col))
                  .map((col) => (
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

// ----------------- Parent Component -----------------
function MainDeepValueTrades() {
  const scanners = [
    { endpoint: "percent_increases", title: "Percent Increases Scanner" },
    { endpoint: "relative_volume_spike", title: "Relative Volume Spikes Scanner" },
    { endpoint: "big_volume_pump", title: "Big Volume Pump" },
    { endpoint: "big_percent_increase", title: "Big Percent Increase Scanner" },
    { endpoint: "stock_halts", title: "Stock Halts" },
  ];

  const [settings, setSettings] = useState(() => loadSettings());

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const toggleVisibility = (endpoint) => {
    const scannerSettings = settings.scanners?.[endpoint] || {
      visible: true,
      hiddenCols: [],
      voiceEnabled: false,
    };

    setSettings((prev) => ({
      ...prev,
      scanners: {
        ...prev.scanners,
        [endpoint]: {
          ...scannerSettings,
          visible: !scannerSettings.visible,
        },
      },
    }));
  };

  // 🔴 Reset everything
  const resetSettings = () => {
    localStorage.removeItem("deepValueSettings");
    setSettings({ scanners: {} });
  };

  return (
    <div id="DeepValueTrade" className="justify-content-center container-lg px-4">
      <div className="header">
        <div className="text-center pt-3 fs-1">Deep Value Trades</div>

        {/* Scanner visibility toggles */}
        <div className="options d-flex flex-wrap justify-content-center py-2">
          {scanners.map(({ endpoint, title }) => (
            <label key={endpoint} className="mx-3">
              <input
                type="checkbox"
                checked={settings.scanners?.[endpoint]?.visible ?? true}
                onChange={() => toggleVisibility(endpoint)}
              />{" "}
              {title}
            </label>
          ))}
        </div>

        {/* Reset button */}
        <div className="text-center my-3">
          <button className="btn btn-danger btn-sm" onClick={resetSettings}>
            Reset Settings
          </button>
        </div>

        <div className="row">
          {scanners.map(({ endpoint, title }) =>
            settings.scanners?.[endpoint]?.visible ?? true ? (
              <WebSocketComponent
                key={endpoint}
                endpoint={endpoint}
                title={title}
                settings={settings}
                setSettings={setSettings}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default MainDeepValueTrades;

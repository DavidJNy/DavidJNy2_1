import React, { useState, useEffect } from "react";
import { WebSocketComponent } from "./WebSocketComponent";

// ----------------- Helpers for LocalStorage -----------------
const loadSettings = () => {
  const saved = localStorage.getItem("deepValueSettings");
  return saved ? JSON.parse(saved) : { scanners: {} };
};

const saveSettings = (settings) => {
  localStorage.setItem("deepValueSettings", JSON.stringify(settings));
};

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
          <button
            className="btn btn-outline-light mx-2"
            onClick={() => {
              window.open(
                "/fullscreen-tables",
                "_blank",
                "width=1200,height=800"
              );
            }}
          >
            Full Screen Tables
          </button>
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

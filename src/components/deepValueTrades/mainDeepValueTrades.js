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

  // 🟢 Load saved settings from localStorage
  const [settings, setSettings] = useState(() => loadSettings());

  // 🟢 Load saved volume, fallback to 1 if not saved
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("deepValueVolume");
    return saved ? parseFloat(saved) : 1;
  });

  // 🟡 Save settings when they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // 🟢 Save volume when it changes
  useEffect(() => {
    localStorage.setItem("deepValueVolume", volume.toString());
  }, [volume]);

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

        <div className="text-center my-3">
          <div className="d-flex align-items-center gap-2 mt-2">
            <label htmlFor="volumeControl" className="text-white mb-0">🔊 Volume</label>
            <input
              id="volumeControl"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="form-range tts-volume-slider"
            />
            <span className="text-white">{Math.round(volume * 100)}%</span>
          </div>
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
                volume={volume}
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

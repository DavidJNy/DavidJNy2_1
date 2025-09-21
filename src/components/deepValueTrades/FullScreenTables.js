// FullScreenTables.js
import React, { useState, useEffect } from "react";
import { WebSocketComponent } from "./WebSocketComponent";

// List of scanners
const scannersList = [
  { endpoint: "percent_increases", title: "Percent Increases Scanner" },
  { endpoint: "relative_volume_spike", title: "Relative Volume Spikes Scanner" },
  { endpoint: "big_volume_pump", title: "Big Volume Pump" },
  { endpoint: "big_percent_increase", title: "Big Percent Increase Scanner" },
  { endpoint: "stock_halts", title: "Stock Halts" },
];

const FullScreenTables = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("deepValueSettings");
    return saved ? JSON.parse(saved) : { scanners: {} };
  });

  useEffect(() => {
    localStorage.setItem("deepValueSettings", JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="container-lg px-2 websocket-background">
      <div className="row">
        {scannersList.map(({ endpoint, title }) => (
          <WebSocketComponent
            key={endpoint}
            endpoint={endpoint}
            title={title}
            settings={settings}
            setSettings={setSettings}
          />
        ))}
      </div>
    </div>
  );
};

export default FullScreenTables;

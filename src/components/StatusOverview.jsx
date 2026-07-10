// File: src/components/StatusOverview.jsx
import React, { useState } from "react";
import "./StatusOverview.css";

export default function StatusOverview({ statuses }) {
  const [activeRange, setActiveRange] = useState("daily");

  const currentStatuses = Array.isArray(statuses)
    ? statuses
    : statuses[activeRange];

  return (
    <div className="panel status-overview-panel">
      <div className="panel-header">
        <div>
          <h3 className="panel-title">Order Status</h3>
          <p className="panel-subtitle">Live breakdown of the kitchen queue</p>
        </div>

        <div className="status-range-tabs">
          <button
            className={activeRange === "daily" ? "is-active" : ""}
            onClick={() => setActiveRange("daily")}
          >
            Daily
          </button>
          <button
            className={activeRange === "weekly" ? "is-active" : ""}
            onClick={() => setActiveRange("weekly")}
          >
            Weekly
          </button>
          <button
            className={activeRange === "monthly" ? "is-active" : ""}
            onClick={() => setActiveRange("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="status-overview-grid">
        {currentStatuses.map((s) => (
          <div
            key={s.id}
            className={`status-overview-card status-overview-card--${s.tone}`}
          >
            <span className="status-overview-count">{s.count}</span>
            <span className="status-overview-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
// File: src/components/StatusOverview.jsx
import React, { useState } from "react";
import "./StatusOverview.css";

const statusIcons = {
  total: "✓",
  delivered: "✓",
  pending: "!",
  preparing: "•",
  out: "→",
  cancelled: "×",
};

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
          <p className="panel-subtitle">Kitchen queue summary</p>
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

      <div className="status-overview-list">
        {currentStatuses.map((status) => (
          <div
            key={status.id}
            className={`status-overview-row status-overview-row--${status.tone}`}
          >
            <div className="status-overview-icon">
              {statusIcons[status.id] || "•"}
            </div>

            <div className="status-overview-text">
              <span>{status.label}</span>
              <strong>{status.count}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// File: src/components/SourceAnalytics.jsx
import React, { useState, useMemo } from "react";
import "./SourceAnalytics.css";

export default function SourceAnalytics({ data }) {
  const [metric, setMetric] = useState("orders"); // "orders" | "revenue"

  const total = useMemo(
    () => data.reduce((sum, p) => sum + (metric === "orders" ? p.orders : p.revenue), 0),
    [data, metric]
  );

  const circumference = 2 * Math.PI * 54;
  let offsetAcc = 0;

  return (
    <div className="panel source-analytics-panel">
      <div className="panel-header">
        <div>
          <h3 className="panel-title">Orders by Platform</h3>
          <p className="panel-subtitle">Zomato · Swiggy · Walk-in · Direct</p>
        </div>
        <div className="source-analytics-toggle" role="tablist" aria-label="Metric">
          <button
            role="tab"
            aria-selected={metric === "orders"}
            className={metric === "orders" ? "is-active" : ""}
            onClick={() => setMetric("orders")}
          >
            Orders
          </button>
          <button
            role="tab"
            aria-selected={metric === "revenue"}
            className={metric === "revenue" ? "is-active" : ""}
            onClick={() => setMetric("revenue")}
          >
            Revenue
          </button>
        </div>
      </div>

      <div className="source-analytics-body">
        <div className="source-analytics-chart">
          <svg viewBox="0 0 140 140" width="180" height="180">
            <circle cx="70" cy="70" r="54" fill="none" stroke="var(--color-border-soft)" strokeWidth="16" />
            {data.map((p) => {
              const value = metric === "orders" ? p.orders : p.revenue;
              const fraction = total ? value / total : 0;
              const dash = fraction * circumference;
              const circle = (
                <circle
                  key={p.id}
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke={p.color}
                  strokeWidth="16"
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offsetAcc}
                  strokeLinecap="butt"
                  transform="rotate(-90 70 70)"
                  className="source-analytics-arc"
                />
              );
              offsetAcc += dash;
              return circle;
            })}
          </svg>
          <div className="source-analytics-chart-center">
            <span className="source-analytics-chart-total">
              {metric === "orders" ? total.toLocaleString("en-IN") : `₹${(total / 100000).toFixed(1)}L`}
            </span>
            <span className="source-analytics-chart-label">
              {metric === "orders" ? "Total Orders" : "Total Revenue"}
            </span>
          </div>
        </div>

        <ul className="source-analytics-legend">
          {data.map((p) => {
            const value = metric === "orders" ? p.orders : p.revenue;
            const pct = total ? Math.round((value / total) * 100) : 0;
            return (
              <li key={p.id}>
                <span className="source-analytics-legend-swatch" style={{ background: p.color }} />
                <span className="source-analytics-legend-name">{p.name}</span>
                <span className="source-analytics-legend-value">
                  {metric === "orders" ? value.toLocaleString("en-IN") : `₹${value.toLocaleString("en-IN")}`}
                </span>
                <span className="source-analytics-legend-pct">{pct}%</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

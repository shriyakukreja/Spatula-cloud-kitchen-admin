// File: src/components/TopSelling.jsx
import React from "react";
import "./TopSelling.css";

export default function TopSelling({ items }) {
  const maxOrders = Math.max(...items.map((i) => i.orders));

  return (
    <div className="panel top-selling-panel">
      <div className="panel-header">
        <div>
          <h3 className="panel-title">Top Selling Items</h3>
          <p className="panel-subtitle">Best performers this month</p>
        </div>
      </div>

      <ul className="top-selling-list">
        {items.map((item, index) => (
          <li key={item.id} className="top-selling-item">
            <span className="top-selling-rank">{String(index + 1).padStart(2, "0")}</span>
            <img className="top-selling-image" src={item.image} alt={item.name} loading="lazy" />
            <div className="top-selling-info">
              <span className="top-selling-name">{item.name}</span>
              <div className="top-selling-bar-track">
                <div
                  className="top-selling-bar-fill"
                  style={{ width: `${(item.orders / maxOrders) * 100}%` }}
                />
              </div>
            </div>
            <div className="top-selling-stats">
              <span className="top-selling-orders">{item.orders.toLocaleString("en-IN")} orders</span>
              <span className="top-selling-revenue">₹{item.revenue.toLocaleString("en-IN")}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

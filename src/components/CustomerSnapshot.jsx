// File: src/components/CustomerSnapshot.jsx
import React from "react";
import "./CustomerSnapshot.css";

export default function CustomerSnapshot({ customers }) {
  return (
    <div className="panel customer-snapshot-panel">
      <div className="panel-header">
        <div>
          <h3 className="panel-title">Customer Snapshot</h3>
          <p className="panel-subtitle">Recent customers and their loyalty</p>
        </div>
      </div>

      <ul className="customer-snapshot-list">
        {customers.map((customer) => (
          <li key={customer.id} className="customer-snapshot-item">
            <span className="customer-snapshot-avatar">{customer.avatar}</span>
            <div className="customer-snapshot-info">
              <span className="customer-snapshot-name">{customer.name}</span>
              <span className="customer-snapshot-fav">Loves {customer.favouriteItem}</span>
            </div>
            <div className="customer-snapshot-metrics">
              <div className="customer-snapshot-metric">
                <span className="customer-snapshot-metric-value">{customer.totalVisits}</span>
                <span className="customer-snapshot-metric-label">Visits</span>
              </div>
              <div className="customer-snapshot-metric">
                <span className="customer-snapshot-metric-value">
                  ₹{customer.lifetimeSpend.toLocaleString("en-IN")}
                </span>
                <span className="customer-snapshot-metric-label">Lifetime</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

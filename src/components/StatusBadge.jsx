// File: src/components/StatusBadge.jsx
import React from "react";
import "./StatusBadge.css";

const toneMap = {
  Pending: "pending",
  Preparing: "preparing",
  Ready: "ready",
  "Out for Delivery": "out",
  Delivered: "delivered",
  Cancelled: "cancelled",
};

export default function StatusBadge({ status }) {
  const tone = toneMap[status] || "pending";
  return (
    <span className={`status-badge status-badge--${tone}`}>
      <span className="status-badge-dot" />
      {status}
    </span>
  );
}

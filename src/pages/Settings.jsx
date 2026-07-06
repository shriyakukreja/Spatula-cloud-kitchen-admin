// File: src/pages/Settings.jsx
import React, { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    payouts: false,
    marketing: false,
  });

  const toggle = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="settings-page">
      <div className="panel settings-panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Kitchen Profile</h3>
            <p className="panel-subtitle">Basic information shown across delivery platforms</p>
          </div>
        </div>
        <div className="settings-form">
          <label className="settings-field">
            <span>Kitchen Name</span>
            <input type="text" defaultValue="Spatula Cloud Kitchen" />
          </label>
          <label className="settings-field">
            <span>Contact Email</span>
            <input type="email" defaultValue="admin@spatulakitchen.com" />
          </label>
          <label className="settings-field">
            <span>Contact Phone</span>
            <input type="tel" defaultValue="+91 98450 12345" />
          </label>
          <label className="settings-field">
            <span>Address</span>
            <input type="text" defaultValue="14 MG Road, Bengaluru, KA 560001" />
          </label>
        </div>
        <div className="settings-actions">
          <button className="settings-btn-secondary">Cancel</button>
          <button className="settings-btn-primary">Save Changes</button>
        </div>
      </div>

      <div className="panel settings-panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Notifications</h3>
            <p className="panel-subtitle">Choose what you want to be alerted about</p>
          </div>
        </div>
        <div className="settings-toggle-list">
          <ToggleRow
            label="New order alerts"
            description="Get notified the moment a new order comes in"
            checked={notifications.newOrders}
            onChange={() => toggle("newOrders")}
          />
          <ToggleRow
            label="Low stock warnings"
            description="Alert when a menu item is running low"
            checked={notifications.lowStock}
            onChange={() => toggle("lowStock")}
          />
          <ToggleRow
            label="Payout confirmations"
            description="Email me when a settlement is processed"
            checked={notifications.payouts}
            onChange={() => toggle("payouts")}
          />
          <ToggleRow
            label="Marketing updates"
            description="Occasional tips and platform announcements"
            checked={notifications.marketing}
            onChange={() => toggle("marketing")}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="settings-toggle-row">
      <div>
        <p className="settings-toggle-label">{label}</p>
        <p className="settings-toggle-description">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        className={"settings-switch" + (checked ? " is-on" : "")}
        onClick={onChange}
      >
        <span className="settings-switch-thumb" />
      </button>
    </div>
  );
}

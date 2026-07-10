// File: src/pages/Settings.jsx
import React, { useState } from "react";
import "./Settings.css";

const initialSettings = {
  kitchenName: "Spatula Cloud Kitchen",
  cuisine: "Italian • American",
  ownerName: "Spatula Admin",
  email: "admin@spatulakitchen.com",
  phonePrimary: "8796785666",
  phoneSecondary: "7428600284",
  address: "Dwarka Sector 8, New Delhi",
  instagram: "@spatula.cloudkitchen",
  gstNumber: "",
  fssaiNumber: "",

  tagline: "Fresh Italian-American comfort food from our cloud kitchen.",
  footerText: "© 2026 Spatula Cloud Kitchen. All rights reserved.",

  kitchenStatus: localStorage.getItem("spatula-kitchen-status") || "open",
  acceptingOrders: true,
  deliveryEnabled: true,
  takeawayEnabled: true,
  preparationTime: 25,
  minimumOrder: 199,
  packagingCharge: 20,

  privacyPolicy:
    "We collect customer information only to process orders, provide support, and improve service quality.",
  terms:
    "Orders are subject to menu availability, kitchen operating hours, and confirmation from Spatula Cloud Kitchen.",
  refundPolicy:
    "Refunds are processed for cancelled, failed, or incorrect orders after verification by the kitchen team.",
  cancellationPolicy:
    "Orders can be cancelled before preparation begins. Once food preparation has started, cancellation may not be available.",
  deliveryPolicy:
    "Delivery timelines are estimates and may vary based on kitchen load, distance, traffic, and platform partner availability.",
};

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [savedMessage, setSavedMessage] = useState("");

  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    payouts: false,
  });

  function updateField(key, value) {
  setSettings((prev) => {
    const updatedSettings = { ...prev, [key]: value };

    if (key === "acceptingOrders" && value === false) {
      updatedSettings.kitchenStatus = "closed";
      localStorage.setItem("spatula-kitchen-status", "closed");
      window.dispatchEvent(new Event("spatula-kitchen-status-change"));
    }

    if (key === "acceptingOrders" && value === true && prev.kitchenStatus === "closed") {
      updatedSettings.kitchenStatus = "open";
      localStorage.setItem("spatula-kitchen-status", "open");
      window.dispatchEvent(new Event("spatula-kitchen-status-change"));
    }

    return updatedSettings;
  });
}

function updateKitchenStatus(value) {
  setSettings((prev) => {
    const updatedSettings = {
      ...prev,
      kitchenStatus: value,
      acceptingOrders: value === "closed" ? false : true,
    };

    localStorage.setItem("spatula-kitchen-status", value);
    window.dispatchEvent(new Event("spatula-kitchen-status-change"));

    return updatedSettings;
  });
}
  function toggleNotification(key) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleSave() {
    localStorage.setItem("spatula-kitchen-status", settings.kitchenStatus);
    window.dispatchEvent(new Event("spatula-kitchen-status-change"));
    setSavedMessage("Settings saved successfully.");
    setTimeout(() => setSavedMessage(""), 2500);
  }

  function handleCancel() {
    setSettings(initialSettings);
    localStorage.setItem("spatula-kitchen-status", initialSettings.kitchenStatus);
    window.dispatchEvent(new Event("spatula-kitchen-status-change"));
    setSavedMessage("Changes reset.");
    setTimeout(() => setSavedMessage(""), 2500);
  }

  return (
    <div className="settings-page">
      {savedMessage && <div className="settings-toast">{savedMessage}</div>}

      <section className="panel settings-panel">
        <SectionHeader
          title="Kitchen Profile"
          subtitle="Basic business information for admin and customer-facing pages"
        />

        <div className="settings-form">
          <TextField label="Kitchen Name" value={settings.kitchenName} onChange={(value) => updateField("kitchenName", value)} />
          <TextField label="Cuisine" value={settings.cuisine} onChange={(value) => updateField("cuisine", value)} />
          <TextField label="Owner / Admin Name" value={settings.ownerName} onChange={(value) => updateField("ownerName", value)} />
          <TextField label="Contact Email" value={settings.email} onChange={(value) => updateField("email", value)} />
          <TextField label="Primary Phone" value={settings.phonePrimary} onChange={(value) => updateField("phonePrimary", value)} />
          <TextField label="Secondary Phone" value={settings.phoneSecondary} onChange={(value) => updateField("phoneSecondary", value)} />
          <TextField label="GST Number" value={settings.gstNumber} onChange={(value) => updateField("gstNumber", value)} placeholder="Optional" />
          <TextField label="FSSAI License Number" value={settings.fssaiNumber} onChange={(value) => updateField("fssaiNumber", value)} placeholder="Optional" />
          <TextField className="settings-field-wide" label="Kitchen Address" value={settings.address} onChange={(value) => updateField("address", value)} />
        </div>
      </section>

      <section className="panel settings-panel">
        <SectionHeader
          title="Customer Website Information"
          subtitle="This information will be used later in the customer website header and footer"
        />

        <div className="settings-form">
          <TextField className="settings-field-wide" label="Restaurant Tagline" value={settings.tagline} onChange={(value) => updateField("tagline", value)} />
          <TextField label="Instagram" value={settings.instagram} onChange={(value) => updateField("instagram", value)} />
          <TextField label="Footer Text" value={settings.footerText} onChange={(value) => updateField("footerText", value)} />
        </div>
      </section>

      <section className="panel settings-panel">
        <SectionHeader
          title="Kitchen Operations"
          subtitle="Control kitchen availability, order flow and charges"
        />

        <div className="settings-status-options">
          {[
            {
              value: "open",
              label: "Kitchen Open",
              description: "Accepting and preparing orders normally",
            },
            {
              value: "preparing",
              label: "Preparing",
              description: "Kitchen is getting ready before opening",
            },
            {
              value: "closed",
              label: "Kitchen Closed",
              description: "Kitchen is not accepting orders right now",
            },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              className={
                "settings-status-option" +
                (settings.kitchenStatus === option.value ? " is-active" : "")
              }
              onClick={() => updateKitchenStatus(option.value)}
            >
              <strong>{option.label}</strong>
              <span>{option.description}</span>
            </button>
          ))}
        </div>

        <div className="settings-toggle-list">
          <ToggleRow label="Accepting orders" description="Pause or resume incoming customer orders" checked={settings.acceptingOrders} onChange={() => updateField("acceptingOrders", !settings.acceptingOrders)} />
          <ToggleRow label="Delivery available" description="Allow delivery orders from platforms or direct website" checked={settings.deliveryEnabled} onChange={() => updateField("deliveryEnabled", !settings.deliveryEnabled)} />
          <ToggleRow label="Takeaway available" description="Allow takeaway orders with flat 20% off promo" checked={settings.takeawayEnabled} onChange={() => updateField("takeawayEnabled", !settings.takeawayEnabled)} />
        </div>

        <div className="settings-form settings-form-compact">
          <NumberField label="Average Preparation Time (min)" value={settings.preparationTime} onChange={(value) => updateField("preparationTime", value)} />
          <NumberField label="Minimum Order Amount (₹)" value={settings.minimumOrder} onChange={(value) => updateField("minimumOrder", value)} />
          <NumberField label="Packaging Charge (₹)" value={settings.packagingCharge} onChange={(value) => updateField("packagingCharge", value)} />
        </div>
      </section>

      <section className="panel settings-panel">
        <SectionHeader
          title="Platform Integrations"
          subtitle="Dummy integration status for current admin prototype"
        />

        <div className="settings-integration-grid">
          <IntegrationCard name="Zomato" status="Connected" />
          <IntegrationCard name="Swiggy" status="Connected" />
          <IntegrationCard name="Direct Website" status="Connected" />
          <IntegrationCard name="Walk-in / Takeaway" status="Enabled" />
        </div>
      </section>

      <section className="panel settings-panel">
        <SectionHeader
          title="Policies"
          subtitle="Content that will later appear in customer website footer links"
        />

        <div className="settings-policy-grid">
          <TextArea label="Privacy Policy" value={settings.privacyPolicy} onChange={(value) => updateField("privacyPolicy", value)} />
          <TextArea label="Terms & Conditions" value={settings.terms} onChange={(value) => updateField("terms", value)} />
          <TextArea label="Refund Policy" value={settings.refundPolicy} onChange={(value) => updateField("refundPolicy", value)} />
          <TextArea label="Cancellation Policy" value={settings.cancellationPolicy} onChange={(value) => updateField("cancellationPolicy", value)} />
          <TextArea className="settings-field-wide" label="Delivery Policy" value={settings.deliveryPolicy} onChange={(value) => updateField("deliveryPolicy", value)} />
        </div>
      </section>

      <section className="panel settings-panel">
        <SectionHeader
          title="Notifications"
          subtitle="Choose what the admin should be alerted about"
        />

        <div className="settings-toggle-list">
          <ToggleRow label="New order alerts" description="Get notified the moment a new order comes in" checked={notifications.newOrders} onChange={() => toggleNotification("newOrders")} />
          <ToggleRow label="Low stock warnings" description="Alert when a menu item is running low" checked={notifications.lowStock} onChange={() => toggleNotification("lowStock")} />
          <ToggleRow label="Payout confirmations" description="Email when a settlement is processed" checked={notifications.payouts} onChange={() => toggleNotification("payouts")} />
        </div>
      </section>

      <div className="settings-save-bar">
        <button className="settings-btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button className="settings-btn-primary" onClick={handleSave}>
          Save All Changes
        </button>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="panel-header">
      <div>
        <h3 className="panel-title">{title}</h3>
        <p className="panel-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, className = "" }) {
  return (
    <label className={`settings-field ${className}`}>
      <span>{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <label className="settings-field">
      <span>{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function TextArea({ label, value, onChange, className = "" }) {
  return (
    <label className={`settings-field ${className}`}>
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
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

function IntegrationCard({ name, status }) {
  return (
    <div className="settings-integration-card">
      <div>
        <strong>{name}</strong>
        <span>{status}</span>
      </div>
      <span className="settings-integration-dot" />
    </div>
  );
}
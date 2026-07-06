// File: src/components/Topbar.jsx
import React, { useState } from "react";
import "./Topbar.css";

function getFormattedDate() {
  const today = new Date();
  return today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Topbar({ title = "Dashboard", subtitle }) {
  const [query, setQuery] = useState("");

  return (
    <header className="topbar">
      <div className="topbar-heading">
        <h1 className="topbar-title">{title}</h1>
        {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
      </div>

      <div className="topbar-actions">
        <div className="topbar-date" title={getFormattedDate()}>
          <CalendarIcon />
          <span>{getFormattedDate()}</span>
        </div>

        <button className="topbar-icon-btn" aria-label="Notifications">
          <BellIcon />
          <span className="topbar-icon-dot" />
        </button>

        <div className="topbar-profile">
          <div className="topbar-avatar">AR</div>
          <div className="topbar-profile-text">
            <span className="topbar-profile-name">Shriya Kukreja</span>
            <span className="topbar-profile-role">Admin</span>
          </div>
          <ChevronIcon />
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9.5a6 6 0 1 1 12 0c0 3.5 1 5 2 6H4c1-1 2-2.5 2-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

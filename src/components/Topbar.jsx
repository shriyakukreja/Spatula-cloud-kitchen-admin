// File: src/components/Topbar.jsx
import React, { useEffect, useState } from "react";
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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("spatula-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("spatula-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <header className="topbar">
      <div className="topbar-heading">
        <h1 className="topbar-title">{title}</h1>
        {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
      </div>

      <div className="topbar-actions">
        <button
          className="topbar-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle light and dark mode"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span>{theme === "dark" ? "☾" : "☀"}</span>
          <strong>{theme === "dark" ? "Dark" : "Light"}</strong>
        </button>

        <div className="topbar-date" title={getFormattedDate()}>
          <CalendarIcon />
          <span>{getFormattedDate()}</span>
        </div>

        <button className="topbar-icon-btn" aria-label="Notifications">
          <BellIcon />
          <span className="topbar-icon-dot" />
        </button>

        <div className="topbar-profile">
          <div className="topbar-avatar">SK</div>
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
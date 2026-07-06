// File: src/components/StatCard.jsx
import React from "react";
import "./StatCard.css";

const icons = {
  orders: <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  today: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  revenue: (
    <>
      <path d="M4 16.5 9.5 11l4 4L20 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 7H20v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  pending: <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />,
  completed: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 12.3l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13" r="7.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 9v4l2.5 2M10 2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
};

export default function StatCard({ label, value, change, trend, icon, caption }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            {icons[icon] || icons.orders}
          </svg>
        </span>
        {change && (
          <span className={`stat-card-change stat-card-change--${trend}`}>
            {trend === "up" ? <TrendUpIcon /> : <TrendDownIcon />}
            {change}
          </span>
        )}
      </div>
      <p className="stat-card-value">{value}</p>
      <p className="stat-card-label">{label}</p>
      {caption && <p className="stat-card-caption">{caption}</p>}
    </div>
  );
}

function TrendUpIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path d="M4 17l6-6 4 4 6-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path d="M4 7l6 6 4-4 6 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// File: src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: DashboardIcon, end: true },
  { to: "/orders", label: "Orders", icon: OrdersIcon },
  { to: "/menu", label: "Menu", icon: MenuIcon },
  { to: "/customers", label: "Customers", icon: CustomersIcon },
  { to: "/payments", label: "Payments", icon: PaymentsIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark" aria-hidden="true">
          <SpatulaIcon />
        </span>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">Spatula</span>
          <span className="sidebar-brand-tag">Cloud Kitchen</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary">
        <span className="sidebar-nav-label">Menu</span>
        <ul>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  "sidebar-link" + (isActive ? " is-active" : "")
                }
              >
                <span className="sidebar-link-icon">
                  <Icon />
                </span>
                <span className="sidebar-link-label">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-status">
          <span className="sidebar-status-dot" />
          <div>
            <p className="sidebar-status-title">Kitchen Live</p>
            <p className="sidebar-status-sub">All systems normal</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ---------------------------------------------------------------------- */
/* Inline icon set (stroke-based, matches the sidebar's line-icon system) */
/* ---------------------------------------------------------------------- */

function SpatulaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c-2.2 0-4 1.8-4 4 0 2.4 1.7 3.5 4 5.3 2.3-1.8 4-2.9 4-5.3 0-2.2-1.8-4-4-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.5V21M8.5 21h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="3.5" width="7.5" height="4.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="10" width="7.5" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 3v18M6 3c-1.7 0-3 1.6-3 3.5S4.3 10 6 10M18 3v7c0 1.1-.9 2-2 2s-2-.9-2-2V3m2 9v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CustomersIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 20c.6-3.4 3-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15.5 5.2c1.5.4 2.6 1.7 2.6 3.3 0 1.5-1 2.8-2.4 3.2M18 14.7c2 .5 3.5 2.1 4 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M19.4 13.5c.1-.5.1-1 0-1.5l1.6-1.4-1.5-2.6-2 .6a7 7 0 0 0-1.3-.8L16 5.5h-3l-.2 2.3c-.5.2-.9.5-1.3.8l-2-.6-1.5 2.6L9.6 12c-.1.5-.1 1 0 1.5l-1.6 1.4 1.5 2.6 2-.6c.4.3.8.6 1.3.8l.2 2.3h3l.2-2.3c.5-.2.9-.5 1.3-.8l2 .6 1.5-2.6-1.6-1.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

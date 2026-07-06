// File: src/components/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

const pageMeta = {
  "/": { title: "Dashboard", subtitle: "Overview of your kitchen's performance" },
  "/orders": { title: "Orders", subtitle: "Track and manage every incoming order" },
  "/menu": { title: "Menu", subtitle: "Manage dishes, pricing and availability" },
  "/customers": { title: "Customers", subtitle: "Browse customer history and loyalty" },
  "/payments": { title: "Payments", subtitle: "Reconcile payouts across platforms" },
  "/settings": { title: "Settings", subtitle: "Configure your kitchen and account" },
};

export default function Layout() {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] || pageMeta["/"];

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar title={meta.title} subtitle={meta.subtitle} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// File: src/pages/Dashboard.jsx
import React, { useState } from "react";
import StatCard from "../components/StatCard.jsx";
import RecentOrdersTable from "../components/RecentOrdersTable.jsx";
import SourceAnalytics from "../components/SourceAnalytics.jsx";
import TopSelling from "../components/TopSelling.jsx";
import CustomerSnapshot from "../components/CustomerSnapshot.jsx";
import StatusOverview from "../components/StatusOverview.jsx";

import { dashboardStats } from "../data/stats.js";
import { recentOrders } from "../data/orders.js";
import { platformAnalytics } from "../data/platformData.js";
import { topSellingItems } from "../data/topSelling.js";
import { recentCustomers } from "../data/customers.js";
import { statusOverview } from "../data/statusData.js";

import "./Dashboard.css";

export default function Dashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="dashboard">
      <section className="stat-grid" aria-label="Key statistics">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </section>

      <section className="dashboard-row dashboard-row--split">
        <SourceAnalytics data={platformAnalytics} />
        <StatusOverview statuses={statusOverview} />
      </section>

      <section className="dashboard-row">
        <RecentOrdersTable orders={recentOrders} onViewDetails={setSelectedOrder} />
      </section>

      <section className="dashboard-row dashboard-row--split">
        <TopSelling items={topSellingItems} />
        <CustomerSnapshot customers={recentCustomers} />
      </section>

      {selectedOrder && (
        <div className="order-modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <h3>{selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} aria-label="Close">
                ×
              </button>
            </div>
            <dl className="order-modal-body">
              <dt>Customer</dt>
              <dd>{selectedOrder.customer}</dd>
              <dt>Phone</dt>
              <dd>{selectedOrder.phone}</dd>
              <dt>Items</dt>
              <dd>{selectedOrder.items.join(", ")}</dd>
              <dt>Platform</dt>
              <dd>{selectedOrder.platform}</dd>
              <dt>Payment</dt>
              <dd>{selectedOrder.paymentStatus}</dd>
              <dt>Amount</dt>
              <dd>₹{selectedOrder.amount.toLocaleString("en-IN")}</dd>
              <dt>Status</dt>
              <dd>{selectedOrder.status}</dd>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}

// File: src/components/RecentOrdersTable.jsx
import React from "react";
import StatusBadge from "./StatusBadge.jsx";
import "./RecentOrdersTable.css";

const platformDot = {
  Zomato: "#E23744",
  Swiggy: "#F6A313",
  "Walk-in": "#4FA8FF",
  Direct: "#3DDC84",
};

export default function RecentOrdersTable({ orders, onViewDetails }) {
  return (
    <div className="panel orders-table-panel">
      <div className="panel-header">
        <div>
          <h3 className="panel-title">Recent Orders</h3>
          <p className="panel-subtitle">Live feed of orders across every channel</p>
        </div>
        <button className="orders-table-view-all">View all</button>
      </div>

      <div className="orders-table-scroll">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone Number</th>
              <th>Ordered Items</th>
              <th>Platform</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Status</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="orders-table-id">{order.id}</td>
                <td>
                  <span className="orders-table-customer">{order.customer}</span>
                </td>
                <td className="text-muted">{order.phone}</td>
                <td className="orders-table-items" title={order.items.join(", ")}>
                  {order.items.join(", ")}
                </td>
                <td>
                  <span className="orders-table-platform">
                    <span
                      className="orders-table-platform-dot"
                      style={{ background: platformDot[order.platform] || "#a8a29a" }}
                    />
                    {order.platform}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      "orders-table-payment " +
                      (order.paymentStatus === "Paid"
                        ? "orders-table-payment--paid"
                        : "orders-table-payment--pending")
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="orders-table-amount">₹{order.amount.toLocaleString("en-IN")}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td>
                  <button
                    className="orders-table-action"
                    onClick={() => onViewDetails && onViewDetails(order)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

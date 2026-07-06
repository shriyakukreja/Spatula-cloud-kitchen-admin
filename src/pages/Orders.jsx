// File: src/pages/Orders.jsx
import React, { useMemo, useState } from "react";
import RecentOrdersTable from "../components/RecentOrdersTable.jsx";
import { recentOrders, orderStatuses } from "../data/orders.js";
import "./Orders.css";

export default function Orders() {
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return recentOrders.filter((order) => {
      const matchesStatus =
        activeStatus === "All" || order.status === activeStatus;

      const searchText = [
        order.id,
        order.customer,
        order.phone,
        order.address,
        order.platform,
        order.paymentStatus,
        order.status,
        ...order.items,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [activeStatus, searchTerm]);

  return (
    <div className="orders-page">
      <div className="orders-page-toolbar">
        <input
          type="text"
          className="orders-page-search"
          placeholder="Search by order ID, customer, phone, item, platform..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div
        className="orders-page-filters"
        role="tablist"
        aria-label="Filter by status"
      >
        {["All", ...orderStatuses].map((status) => (
          <button
            key={status}
            role="tab"
            aria-selected={activeStatus === status}
            className={
              "orders-page-filter" + (activeStatus === status ? " is-active" : "")
            }
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <RecentOrdersTable
        orders={filteredOrders}
        onViewDetails={(order) => setSelectedOrder(order)}
      />

      {selectedOrder && (
        <div
          className="order-modal-backdrop"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="order-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="order-modal-header">
              <div>
                <p className="order-modal-eyebrow">Order Details</p>
                <h2>{selectedOrder.id}</h2>
              </div>

              <button
                className="order-modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="order-modal-section">
              <h4>Customer</h4>
              <p>{selectedOrder.customer}</p>
              <span>{selectedOrder.phone}</span>
              
              <div className="order-modal-address">
                <h4>Delivery Address</h4>
                <p>{selectedOrder.address}</p>
              </div>
            </div>

            <div className="order-modal-section">
              <h4>Ordered Items</h4>
              <ul>
                {selectedOrder.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="order-modal-grid">
              <div>
                <h4>Platform</h4>
                <p>{selectedOrder.platform}</p>
              </div>

              <div>
                <h4>Payment</h4>
                <p>{selectedOrder.paymentStatus}</p>
              </div>

              <div>
                <h4>Status</h4>
                <p>{selectedOrder.status}</p>
              </div>

              <div>
                <h4>Amount</h4>
                <p>₹{selectedOrder.amount.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// File: src/pages/Customers.jsx
import React, { useState } from "react";
import { recentCustomers } from "../data/customers.js";
import { allOrders } from "../data/orders.js";
import StatusBadge from "../components/StatusBadge.jsx";
import "./Customers.css";

function getCustomerOrders(customerId) {
  return allOrders.filter((order) => order.customerId === customerId);
}

function getLifetimeSpend(orders) {
  return orders.reduce((sum, order) => sum + order.amount, 0);
}

function getFavouriteItem(orders) {
  const itemCount = {};

  orders.forEach((order) => {
    order.itemDetails.forEach((item) => {
      itemCount[item.name] = (itemCount[item.name] || 0) + item.quantity;
    });
  });

  return (
    Object.entries(itemCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "No orders yet"
  );
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customersWithStats = recentCustomers.map((customer) => {
    const orders = getCustomerOrders(customer.id);

    return {
      ...customer,
      orders,
      totalVisits: orders.length,
      lifetimeSpend: getLifetimeSpend(orders),
      favouriteItem: getFavouriteItem(orders),
      lastOrder: orders[0]?.id || "No orders",
    };
  });

  const selectedCustomerOrders = selectedCustomer
    ? getCustomerOrders(selectedCustomer.id)
    : [];

  return (
    <>
      <div className="panel customers-page-panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">All Customers</h3>
            <p className="panel-subtitle">
              {customersWithStats.length} customers on record
            </p>
          </div>
        </div>

        <div className="customers-table-scroll">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Favourite Item</th>
                <th>Total Visits</th>
                <th>Lifetime Spend</th>
                <th aria-label="Actions"></th>
              </tr>
            </thead>

            <tbody>
              {customersWithStats.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customers-table-name">
                      <span className="customers-table-avatar">
                        {customer.avatar}
                      </span>
                      {customer.name}
                    </div>
                  </td>

                  <td className="text-muted">{customer.phone}</td>
                  <td className="text-muted">{customer.favouriteItem}</td>
                  <td>{customer.totalVisits}</td>

                  <td className="customers-table-spend">
                    ₹{customer.lifetimeSpend.toLocaleString("en-IN")}
                  </td>

                  <td>
                    <button
                      className="customers-table-action"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div
          className="customer-profile-backdrop"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="customer-profile-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="customer-profile-header">
              <div className="customer-profile-main">
                <span className="customer-profile-avatar">
                  {selectedCustomer.avatar}
                </span>

                <div>
                  <h2>{selectedCustomer.name}</h2>
                  <p>{selectedCustomer.phone}</p>
                </div>
              </div>

              <button
                className="customer-profile-close"
                onClick={() => setSelectedCustomer(null)}
              >
                ×
              </button>
            </div>

            <div className="customer-profile-grid">
              <div>
                <span>Favourite Item</span>
                <strong>{selectedCustomer.favouriteItem}</strong>
              </div>

              <div>
                <span>Total Visits</span>
                <strong>{selectedCustomer.totalVisits}</strong>
              </div>

              <div>
                <span>Lifetime Spend</span>
                <strong>
                  ₹{selectedCustomer.lifetimeSpend.toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Last Order</span>
                <strong>{selectedCustomer.lastOrder}</strong>
              </div>
            </div>

            <div className="customer-profile-address">
              <span>Delivery Address</span>
              <p>{selectedCustomer.address}</p>
            </div>

            <div className="customer-profile-orders">
              <h3>Order History</h3>

              {selectedCustomerOrders.map((order) => (
                <div key={order.id} className="customer-profile-order-card">
                  <div>
                    <h4>{order.id}</h4>
                    <p>{order.items.join(", ")}</p>
                    <p>
                      {formatDate(order.createdAt)} · {formatTime(order.createdAt)}
                    </p>
                  </div>

                  <div>
                    <span>Platform</span>
                    <strong>{order.platform}</strong>
                  </div>

                  <div>
                    <span>Delivery Time</span>
                    <strong>{order.deliveryTime}</strong>
                  </div>

                  <div>
                    <span>Amount</span>
                    <strong>₹{order.amount.toLocaleString("en-IN")}</strong>
                  </div>

                  <StatusBadge status={order.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
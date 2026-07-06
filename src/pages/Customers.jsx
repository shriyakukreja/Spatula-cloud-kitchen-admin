// File: src/pages/Customers.jsx
import React from "react";
import { recentCustomers } from "../data/customers.js";
import "./Customers.css";

export default function Customers() {
  return (
    <div className="panel customers-page-panel">
      <div className="panel-header">
        <div>
          <h3 className="panel-title">All Customers</h3>
          <p className="panel-subtitle">{recentCustomers.length} customers on record</p>
        </div>
      </div>

      <div className="customers-table-scroll">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Favourite Item</th>
              <th>Total Visits</th>
              <th>Lifetime Spend</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {recentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <div className="customers-table-name">
                    <span className="customers-table-avatar">{customer.avatar}</span>
                    {customer.name}
                  </div>
                </td>
                <td className="text-muted">{customer.favouriteItem}</td>
                <td>{customer.totalVisits}</td>
                <td className="customers-table-spend">
                  ₹{customer.lifetimeSpend.toLocaleString("en-IN")}
                </td>
                <td>
                  <button className="customers-table-action">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
